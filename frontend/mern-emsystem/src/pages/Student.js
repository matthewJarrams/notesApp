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
      <div className="flex justify-center items-center">
        {/* {student && student.Notes.map((note) => (
          <li><a key={note._id} target="blank">{note.comment}</a></li>
          
        )
        
      
        
        )} */}

        <table className="table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">Note</th>
              <th className="px-4 py-2">Sensei</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Delete</th>
            </tr>
          </thead>
          <tbody>
            {student && student.Notes.map((note) => (
              <tr>
                <td className="border px-4 py-2">{note.comment}</td>
                <td className="border px-4 py-2">{note.senseiID.name}</td>
                <td className="border px-4 py-2">{note.date}</td>
                <td className="border px-4 py-2"><button className="bg-red-400 py-2 px-4 rounded text-center hover:bg-red-800 hover:text-red-50 cursor-pointer shadow-sm " >Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  )
  }

export default Student