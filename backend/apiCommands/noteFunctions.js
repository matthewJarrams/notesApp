const db = require("../Models/DB");
const mongoose = require("mongoose");
const { response } = require("express");
const { stringify } = require("querystring");
const { all } = require("../Routes/noteRoutes");
// const moment = require("moment");

const getBelts = async (req, res) => {
    const allBelts =  await db.Belt.find({})
    res.status(200).json(allBelts);
    // console.log(JSON.stringify(allBelts))

};

const getStudents = async (req, res) => {
    const allStudents =  await db.Student.find({})
    res.status(200).json(allStudents);
    // console.log(JSON.stringify(allStudents))

};

const addBelt = async (req, res) => {
    const {Colour, Games, curriculum} = req.body
    console.log(req.body)
    try {
        const belt = await db.Belt.create({Colour, Games, curriculum})
        res.status(200).json(belt)
    } catch (error) 
    {
        res.status(400).json({error: error.message});
        console.log(error.message)
    }
}


const addStudent = async (req,res) => {

    // let { StudentName, OldStudentID, belt, Curriculum, Points } = req.body;
    // console.log(Curriculum);

    let StudentName = req.body.StudentName;
    let OldStudentID = req.body.OldStudentID;
    let belt = req.body.belt;
    let Curriculum = req.body.Curriculum;
    let Points = req.body.Points;
    
    let beltId;
    if(Curriculum == "GDP")
    {
        //white GDP
        beltId = new mongoose.Types.ObjectId('64ff9e6d218e7463f5f9476e');   
    }
    else
    {
        //white impact
        beltId = new mongoose.Types.ObjectId('64f4107008601a2ce11c7671');   
    }
    
    try {
      console.log(StudentName, OldStudentID, belt, Curriculum, Points);
        const newStudent = await db.Student.create({ StudentName, OldStudentID, belt, Curriculum, Points, beltId });
        console.log(newStudent);
        res.status(200).json(newStudent);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const makeNote = async (req, res) => {
    //make comment will have post id appeneded to params
    //this will be done through a make comment button or when a text box is clicked on frontend
    const { studentID } = req.params;
    console.log(studentID)

    //retrieve info from inputs in JSON format
    const {comment, game } = req.body;
    console.log(comment, game)
    console.log(req.body)

  //get author from token
/*auth stuff PUT BACK WHEN DONE!!! */  
  let senseiID = req.user.id;
    console.log((req.user.id))

    //hard coded object id
    // var id = new mongoose.Types.ObjectId('64f4e5eefced4ffc4a21de79');
    // console.log(id)
    // let senseiID = id;

  //make comment and update post to attach it to the comment
  try {
    const newNote = await db.Note.create({studentID, comment, game, senseiID });
    // const curpost = await Posts.Post.findById(postId);
    const student = await db.Student.findById({ _id: studentID });
    console.log(newNote._id);
    console.log(student);
    student.Notes.push(newNote._id);
    await student.save();
    res.status(200).json(student);
  } catch (error) {
    console.log(error.message)
    res.status(400).json({ error: error.message });
  }
};


const getStudent = async (req,res) => {
    const { studentID } = req.params;
    const numStudents = await db.Student.countDocuments({ _id: studentID })
      if (numStudents > 0) {
        const student = await db.Student.findById({ _id: studentID })
          .populate("Notes")
          .populate({ path: "Notes", populate: "senseiID" })
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
    console.log(id)
    const noteCount = await db.Note.countDocuments({ _id: id })
      if (noteCount > 0) {
        const noteCheck = await db.Note.findById({ _id: id });
        console.log(noteCheck);
  
        if (noteCheck.senseiID != req.user.id) {
          res.send("what you doing dawg, this ain't your note to delete");
        }
  
        const note = await db.Note.findOneAndDelete({ _id: id });
  
        const student = await db.Student.findById({ _id: stuID });
  
        for (var i = 0; i < student.Notes.length; i++) {
          temp = JSON.stringify(student.Notes[i]);
  
          if (temp == `"${id}"`) {
            console.log("I'm here. Delete me");
            console.log(student.Notes)
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

    const updateStudent = async (req, res) => 
    {
        const { id } = req.params;
        // console.log(id);
        console.log(req.body)
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
    



module.exports = {
    getBelts,
    addBelt,
    addStudent,
    makeNote,
    getStudent,
    deleteNote,
    getStudents,
    updateStudent
    
  };