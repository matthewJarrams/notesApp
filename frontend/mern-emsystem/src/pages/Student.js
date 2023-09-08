import { useEffect, useState } from "react"
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";



const Student = () => {
    // const { id } = props.match.params;
    // console.log("The student", props.stuID)
    const [student, setStudent] = useState(null)
    const [game, setGame] = useState('')
    const [comment, setComment] = useState('')

    const navigate = useNavigate();
    const location = useLocation();

    console.log(location.pathname)

    const pathname = location.pathname.slice(1)
    const id = pathname.split('/')[1]
    console.log(id)

    useEffect(() => {
        const fetchStudent = async () => {
        const response = await fetch(`http://localhost:5000/notes/${id}`)
        const json = await response.json();

        if(response.ok)
        {
            setStudent(json)
            console.log(json)

        }
        }
        fetchStudent()

    }, [])

    const handleSubmit = async (e) => 
    {
        e.preventDefault();
        console.log(game, comment)
        const note = {comment, game}

        const response = await fetch(`http://localhost:5000/notes/makeNote/${id}`, {
            method: 'POST',
            body: JSON.stringify(note),
            headers: {
              'Content-Type': 'application/json'
            }
          })
          const json = await response.json()
      
          if (!response.ok) {
            console.log(response.error)
          }
          if (response.ok) {
            setGame('')
            setComment('')
            console.log('new note added:', json)
          }
      
        }
      
    


  
  return (
    <div className="home">
      <div>
        <p>{student && student.StudentName}</p>
      </div>
      <form onSubmit={handleSubmit}>
        <br></br>
        <select name="game" id="game" onChange={(choice) => setGame(choice.target.value)}>
            <option value="Candy Sort">Candy Sort</option>
            <option value="Rain Catcher Part 3430">Rain Catcher Part 3430</option>
            <option value="Dropping Bombs">Dropping Bombs</option>
            <option value="Level 4">Level 4</option>
        </select>
        <br></br><br></br>
        <input type="text" placeholder="Write note here..." onChange={(text) => setComment(text.target.value)}/>
        <br></br><br></br>
        <input type="submit" value="Add Note"/>
        <br></br><br></br>
      </form>
      <div>
        {student && student.Notes.map((note) => (
          <li><a key={note._id} target="blank">{note.comment}</a></li>
          
        )
        
      
        
        )}
      </div>
    </div>
  )
  }

export default Student