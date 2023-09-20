import { useEffect, useState,useContext } from "react"
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { format } from 'date-fns';



const Student = () => {
    // const { id } = props.match.params;
    // console.log("The student", props.stuID)
    const [student, setStudent] = useState(null);
    const [game, setGame] = useState('Default');
    const [comment, setComment] = useState('');
    // const [beltGames, setbeltGames] = useState(null);
    const [deleted, setDelete] = useState(false);
    const [newNote, setNewNote] = useState(false);

    const [error, setError] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const auth = useContext(AuthContext);
    console.log(auth)
    const data = JSON.parse(localStorage.getItem("userData"));
    console.log(data)
    

    console.log(location.pathname)

    const pathname = location.pathname.slice(1)
    const id = pathname.split('/')[1]
    console.log(id);



    const deleteNote = async (student, note) => {
        console.log(student);
        console.log(note);
        const response = await fetch(`http://localhost:5000/notes/deleteNote/${student._id}/${note._id}/`, {
          method: 'DELETE',
          headers: {
            "x-access-token": data.token
          }
        });

        if(response.ok)
        {
            console.log("here")
            setGame('Default');
            if(deleted)
            {
                console.log(deleted)
                setDelete(false);
                console.log(deleted)

            }
            else
            {
                console.log(deleted)

                setDelete(true);
                console.log(deleted)


            }

        }
        
        
      }


    useEffect(() => {
        const fetchStudent = async () => {
        const response = await fetch(`http://localhost:5000/notes/${id}`, {
            headers: {
              "x-access-token": data.token,
            }
          });
        const json = await response.json();

        if(response.ok)
        {
            setStudent(json)
            console.log(json)

        }
        }
        fetchStudent()

    }, [newNote, deleted])

    const handleSubmit = async (e) => 
    {
        e.preventDefault();
        console.log(game, comment);
        if(game == '')
        {
            setGame('Default')
        }
        const note = {comment, game};

        if(comment == '')
        {
          setError(true);
        }
        else
        {
          const response = await fetch(`http://localhost:5000/notes/makeNote/${id}`, {
              method: 'POST',
              body: JSON.stringify(note),
              headers: {
                'Content-Type': 'application/json',
                "x-access-token": data.token
              }
            })
            const json = await response.json()
        
            if (!response.ok) {
              console.log(response.error)
            }
            if (response.ok) {
              if(newNote)
              {
                  setNewNote(false);
              }
              else
              {
                  setNewNote(true)
              }
              setGame('Default');
              setComment('');
              console.log('new note added:', json);
              e.target.reset();
              setError(false);

            
          }
        }
      
    }
      
      
    


  
  return (
    <div className="home">
      <div>
        <p className="inline-block whitespace-nowrap text-xl">
          {student && student.StudentName}

          &nbsp;

          <Link className="text-blue-500 hover:text-blue-800" to={`/studentAdmin/${student && student._id}`}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 inline-block">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
            </svg>
          </Link>




        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <br></br>
        <select name="game" id="game" onChange={(choice) => setGame(choice.target.value)}>
            {/* <option value="Candy Sort">Candy Sort</option>
            <option value="Rain Catcher Part 3430">Rain Catcher Part 3430</option>
            <option value="Dropping Bombs">Dropping Bombs</option>
            <option value="Level 4">Level 4</option> */}
            <option value="Default">Default</option>
            {student && student.beltId.Games.map((game) => <option value={game}>{game}</option>)}
        </select>
        <br></br><br></br>
        <textarea placeholder="Write note here..." onChange={(text) => setComment(text.target.value)} className="w-1/4 border-2 border-gray-300 p-2 rounded-md mb-4" rows="4" cols="50" name="comment" id="comment" value={comment}></textarea>
        <br></br><br></br>
        {error && <p className="text-red-500 border-2 border-black px-2 py-1 bg-slate-200">Input Error: Empty note</p>}
        <br></br>
        <input className= "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="submit" value="Add Note"/>
        <br></br><br></br>
      </form>
      <div>
        
          <table className="table-auto w-1/2 mx-auto divide-y divide-gray-100">
            <thead>
              <tr>
                <th className="w-1/2 ...">Game</th>
                <th className="w-1/2 ...">Comment</th>
                <th className ="w-1/2 ...">Sensi</th>
                <th className="w-1/2 ...">Date</th>
                
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100 [&>*:nth-child(even)]:bg-gray-100 [&>*:nth-child(odd)]:bg-gray-300">
            {student && student.Notes.map((note) => (
              <tr>
                <td className="text-left">{note.game}</td>
                <td className="text-left ">{note.comment}</td>
                <td className="text-left px-5">{note.senseiID.name}</td>
                <td className="text-left whitespace-nowrap px-5">{format(new Date(note.createdAt), "MMMM dd', 'yyyy")}</td>
                <td><button onClick={() => {if(window.confirm("Are you sure you want to delete this note?")){deleteNote(student, note)}}} className=" bg-red-400 py-2 px-4 rounded text-center hover:bg-red-800 hover:text-red-50 cursor-pointer shadow-sm ">Delete</button></td>
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