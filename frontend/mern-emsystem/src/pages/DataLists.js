import { useEffect, useState, useContext } from "react"
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../context/authContext";



const DataLists = () => {

  const [option, setOption] = useState("")

  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  console.log(auth)
  const data = JSON.parse(localStorage.getItem("userData"));
  console.log(data)

//   useEffect(() => {
//     const fetchNotes = async () => {
//       const response = await fetch(`http://localhost:5000/notes/allStudents`, {
//         headers: {
//           "x-access-token": data.token,
//         }
//       });
//       const json = await response.json();

//       if(response.ok)
//       {
//         setNotes(json);
//         setstate({
//           query: "",
//           list: json
//       });
//       }
//     }
//     fetchNotes()

//   }, [])


//   const handleSearch = (e) => 
//   {
//     e.preventDefault();
//     console.log(e.target.value);
//     const results = notes.filter(note => {
//       if (e.target.value === "") return notes
//       return note.StudentName.toLowerCase().startsWith(e.target.value.toLowerCase())
//     })
//     setstate({
//         query: e.target.value,
//         list: results
//     });
//     console.log(results)
//   }
  

  return (
    <div>
        <br></br>
        <h1>Data Lists</h1>
        <p>Edit and View Site Content</p>

        <br></br>
      {/* <div>
       
      <select name="dataList" id="dataList"  onChange={(dataOption) => setOption(dataOption.target.value)}>
            <option value="-- Choose Option --">-- Choose Option --</option>
            <option value="Belts">Belts</option>
            <option value="Badges">Badges</option>
            <option value="Senseis">Senseis</option>
            
            
        </select>
      </div> */}
        <div class="inline-flex rounded-md shadow-sm">
            <a href="#" aria-current="page" class="px-4 py-2 text-sm font-medium text-blue-700 bg-white border border-gray-200 rounded-l-lg hover:bg-gray-100 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
                Belts
            </a>
            <a href="#" class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
                Badges
            </a>
            <a href="#" class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-r-md hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
                Senseis
            </a>
        </div>
      <br></br>
      <br></br>
      <div className="flex justify-center items-center">
        
        {true && <ol className="divide-y divide-gray-100 w-96 " >
            <li>
            <button className="py-2 px-4 text-right" > White - Imapct </button>
            <button onClick={() => {if(window.confirm("Are you sure you want to delete this note?")){console.log("Delete")}}} className=" bg-red-400 py-2 px-4 rounded text-center hover:bg-red-800 hover:text-red-50 cursor-pointer shadow-sm ">Delete</button>
            </li>
        </ol>}
      <div>
      </div>
    </div>
    </div>
  )
  
}

export default DataLists