const db = require("../Models/DB");
const mongoose = require("mongoose");
const { response } = require("express");
const { stringify } = require("querystring");
const { all } = require("../Routes/noteRoutes");
const fs = require('node:fs');
// const moment = require("moment");

const getBelts = async (req, res) => {
  const allBelts = await db.Belt.find({})
  res.status(200).json(allBelts);
  // console.log(JSON.stringify(allBelts))

};

const getBadges = async (req, res) => {
  const allBadges = await db.Badge.find({})
  res.status(200).json(allBadges);

};

const getStudents = async (req, res) => {
  const allStudents = await db.Student.find({}).populate("beltId");
  res.status(200).json(allStudents);
  // console.log(JSON.stringify(allStudents))

};

const addBelt = async (req, res) => {
  const { Colour, Games, curriculum } = req.body
  //console.log(req.body)
  try {
    const belt = await db.Belt.create({ Colour, Games, curriculum })
    res.status(200).json(belt)
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.log(error.message)
  }
}

const addBadge = async (req, res) => {
  const { BadgeName, Points } = req.body
  //console.log(req.body)
  try {
    const badge = await db.Badge.create({ BadgeName, Points })
    res.status(200).json(badge)
  } catch (error) {
    res.status(400).json({ error: error.message });
    //console.log(error.message)
  }
}



