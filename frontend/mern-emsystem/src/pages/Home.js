import { useEffect, useState } from "react"
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';



const Home = () => {

  const [notes, setNotes] = useState(null)
  const navigate = useNavigate();


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
    navigate('/studentProfile');

  };

  return (
    <div className="home">

      </div>
      <div>
      {notes && notes.map((note) => (
          
      <Link
              to={{ pathname: `/studentProfile/${note._id}`, state: {data : note}}}
      >
            note._id
        </Link>
      ))
      }
      </div>
    </div>
  )
  
}

export default Home