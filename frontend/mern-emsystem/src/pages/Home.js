import { useEffect, useState, useContext } from "react"
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../context/authContext";


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
      <div>

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

    </div>
    </div>
  )
  
}

export default Home