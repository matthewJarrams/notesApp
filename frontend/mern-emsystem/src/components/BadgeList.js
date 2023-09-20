import {Link} from 'react-router-dom'
import { Fragment, useState, useEffect, useContext } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import logo from './logo.png';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';


const BadgeList = () => {

    const [badges, setBadges] = useState(null);

    const auth = useContext(AuthContext);
    console.log(auth)
    const data = JSON.parse(localStorage.getItem("userData"));
    console.log(data)
    

    useEffect(() => {
        const fetchBadges = async () => {
            const response = await fetch(`http://localhost:5000/notes/getBadges`, {
                headers: {
                "x-access-token": data.token,
                }
            });
            const json = await response.json();

            if(response.ok)
            {
                setBadges(json);
                console.log(json);
            }
        }
        fetchBadges();
        


    }, []);


    return (
        <div className="text-black-500">
            {badges && badges.map((badge) =>(
            <ol className="divide-y divide-gray-100 w-96 even:bg-slate-100 odd:bg-slate-300" >
             
            <li className='py-3'>
            <button className="py-2 px-4 text-right-lg font-bold" > {badge.BadgeName} </button>
            <p>Points: {badge.Points}</p>
            {/* <button onClick={() => {if(window.confirm("Are you sure you want to delete this note?")){console.log("Delete")}}} className=" bg-red-400 py-2 px-4 rounded text-center hover:bg-red-800 hover:text-red-50 cursor-pointer shadow-sm ">Delete</button> */}
            </li>
        </ol>))}
        </div>
    
    )
    

}

export default BadgeList