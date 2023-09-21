import { useEffect, useState,useContext } from "react"
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { add } from "date-fns";
// import addBeltPopup from "../components/AddBeltPopup";




const DojoAdmin = () => {
    
    const [Games, setGames] = useState([]);
    const [textValue, setTextValue] = useState("");
    const [Colour, setColour] = useState("");
    const [curriculum, setcurriculum] = useState("Impact");
    
    const handleOptionAdd = (e) => {
        e.preventDefault();
      if (textValue.trim().length === 0) return;
      setTextValue("");
      setGames([
        ...Games,
        textValue
      ]);
    };
    
   
    const navigate = useNavigate();
    const location = useLocation();
    const auth = useContext(AuthContext);
    console.log(auth);
    const data = JSON.parse(localStorage.getItem("userData"));
    console.log(data);

    useEffect(() => {
        if(data);
        else
        {
            navigate('/login');
        }
    }, [])

    const [Curriculum, setCurriculum] = useState("Impact");
    const [StudentName, setName] = useState("");
    const [OldStudentID, setStuId] = useState(null);
    const [Points, setPoints] = useState(0);

    const [senseiName, setSenseiName]= useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [serverError, setServerError] = useState(false);

    const [BadgeName, setBadgeName] = useState("");
    const [badgePoints, setBadgePoints] = useState(0);


    const [isOpen, setIsOpen] = useState(false);
    const [beltPopup, setBeltPopup] = useState(false);
    const [senseiPopup, setSenseiPopup] = useState(false);
    const [badgePopup, setBadgePopup] = useState(false);

    


    const studentPopup = async (e) => 
    {
        e.preventDefault();
        setIsOpen(true);
    }

    const newBeltPopup = async (e) => 
    {
        e.preventDefault();
        setBeltPopup(true);
    }

    const newSenseiPopup = async (e) => 
    {
        e.preventDefault();
        setSenseiPopup(true);
    }

    const newBadgePopup = async (e) => 
    {
        e.preventDefault();
        setBadgePopup(true);
    }

    const newBadge = async (e) =>
    {
        e.preventDefault();
        const Points = badgePoints; 
        const response = await fetch(`http://localhost:5000/notes/addBadge`, {
            method: 'POST',
            headers: {
              "x-access-token": data.token,
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ BadgeName, Points})
          });
          const json = await response.json();

          if(response.ok)
          {
            console.log(json)
            setBadgePopup(false);
          }
          else
          {
            console.log("error")
          }

        setBadgeName("");
        setBadgePoints(0);

        setBadgePopup(false);
    }

    const newSensei = async (e) => 
    {
        e.preventDefault();
        const name = senseiName;

        if(name == '' || username == '' || password == '')
        {
            console.log("input error!");
            setError(true);
        }
        else
        {

            const response = await fetch('http://localhost:5000/register', {
                method: 'POST',
                headers: {
                    "x-access-token": data.token,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({username, name, password})
            })

            const json = await response.json();

            if(response.ok)
            {
                console.log(json)

                setError(false);
                if(json.validReg == false)
                {
                    setServerError(true);
                }
                else
                {
                    setSenseiPopup(false);
                    setUsername("");
                    setSenseiName("");
                    setPassword("");
                    setServerError(false);

                }

            }
            else
            {
                console.log("error");
            }
            
        }

  

    }

    const addBelt = async (e) =>
    {
        e.preventDefault();

        if(Colour == '' || Games.length == 0)
        {
            console.log("Input Error");
            setError(true);
        }
        else
        {

            const response = await fetch(`http://localhost:5000/notes/addBelt`, {
                method: 'POST',
                headers: {
                "x-access-token": data.token,
                "Content-Type": "application/json"
                },
                body: JSON.stringify({ Colour, Games, curriculum})
            });
            const json = await response.json();

            if(response.ok)
            {
                console.log(json)
                setIsOpen(false);
            }
            else
            {
                console.log("error")
            }
            setBeltPopup(false);
            setError(false);
            
            setColour("");
            setGames([]);
            setcurriculum("Impact");
            setTextValue("");
            

        }


    }

    const addStudent = async (e) =>
    {
        e.preventDefault();

        
        
        console.log(StudentName, OldStudentID, Points,Curriculum);
        console.log(data.token);

        // request requires StudentName, OldStudentID, belt, Curriculum, Points
        let belt = "White";
        // let curriculum = "Impact";
        if(OldStudentID == null)
        {
            console.log("here")
            setStuId(0);
        }
        console.log(StudentName, OldStudentID, Points,Curriculum);

        if(StudentName == '')
        {
            console.log("Input error");
            setError(true);
        }
        else
        {
            const response = await fetch(`http://localhost:5000/notes/addStudent`, {
                method: 'POST',
                headers: {
                "x-access-token": data.token,
                "Content-Type": "application/json"
                },
                body: JSON.stringify({ StudentName, OldStudentID, belt, Curriculum, Points})
            });
            const json = await response.json();

            if(response.ok)
            {
                console.log(json)
                setIsOpen(false);
            }
            else
            {
                console.log("error")
            }
            setName("");
            setStuId(null);
            setPoints(0);
            setCurriculum("Impact");
    
    
            setIsOpen(false);
            setError(false);
        }


    }
  
    const handleClose = () =>
    {
        setIsOpen(false);
        setError(false);
        setSenseiPopup(false);
        setBeltPopup(false);
        setTextValue("");
        setGames([]);
    }

  return (
    <div className="home">
        <br></br>
        <h1>Dojo Admin Options</h1>
        <br></br>
        <button class="bg-blue-500  hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={studentPopup}>
            Add New Student
        </button>
        <br></br>
        <br></br>
        <button class="bg-blue-500  hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={newSenseiPopup}>
            Add New Sensei
        </button>
        <br></br>
        <br></br>
        <button class="bg-blue-500  hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={newBeltPopup}>
            Add New Belt
        </button>
        <br></br>
        <br></br>
        <button class="bg-blue-500  hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={newBadgePopup}>
            Add New Badge
        </button>

        {isOpen && <div><div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Add Student
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                {error && <p className="text-red-500 border-2 border-black px-2 py-1 bg-slate-200">Input Error: Please make sure all fields are filled in</p>}

                <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                
                <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                    Curriculum
                </label>
                <select name="curriculum" id="curriculum"  onChange={(choice) => setCurriculum(choice.target.value)}>
                 <option value="Impact">Impact</option>
                 <option value="GDP">GDP</option>
                 
                </select>
                </div>
                <br></br>
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                    Student Name
                    </label>
                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Code Ninja" onChange={(e) => setName(e.target.value)}/>
                </div>
                <br></br>
                <div class="mb-6">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                    Student ID Number (optional) 
                    </label>
                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="oldStuId" type="number"  onChange={(e) => setStuId(e.target.value)}/>
                    <p class="text-red-500 text-xs italic">Enter old student ID number from previous notes App</p>
                    
                </div>
                <div class="mb-6">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                    Points 
                    </label>
                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="points" type="number" placeholder = "0" onChange={(e) => setPoints(e.target.value)}/>
                    
                </div>
                </form>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleClose}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={addStudent}
                  >
                    Add Student
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-75 fixed inset-0 z-40 bg-black"></div>
          </div>
        }
        {beltPopup && <div><div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Add Belt
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                {error && <p className="text-red-500 border-2 border-black px-2 py-1 bg-slate-200">Input Error: Please make sure all fields are filled in</p>}

                <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                
                <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                    Curriculum
                </label>
                <select name="curriculum" id="curriculum" onChange={(choice) => setcurriculum(choice.target.value)}>
                 <option value="Impact">Impact</option>
                 <option value="GDP">GDP</option>
                 <option value="Impact & GDP">Impact & GDP</option>
                </select>
                </div>
                <br></br>
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                    Colour
                    </label>
                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="White - Impact" onChange={(e) => setColour(e.target.value)}/>
                </div>
                <br></br>
                <div class="mb-6">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                    Games
                    </label>
                    <div className="App">
      <input
        type="text"
        value={textValue}
        onChange={(e) => setTextValue(e.target.value)}
      />
      <button onClick={handleOptionAdd}>Add</button>

      <div>
        {Games.map((game) => (
          <div>
            <label>{game}</label>
          </div>
        ))}
      </div>
    </div>
                    
                </div>
                </form>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleClose}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={addBelt}

                  >
                    Add Belt
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-75 fixed inset-0 z-40 bg-black"></div>
          </div>}
          {senseiPopup && <div><div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Add Sensei
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                {error && <p className="text-red-500 border-2 border-black px-2 py-1 bg-slate-200">Input Error: Please make sure all fields are filled in</p>}
                {serverError && <p className="text-red-500 border-2 border-black px-2 py-1 bg-slate-200">Username already in use</p>}

                <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                    Name
                    </label>
                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Sensei Marda Loop" onChange={(e) => setSenseiName(e.target.value)}/>
                </div>
                <br></br>
                <div class="mb-6">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                     Username
                    </label>
                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="CNML" onChange={(e) => setUsername(e.target.value)}/>
                </div>
                <br></br>
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                    Password
                    </label>
                    <input class="shadow appearance-none border-red-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="password" placeholder="********" onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <br></br>
                    
                </form>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleClose}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={newSensei}

                  >
                    Add Sensei
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-75 fixed inset-0 z-40 bg-black"></div>
          </div>}
          {badgePopup && <div><div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Add Badge
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setBadgePopup(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                    Badge Name
                    </label>
                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Code Ninja" onChange={(e) => setBadgeName(e.target.value)}/>
                </div>
                <br></br>
                
                <div class="mb-6">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="points">
                    Number of Reward Points
                    </label>
                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="points" type="number" placeholder = "0" onChange={(e) => setBadgePoints(e.target.value)}/>
                    
                </div>
                </form>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setBadgePopup(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={newBadge}
                  >
                    Add Badge
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-75 fixed inset-0 z-40 bg-black"></div>
          </div>
        }
        </div>
        )
        }
  
  
  

export default DojoAdmin