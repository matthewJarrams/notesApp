import { useEffect, useState } from "react"
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";



const Student = () => {
    // const { id } = props.match.params;
    // console.log("The student", props.stuID)
    const [student, setStudent] = useState(null)
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



  
  return (
    <div className="home">
      <div>
        <p>{student && student.StudentName}</p>
      </div>
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