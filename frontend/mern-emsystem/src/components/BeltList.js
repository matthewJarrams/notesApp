import {Link} from 'react-router-dom'
import { Fragment, useState, useEffect, useContext } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import logo from './logo.png';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import { beTarask } from 'date-fns/locale';

import { ChevronDownIcon } from '@heroicons/react/20/solid';


import {
    Accordion,
    AccordionHeader,
    AccordionBody,
  } from "@material-tailwind/react";


const BeltList = () => {

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
      }

    const [open, setOpen] = useState("Black");
 
    const handleOpen = (value) => setOpen(open === value ? 0 : value);

    const [belts, setBelts] = useState(null);
    const [option, setOption] = useState(null);
    const [games, setGames] = useState(null);
    const [loaded , setLoaded] = useState(false);

    const [state, setstate] = useState({
        query: '',
        list: []
      })

    const auth = useContext(AuthContext);
    // console.log(auth)
    const data = JSON.parse(localStorage.getItem("userData"));
    // console.log(data)
    
    useEffect(() => {
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
                setstate({
                    query: option,
                    list: json
                });
                console.log(json);
                for(var belt in belts)
                {
                    
                }
            }
        }
        fetchBelts();
        


    }, []);

    const handleChoice = async (option) =>
    {
        console.log(option);
        // console.log(e.target.value);
        const results = belts.filter(belt => {
        if (option === "") return belts
        else if (option == "Impact & GDP") return belts
        return belt.curriculum.toLowerCase().includes(option.toLowerCase())
        })
        setstate({
            query: option,
            list: results
        });
    }


    return (
        <div className="text-black-500">
            {/* <br></br> */}
            <select name="belt" id="belt"  onChange={(e) => handleChoice(e.target.value)}>
                <option value="Impact & GDP">-- Impact & GDP --</option>
                <option value="Impact">Impact</option>
                <option value="GDP">GDP</option>
            </select>
            <br></br>
            <br></br>
            <p>Click on belt names to see the games</p>
            <br></br>
    
    
   
    <div>
    { belts && state.list && state.list.map((belt) =>
    (  
            <ol className="divide-y divide-gray-100 w-96  even:bg-slate-100 odd:bg-slate-300" >
            <li className='py-3'>
            <button className="py-2 px-8 text-right text-lg	 font-bold" onClick={() => setOption(belt.Colour)}> {belt.Colour} </button>
            {/* <button onClick={() => {if(window.confirm("Are you sure you want to delete this note?")){console.log("Delete")}}} className=" bg-red-400 py-2 px-5 rounded text-center hover:bg-red-800 hover:text-red-50 cursor-pointer shadow-sm ">Delete</button> */}
            {option == belt.Colour && belt.Games.map((game) => (
                <ol className="divide-y divide-gray-100 w-96 even:bg-blue-300 odd:bg-white">
                    <li>{game}</li>
                </ol>
            ))}
           </li>
            
        </ol>
        
        ))}
      </div>
      </div>
    )
    

}

export default BeltList