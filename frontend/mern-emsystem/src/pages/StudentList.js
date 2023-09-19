import { useEffect, useState, useContext } from "react"
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../context/authContext";



const StudentList = () => {

  const [notes, setNotes] = useState(null);
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
    const fetchNotes = async () => {
      const response = await fetch(`http://localhost:5000/notes/allStudents`, {
        headers: {
          "x-access-token": data.token,
        }
      });
      const json = await response.json();

      if(response.ok)
      {
        setNotes(json);
        setstate({
          query: "",
          list: json
      });
      }
    }
    fetchNotes()

  }, [])

  const handleClick = async (item) => {
    // e.preventDefault();
    console.log(item._id, "You were clicked!")

    const getStudentTest =  await fetch(`http://localhost:5000/notes/${item._id}`, {
      headers: {
        "x-access-token": auth.token,
      }
    });
    const stuJSON = await getStudentTest.json();
      if(getStudentTest.ok)
      {
        console.log(stuJSON)
      }
    navigate(`/studentProfile/${item._id}`);

  };

  const handleSearch = (e) => 
  {
    e.preventDefault();
    console.log(e.target.value);
    const results = notes.filter(note => {
      if (e.target.value === "") return notes
      return note.StudentName.toLowerCase().startsWith(e.target.value.toLowerCase())
    })
    setstate({
        query: e.target.value,
        list: results
    });
    console.log(results)
  }
  

  return (
    <div>
        <br></br>
        <h1>Student List</h1>
        <br></br>
      <div>

      <input
        type="search"
        placeholder="Search here"
        onChange={handleSearch}
        value={state.query}
        />
      </div>
      <br></br>
    <table className="table-auto w-1/2 mx-auto divide-y divide-gray-100">
            <thead>
              <tr>
                <th className="w-1/2 ...">Student Name</th>
                <th className="w-1/2 ...">Belt</th>
                <th className ="w-1/2 ...">Points</th>
                
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
            {notes && state.list && state.list.map((note) => (
              <tr>
                <td className="text-left">{note.StudentName}</td>
                <td className="text-left">{note.beltId.Colour}</td>
                <td className="text-left">{note.Points}</td>
                <td><button onClick={() => {if(window.confirm("Are you sure you want to delete this note?")){console.log("Delete")}}} className=" bg-red-400 py-2 px-4 rounded text-center hover:bg-red-800 hover:text-red-50 cursor-pointer shadow-sm ">Delete</button></td>
              </tr>
            ))}
            </tbody>
          </table>
    </div>
  )
  
}

export default StudentList