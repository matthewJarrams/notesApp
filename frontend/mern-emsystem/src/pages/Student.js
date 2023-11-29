import { useEffect, useState,useContext } from "react"
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import { format } from 'date-fns';
import { AuthContext } from "../context/authContext";
import { collection, getDocs, getDoc, query, orderBy, limit, doc, where } from "firebase/firestore"; 
import { db } from "../firebase";


const Student = () => {
	const location = useLocation();
	const pathname = location.pathname.slice(1);
    const id = pathname.split('/')[1];


	const [notes, getNotes] = useState([]);
	const [student, setStudent] = useState([]);
	
	useEffect(() => {
		const fetchNotes = async () => {
			const notesRef = collection(db, "Notes");
			var studentRef = doc(db, "Students", id);
			studentRef = "Students/" + id;
			const q = query(notesRef, where("Student", "==", studentRef), orderBy("CreatedDate"));
			const querySnapshot = await getDocs(q);
			let notes = [];
			querySnapshot.forEach((doc) => {
				var note = doc.data();
				console.log(note);
				notes.push(note);
			});

			// reverse the array so that the most recent notes are at the top
			notes.reverse();

			getNotes(notes);

			const studentRef2 = doc(db, "Students", id);
			const docSnap = await getDoc(studentRef2);
			const student = docSnap.data();
			setStudent(student);

		};



		fetchNotes();




	}, []);
		




	
	return (
		<div className="home">
			<div>
				<p className="inline-block whitespace-nowrap text-xl">
					{student && student.FirstName} {student && student.LastName}

					&nbsp;

					<Link className="text-blue-500 hover:text-blue-800" to={`/studentAdmin/${student && student._id}`}>
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 inline-block">
							<path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
						</svg>
					</Link>




				</p>
			</div>

			<div>
				
					<table className="table-auto w-1/2 mx-auto divide-y divide-gray-100">
						<thead>
							<tr>
								<th className="w-1/2 ...">Game</th>
								<th className="w-1/2 ...">Comment</th>
								<th className ="w-1/2 ...">Sensei</th>
								<th className="w-1/2 ...">Date</th>
								
							</tr>
						</thead>

						<tbody className="divide-y divide-gray-100 [&>*:nth-child(even)]:bg-gray-100 [&>*:nth-child(odd)]:bg-gray-300">
						{notes && notes.map((note) => (
							<tr>
								<td className="text-left">{note.GameName}</td>
								<td className="text-left ">{note.Comment}</td>
								<td className="text-left px-5">{note.SenseiName}</td>
								<td className="text-left whitespace-nowrap px-5">{format(new Date(note.CreatedDate.toDate().toString()), "MMMM dd', 'yyyy")}</td>
								
							</tr>
						))}
						</tbody>
					</table>



					
				
				
			
				
				
			</div>


			<div className="pb-10"></div>
		</div>
	)
	}

export default Student