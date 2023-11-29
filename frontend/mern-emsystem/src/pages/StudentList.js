import { useEffect, useState, useContext } from "react"
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../context/authContext";
import { collection, getDocs, query, orderBy, limit, doc } from "firebase/firestore"; 
import { db } from "../firebase";


const StudentList = () => {
	
	const [students, setStudents] = useState([])
	const handleClick = (note) => {
		console.log(note)
	};
	const handleSearch = (e) => {
	};

	useEffect(() => {

		const getStudents = async () => {

      const studentsRef = collection(db, "Students");

      const q = query(studentsRef, orderBy("FirstName"));
      const querySnapshot = await getDocs(q);
      let students = [];
      querySnapshot.forEach((doc) => {
        var student = doc.data();
        student.id = doc.id;
        console.log(student);
        students.push(student);
        
      });

			setStudents(students);
		};
		getStudents();

	}, []);


  return (
    <div>
        <br></br>
        <h1>Student List</h1>
        <br></br>
      <div>


      </div>
      <br></br>
    <table className="table-auto w-1/2 mx-auto divide-y divide-gray-100 ">
            <thead>
              <tr>
                <th className="w-1/2 ...">Student Name</th>
                <th className="w-1/2 ...">Belt</th>
                <th className ="w-1/2 ...">Points</th>
                
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100 [&>*:nth-child(even)]:bg-gray-100 [&>*:nth-child(odd)]:bg-gray-300">
            {students.map((note) => (
              <tr>
                <td className="text-left">{
					// note.FirstName + " " + note.LastName
                  <Link to={`/studentProfile/${note.id}`} onClick={() => handleClick(note)}>
                    {note.FirstName} {note.LastName}
                  </Link>

                }</td>
                <td className="text-left">{note.Belt}</td>
                <td className="text-center">{note.Points}</td>
                
                <td><button onClick={() => {if(window.confirm("Are you sure you want to delete this note?")){console.log("Delete")}}} className=" bg-red-400 py-2 px-4 rounded text-center hover:bg-red-800 hover:text-red-50 cursor-pointer shadow-sm ">Delete</button></td>
              </tr>
            ))}
            </tbody>
          </table>
    </div>
  )
  
}

export default StudentList