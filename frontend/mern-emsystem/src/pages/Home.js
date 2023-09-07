import { useEffect, useState } from "react"
import {Link} from 'react-router-dom'


const Home = () => {

  const [notes, setNotes] = useState(null)

  useEffect(() => {
    const fetchNotes = async () => {
      const response = await fetch(`http://localhost:5000/notes/allStudents`)
      const json = await response.json();

      if(response.ok)
      {
        setNotes(json)
      }
    }
    fetchNotes()

  }, [])

  const handleClick = async (item) => {
    // e.preventDefault();
    console.log(item._id, "You were clicked!")

    const getStudentTest =  await fetch(`http://localhost:5000/notes/${item._id}`)
    const stuJSON = await getStudentTest.json();
      if(getStudentTest.ok)
      {
        console.log(stuJSON)
      }
  };

  return (
    <div className="home">
      <div className="flex justify-center items-center">
        <ol className="divide-y divide-gray-100 w-96 " >
          {notes && notes.map((note) => (
            <li className="w-full border-b-2 border-neutral-100 border-opacity-100 py-4 dark:border-opacity-50 text-left"><a key={note._id} target="blank" onClick={() => handleClick(note)} className=" bg-blue-400 py-2 px-4 rounded text-center hover:bg-blue-800 hover:text-blue-50 cursor-pointer shadow-sm " >{note.StudentName}</a>
              <div className="py-2 px-4 text-right"> View Notes </div>
            </li>
          )
          )}
        </ol>
      </div>
    </div>
  )
}

export default Home