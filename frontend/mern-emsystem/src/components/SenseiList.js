import {Link} from 'react-router-dom'
import { Fragment, useState, useEffect, useContext } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import logo from './logo.png';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';


const SenseiList = () => {

    const [senseis, setSenseis] = useState(null);

    const auth = useContext(AuthContext);
    console.log(auth)
    const data = JSON.parse(localStorage.getItem("userData"));
    console.log(data)
    

    useEffect(() => {
        const fetchSenseis = async () => {
            const response = await fetch(`http://localhost:5000/getUsers`, {
                headers: {
                "x-access-token": data.token,
                }
            });
            const json = await response.json();

            if(response.ok)
            {
                setSenseis(json);
                console.log(json);
            }
        }
        fetchSenseis();
        


    }, []);


    return (
        <div className="text-black-500">
            
            <ol className="divide-y divide-gray-100 w-96 " >
            {senseis && senseis.map((sensei) => 
            <li>
            <button className="py-2 px-20 text-right" > {sensei.name} </button>
            <button onClick={() => {if(window.confirm("Are you sure you want to delete this note?")){console.log("Delete")}}} className=" bg-red-400 py-2 px-5 rounded text-center hover:bg-red-800 hover:text-red-50 cursor-pointer shadow-sm ">Delete</button>
            </li>)}
        </ol>
        </div>
    
    )

}

export default SenseiList