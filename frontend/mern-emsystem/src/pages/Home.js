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
      <div>
        {notes && notes.map((note) => (
          <li><a key={note._id} target="blank" onClick={() => handleClick(note)}>{note.StudentName}</a></li>
        )
      
        
        )}
      </div>
    </div>
  )
}

export default Home