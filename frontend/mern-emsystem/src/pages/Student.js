import { useEffect, useState,useContext } from "react"
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import { AuthContext } from "../context/authContext";




const Student = () => {
    // const { id } = props.match.params;
    // console.log("The student", props.stuID)
    const [student, setStudent] = useState(null);
    const [game, setGame] = useState('Default');
    const [comment, setComment] = useState('');
    // const [beltGames, setbeltGames] = useState(null);
    const [deleted, setDelete] = useState(false);
    const [newNote, setNewNote] = useState(false);

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
            {/* <option value="Candy Sort">Candy Sort</option>
            <option value="Rain Catcher Part 3430">Rain Catcher Part 3430</option>
            <option value="Dropping Bombs">Dropping Bombs</option>
            <option value="Level 4">Level 4</option> */}
            <option value="Default">Default</option>
            {student && student.beltId.Games.map((game) => <option value={game}>{game}</option>)}
        </select>
        <br></br><br></br>
        <input type="text" placeholder="Write note here..." onChange={(text) => setComment(text.target.value)}/>
        <br></br><br></br>
        <input type="submit" value="Add Note"/>
        <br></br><br></br>
      </form>
      <div>
        {student && student.Notes.map((note) => (
          <li>
            <a key={note._id} target="blank">{note.comment}</a>
            <button onClick={() => deleteNote(student, note)} className=" bg-blue-400 py-2 px-4 rounded text-center hover:bg-blue-800 hover:text-blue-50 cursor-pointer shadow-sm ">Delete</button>
          </li>
          
        )
        
      
        
        )}
      </div>
    </div>
  )
  }

export default Student