import { useEffect, useState, useContext } from "react"
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../context/authContext";
import { format } from 'date-fns';



const StudentListElement = ({student, handleClick}) => {
  console.log(student);
  return (
    <tr className="w-full border-b-2 border-neutral-100 border-opacity-100 py-4 dark:border-opacity-50">
      <td>
        <div className="text-left text-xl">
          <Link to={`/studentProfile/${student._id}`} onClick={() => handleClick(student)}>
            {student.StudentName}
          </Link>
        </div>
      </td>
      <tr>
        <div className="text-right">
          {student.beltId.Colour}
        </div>
      </tr>
    </tr>
  )
}



const Home = () => {
  const [notes, setNotes] = useState(null);
  const [todayStudent, setTodayStudent] = useState(null);
  const [recentNotes, setRecentNotes] = useState(null);
  const [state, setstate] = useState({
    query: '',
    list: []
  })

  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  console.log(auth)
  const data = JSON.parse(localStorage.getItem("userData"));
  console.log(data)



  // while(auth.token == false);
  useEffect(() => {

//     const fetchNotes = async () => {

//       try
//       {
//       const response = await fetch(`http://localhost:5000/notes/allStudents`, {
//         headers: {
//           "x-access-token": data.token,
//         }
//       });
//       const json = await response.json();

//       if(response.ok)
//       {
//         setNotes(json);
//         setstate({
//           query: "",
//           list: json
//       });
//       }
//     }
  
//   catch
//   {
//     navigate('/login')
//   }
// }

const fetchRecentNotes = async () => {

  try
  {
  const response = await fetch(`http://localhost:5000/notes/recentNotes`, {
    headers: {
      "x-access-token": data.token,
    }
  });
  const json = await response.json();

  if(response.ok)
  {
    console.log(json)
    setRecentNotes(json)
    
  }
}

  catch
  {
    navigate('/login')
  }
}



const fetchStudents = async () => {

  try
  {
    const response = await fetch(`http://localhost:5000/notes/todayStudents`, {
      headers: {
        "x-access-token": data.token,
      }
    });
    const json = await response.json();

    if(response.ok)
    {
      console.log(json)
      setTodayStudent(json)
      
    }
  }

  catch
  {
    navigate('/login')
  }
}
    // fetchNotes()
    fetchStudents()
    fetchRecentNotes()

  }, [])

  // const handleClick = async (item) => {
  //   // e.preventDefault();
  //   console.log(item._id, "You were clicked!")

  //   const getStudentTest =  await fetch(`http://localhost:5000/notes/${item._id}`, {
  //     headers: {
  //       "x-access-token": auth.token,
  //     }
  //   });
  //   const stuJSON = await getStudentTest.json();
  //     if(getStudentTest.ok)
  //     {
  //       console.log(stuJSON)
  //     }
  //   navigate(`/studentProfile/${item._id}`);

  // };

  // const handleSearch = (e) => 
  // {
  //   e.preventDefault();
  //   console.log(e.target.value);
  //   const results = notes.filter(note => {
  //     if (e.target.value === "") return notes
  //     return note.StudentName.toLowerCase().startsWith(e.target.value.toLowerCase())
  //   })
  //   setstate({
  //       query: e.target.value,
  //       list: results
  //   });
  //   console.log(results)
  // }

  const handleStudentClick = async (item) => {
    // e.preventDefault();
    console.log(item, "You were clicked!")

    const getStudentTest =  await fetch(`http://localhost:5000/notes/getStudentByName/${item}`, {
      headers: {
        "x-access-token": auth.token,
      }
    });
    const stuJSON = await getStudentTest.json();
    if(getStudentTest.ok)
    {
      let stuId = stuJSON._id
    
      navigate(`/studentProfile/${stuId}`);
    }

  };
  

  return (
    <div>
      <br></br>
      <div className="flex justify-center items-center">
      <h1 className="text-xl  font-bold  px-10 py-5 bg-[#187abf]">Code Ninjas Marda Loop Notes App</h1>
      </div>
      <br></br>
      <h2 className="text-xl font-semibold">Today's Students</h2>
      <br></br>
  <div className="flex justify-center items-center">
  <div class="grid grid-cols-4 gap-4 border-4 border-gray-950 py-2 px-2	">
  {todayStudent && state.list && todayStudent.students.map((student) => (

  <div className="flex justify-center items-center  border-2 border-grey-350">
    <Link to={`/`} onClick={() => handleStudentClick(student.name)}> {student.name}</Link>
  </div>
  ))}
</div>
</div>
      <br></br>
      <br></br>

      <h2 className="text-xl font-semibold">Recent Notes</h2>
      <br></br>
      
      <div>
        
        <table className="table-auto w-1/2 mx-auto divide-y divide-gray-100">
          <thead>
            <tr>
              <th className="w-1/4 ...">Student</th>
              {/* <th className="w-1/2 ...">Game</th> */}
              <th className="w-1/2 ...">Comment</th>
              <th className ="w-1/4 ...">Sensei</th>
              <th className="w-1/4 ...">Date</th>
              
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100 [&>*:nth-child(even)]:bg-gray-100 [&>*:nth-child(odd)]:bg-gray-300">
          {recentNotes && recentNotes.notes.map((note) => (
            <tr>
              <td className="text-left">{note.studentID.StudentName}</td>
              {/* <td className="text-left">{note.game}</td> */}
              <td className="text-left  ">{note.comment}</td>
              <td className="text-left px-20">{note.senseiID.name}</td>
              <td className="text-left whitespace-nowrap px-5">{format(new Date(note.createdAt), "MMMM dd', 'yyyy")}</td>
              {/* <td><button onClick={() => {if(window.confirm("Are you sure you want to delete this note?")){}}} className=" bg-red-400 py-2 px-4 rounded text-center hover:bg-red-800 hover:text-red-50 cursor-pointer shadow-sm ">Delete</button></td> */}
            </tr>
          ))}
          </tbody>
        </table>
      
    </div>
      
      
      
      {/* <div>

      <input
        type="search"
        placeholder="Search here"
        onChange={handleSearch}
        value={state.query}
        />
      </div>
      <div className="flex justify-center items-center">
        
        <table className="table-auto w-1/2 mx-auto divide-y divide-gray-100 " >
        <tbody className="divide-y divide-gray-100 [&>*:nth-child(even)]:bg-gray-100 [&>*:nth-child(odd)]:bg-gray-300">
          {notes && state.list && state.list.map((note) => (
            <StudentListElement student={note} handleClick={handleClick}/>

          )
          )}
          </tbody>
        </table>

    </div> */}
    </div>
  )
  
}

export default Home