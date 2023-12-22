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

    try
    {
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
    catch
    {
        navigate('/login');
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
        <h1 className="text-xl">Student List</h1>
        <br></br>
      <div>

      <input
        type="search"
        placeholder="Search Students Here"
        onChange={handleSearch}
        value={state.query}
        className="text-center w-250 mx-10"
        />
      </div>
      <br></br>
    <table className="table-auto w-1/2 mx-auto divide-y divide-gray-100 ">
            <thead>
              <tr>
                <th className="w-1/2 ...">Student Name</th>
                <th className="w-1/2 ...">Belt</th>
                <th className ="w-1/2 ...">Points</th>
                <th className="w-1/2 ..."></th>
                
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100 [&>*:nth-child(even)]:bg-gray-100 [&>*:nth-child(odd)]:bg-gray-300">
            {notes && state.list && state.list.map((note) => (
              <tr>
                <td className="text-center">{
                  <Link to={`/studentAdmin/${note._id}`} onClick={() => handleClick(note)}>
                    {note.StudentName}
                  </Link>

                }</td>
                <td className="text-center">{note.beltId.Colour}</td>
                <td className="text-center">{note.Points}</td>
                {/* <td><button onClick={() => {if(window.confirm("Are you sure you want to delete this note?")){console.log("Delete")}}} className=" bg-red-400 py-2 px-4 rounded text-center hover:bg-red-800 hover:text-red-50 cursor-pointer shadow-sm ">Delete</button></td> */}
                <td>
                  <button className=" py-2 px-4 rounded text-center hover:bg-red-800 hover:text-red-50 cursor-pointer shadow-sm " onClick= {() => {if(window.confirm("Are you sure you want to delete this student?")){console.log("Delete")}}}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                      <path   strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                  </button>
                </td>

              </tr>
            ))}
            </tbody>
          </table>
    </div>
  )
  
}

export default StudentList