const addStudent = async (req, res) => {

  // let { StudentName, OldStudentID, belt, Curriculum, Points } = req.body;
  // console.log(Curriculum);

  let StudentName = req.body.StudentName;
  let OldStudentID = req.body.OldStudentID;
  let belt = req.body.belt;
  let Curriculum = req.body.Curriculum;
  let Points = req.body.Points;

  let beltId;
  if (Curriculum == "GDP") {
    //white GDP
    beltId = new mongoose.Types.ObjectId('64ff9e6d218e7463f5f9476e');
  }
  else {
    //white impact
    beltId = new mongoose.Types.ObjectId('64f4107008601a2ce11c7671');
  }

  try {
    //console.log(StudentName, OldStudentID, belt, Curriculum, Points);
    const newStudent = await db.Student.create({ StudentName, OldStudentID, belt, Curriculum, Points, beltId });
    //console.log(newStudent);
    res.status(200).json(newStudent);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const makeNote = async (req, res) => {
  //make comment will have post id appeneded to params
  //this will be done through a make comment button or when a text box is clicked on frontend
  const { studentID } = req.params;
  //console.log(studentID)

  //retrieve info from inputs in JSON format
  const { comment, game } = req.body;
  //console.log(comment, game)
  //console.log(req.body)

  //get author from token
  /*auth stuff PUT BACK WHEN DONE!!! */
  let senseiID = req.user.id;
  //console.log((req.user.id))

  //hard coded object id
  // var id = new mongoose.Types.ObjectId('64f4e5eefced4ffc4a21de79');
  // console.log(id)
  // let senseiID = id;

  //make comment and update post to attach it to the comment
  try {
    const newNote = await db.Note.create({ studentID, comment, game, senseiID });
    // const curpost = await Posts.Post.findById(postId);
    const student = await db.Student.findById({ _id: studentID });
    //console.log(newNote._id);
    //console.log(student);
    student.Notes.push(newNote._id);
    await student.save();
    res.status(200).json(student);
  } catch (error) {
    //console.log(error.message)
    res.status(400).json({ error: error.message });
  }
};


const getStudent = async (req, res) => {
  const { studentID } = req.params;
  const numStudents = await db.Student.countDocuments({ _id: studentID })
  if (numStudents > 0) {
    const student = await db.Student.findById({ _id: studentID })
      .populate("Notes")
      .populate({ path: "Notes", populate: "senseiID", options: { sort: { createdAt: -1 } } })
      .populate("beltId");

    // console.log(student.Notes[0].senseiID.name)

    res.status(200).json(student);
  } else {
    return res.status(400).json({ error: "No such post" });
  }

};

const deleteNote = async (req, res) => {
  //in frontend the id of the note will be appended to the url. Do this when user clicks a delete button and this is called
  const { stuID, id } = req.params;
  //console.log(id)
  const noteCount = await db.Note.countDocuments({ _id: id })
  if (noteCount > 0) {
    const noteCheck = await db.Note.findById({ _id: id });
    //console.log(noteCheck);

    if (noteCheck.senseiID != req.user.id) {
      res.send("what you doing dawg, this ain't your note to delete");
    }

    const note = await db.Note.findOneAndDelete({ _id: id });

    const student = await db.Student.findById({ _id: stuID });

    for (var i = 0; i < student.Notes.length; i++) {
      temp = JSON.stringify(student.Notes[i]);

      if (temp == `"${id}"`) {
        //console.log("I'm here. Delete me");
        //console.log(student.Notes)
        student.Notes.splice(i, 1);
      }
    }

    await student.save();
    res.status(200).json(student);
    //res.status(200).json(comment)
  } else {
    return res.status(400).json({ error: "No such Comment" });
  }

};

const updateStudent = async (req, res) => {
  const { id } = req.params;
  // console.log(id);
  //console.log(req.body)
  const studenttoUpdate = await db.Student.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!studenttoUpdate) {
    return res.status(400).json({ error: "No such Student" });
  }

  const student = await db.Student.findOne({ _id: id }).populate("Notes");

  res.status(200).json(student);
}

const http = require('http');
const PORT = 3000;

// const server = http.createServer((req, res) => {
//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'text/plain');
//     res.end('Hello World');
// });

// server.listen(PORT, () => {
//     console.log(`Server running at PORT:${PORT}/`);
// });

class CNClass {
  constructor(startTime, endTime, studentList, classID) {
    this.startTime = startTime;
    this.endTime = endTime;
    this.studentList = studentList;
    this.classID = classID;
  }
}


const getTodayStudents = async (req, res) => {


  const respTok = await fetch("https://cn.mystudio.io/Api/v2/generateStudioAttendanceToken", {
    "headers": {
      "accept": "application/json, text/plain, */*",
      "accept-language": "en-US,en;q=0.8",
      "access-control-allow-origin": "*",
      "content-type": "application/json; charset=UTF-8",
      "sec-ch-ua": "\"Brave\";v=\"119\", \"Chromium\";v=\"119\", \"Not?A_Brand\";v=\"24\"",
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": "\"Windows\"",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "sec-gpc": "1",
      "cookie": "PHPSESSID=00jj72hftcap33avu9fe4s4udh",
      "Referer": "https://cn.mystudio.io/attendance/#/classesprogram",
      "Referrer-Policy": "strict-origin-when-cross-origin"
    },
    "body": "{\"company_id\":\"296\",\"email\":\"matthew.jarrams@gmail.com\",\"from_page\":\"attendance\"}",
    "method": "POST"
  });

  login = await respTok.json()
  //console.log(login.msg)

  var todayDate = new Date();
  var month = todayDate.getMonth() + 1
  // console.log(month)
  var todayString = todayDate.getFullYear().toString() + "-" + month + "-" + todayDate.getDate().toString()
  //console.log(todayString)

  const resp = await fetch("https://cn.mystudio.io/Api/v2/getAllClassList", {
    "headers": {
      "accept": "application/json, text/plain, */*",
      "accept-language": "en-US,en;q=0.8",
      "access-control-allow-origin": "*",
      "content-type": "application/json; charset=UTF-8",
      "sec-ch-ua": "\"Brave\";v=\"119\", \"Chromium\";v=\"119\", \"Not?A_Brand\";v=\"24\"",
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": "\"Windows\"",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "sec-gpc": "1",
      "cookie": "PHPSESSID=00jj72hftcap33avu9fe4s4udh",
      "Referer": "https://cn.mystudio.io/attendance/",
      "Referrer-Policy": "strict-origin-when-cross-origin"
    },
    "body": "{\"company_id\":\"296\",\"token\":\"" + login.msg + "\",\"email\":\"matthew.jarrams@gmail.com\",\"user_login_type\":\"\",\"from\":\"attendance\",\"from_page\":\"attendance\",\"current_date\":\"" + todayString + "\",\"student_view\":\"Y\"}",
    "method": "POST"
  });

  classes = await resp.json()
  //console.log(classes.class_details)

  CNClasses = []



  timeIds = []
  appointmentIds = []
  classTimes = []

  for (let i = 0; i < classes.class_details.length; i++) {
    if (classes.class_details[i].class_appointment_title == "CREATE") {
      timeIds.push(classes.class_details[i].class_appointment_times_id)
      appointmentIds.push(classes.class_details[i].class_appointment_occurrence_id)
      classTimes.push(classes.class_details[i].start_time)

      let newCNClass

    }

  }
  //console.log(timeIds)
  todayStudents = { students: [], classes: [] }
  todayStudents.classes = classTimes

  for (let time = 0; time < timeIds.length; time++) {
    //console.log(timeIds[time])
    const resp2 = await fetch("https://cn.mystudio.io/Api/v2/getAllParticipantsBasedOnSelectedClass", {
      "headers": {
        "accept": "application/json, text/plain, */*",
        "accept-language": "en-US,en;q=0.8",
        "access-control-allow-origin": "*",
        "content-type": "application/json; charset=UTF-8",
        "sec-ch-ua": "\"Brave\";v=\"119\", \"Chromium\";v=\"119\", \"Not?A_Brand\";v=\"24\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "sec-gpc": "1",
        "cookie": "PHPSESSID=00jj72hftcap33avu9fe4s4udh",
        "Referer": "https://cn.mystudio.io/attendance/",
        "Referrer-Policy": "strict-origin-when-cross-origin"
      },
      "body": "{\"company_id\":\"296\",\"token\":\"" + login.msg + "\",\"email\":\"matthew.jarrams@gmail.com\",\"user_login_type\":\"\",\"from\":\"attendance\",\"from_page\":\"attendance\",\"program_date\":\"" + todayString + "\",\"class_appointment_id\":\"5682\",\"class_appointment_times_id\":\"" + timeIds[time] + "\",\"class_appointment_occurrence_id\":\"" + appointmentIds[time] + "\",\"search_value\":\"\",\"drop_in_flag\":\"N\",\"attendance_date_time\":\"\"}",
      "method": "POST"
    });


    let s = await resp2.json();
    let students = s.student_detail;
    letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
    // console.log(students['B'][0].participant_full_name)
    for (let i = 0; i < letters.length; i++) {
      if (students[letters[i]][0] != undefined) {
        for (let j = 0; j < students[letters[i]].length; j++) {
          //console.log(students[letters[i]][j].participant_full_name)
          var name = students[letters[i]][j].participant_full_name.replace(/,/g, "")
          duplicate = false
          for (let stu = 0; stu < todayStudents.students.length; stu++) {
            if (todayStudents.students[stu].name == name) {
              duplicate = true
            }
          }
          if (!duplicate) {
            const note = await db.Student.findOne({ StudentName: name })
              .populate("Notes")
              .populate({ path: "Notes", populate: "senseiID", options: { sort: { createdAt: -1 } } })
              .populate("beltId");

            var noteCompleted = false;
            // console.log(note.Notes[0])

            if (note != null && note.Notes.length > 0 && note.Notes[0].createdAt) {
              var deltaTime = Date.now() - note.Notes[0].createdAt;
              console.log(deltaTime);
              if (deltaTime >= 43200000) {
                noteCompleted = false;
              } else {
                noteCompleted = true;
              }
            }
            console.log(noteCompleted);
            todayStudents.students.push({ name, time, noteCompleted })
          }
        }
      }
    }
  }

  res.status(200).json(todayStudents)
}

const getRecentNotes = async (req, res) => {

  let fortnightAgo = new Date(Date.now() - 12096e5);
  const numNotes = await db.Note.countDocuments({})
  if (numNotes > 0) {
    const note = await db.Note.find({ createdAt: { $gte: fortnightAgo } }).sort({ createdAt: -1 })
      .populate("studentID")
      .populate("senseiID")
    // .populate("beltId");

    // console.log(student.Notes[0].senseiID.name)
    recentNotes = { notes: [] };
    for (let i = 0; i < note.length; i++) {
      recentNotes.notes.push(note[i])
    }
    if (note != null) {
      res.status(200).json(recentNotes);
    }
  } else {
    return res.status(400).json({ error: "No such post" });
  }

};


const getStudentByName = async (req, res) => {
  const { studentName } = req.params;
  // const numStudents = await db.Student.countDocuments({ StudentName: studentName })
  // if (numStudents > 0) {
  const student = await db.Student.findOne({ StudentName: studentName })
    .populate("Notes")
    .populate({ path: "Notes", populate: "senseiID", options: { sort: { createdAt: -1 } } })
    .populate("beltId");

  //console.log(student)

  res.status(200).json(student);
  // } else {
  // return res.status(400).json({ error: "No such post" });
  // }

};

const getStudentHasRecentNote = async (req, res) => {
  const { studentName } = req.params;
  const note = await db.Student.findOne({ StudentName: studentName })
    .populate("Notes")
    .populate({ path: "Notes", populate: "senseiID", options: { sort: { createdAt: -1 } } })
    .populate("beltId");

  if (note != null) {
    let noteJSON = await note
    console.log("Here: ", note.createdAt)
  }

  else {
    return res.status(400).json({ error: "No such post" });
  }
}










module.exports = {
  getBelts,
  addBelt,
  addStudent,
  makeNote,
  getStudent,
  deleteNote,
  getStudents,
  updateStudent,
  addBadge,
  getBadges,
  getTodayStudents,
  getRecentNotes,
  getStudentByName,
  getStudentHasRecentNote
};