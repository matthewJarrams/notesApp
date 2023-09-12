import { useEffect, useState,useContext } from "react"
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import { AuthContext } from "../context/authContext";




const StudentAdmin = () => {
    // const { id } = props.match.params;
    // console.log("The student", props.stuID)
    const [student, setStudent] = useState(null);
    const [belt, setBelt] = useState(null);
    const [belts, setBelts] = useState(null);
    const [Points, setPoints] = useState(null);
    
   
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
            setStudent(json);
            console.log(json);
            setPoints(json.Points);
            setBelt(json.beltId);

        }
        }
        fetchStudent()

        const fetchBelts = async () => {
            const response = await fetch(`http://localhost:5000/notes/getBelts`, {
                headers: {
                  "x-access-token": data.token,
                }
              });
            const json = await response.json();
    
            if(response.ok)
            {
                setBelts(json);
                console.log(json);
                
                
                // beltsFiltered.filter((belt) => {
                //     if(belt.Colour.split('- ')[1] === "Impact");
                //         return belt;
                // })
                
                // console.log(beltsFiltered)
            }
        }
        
        fetchBelts();


    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(belt, Points);
        const beltId = belt
        const data = {
            beltId,
            Points,
          };
          console.log(data);
          try {
              let res = await fetch(`http://localhost:5000/notes/updateStudent/${id}`, {
                method: "PATCH",
                body: JSON.stringify(data),
                headers: {
                  "Content-Type": "application/json",
                  "x-access-token": auth.token,
                },
              });
              let resJson = await res.json();
              if (res.status === 200) {
                console.log("Success");
                console.log(resJson);
                window.location.reload();

              } else {
                console.log("Fail");
              }
            } catch (err) {
              console.log(err);
            }
          }
        
    

    
      
      
    


  
  return (
    <div className="home">
      <div>
        <p>Name: {student && student.StudentName}</p>
        <p>Curriculum: {student && student.Curriculum}</p>
        <p>Current Belt: {student && student.beltId.Colour}</p>
        <p>Current Points: {student && student.Points}</p>
      </div>
      <br></br><br></br>
      <form onSubmit={handleSubmit}>
      <select name="belt" id="belt"  onChange={(belt) => setBelt(belt.target.value)}>
            {/* <option value="Candy Sort">Candy Sort</option>
            <option value="Rain Catcher Part 3430">Rain Catcher Part 3430</option>
            <option value="Dropping Bombs">Dropping Bombs</option>
            <option value="Level 4">Level 4</option> */}
            <option value="-- Update Belt --">-- Update Belt --</option>
            {belts && belts.map((belt) => <option value={belt._id}>{belt.Colour}</option>)}
        </select>
        <br></br><br></br>
        <input type="number" placeholder={"Update Points"} onChange={(Points) => setPoints(Points.target.value)}/>
        <br></br><br></br>
        <input type="submit" value="Submit Changes"/>
        <br></br><br></br>
      </form>
    </div>
  )
  }

export default StudentAdmin