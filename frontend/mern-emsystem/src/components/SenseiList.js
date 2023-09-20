import {Link} from 'react-router-dom'
import { Fragment, useState, useEffect, useContext } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import logo from './logo.png';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';


const SenseiList = () => {

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
      }

    const [senseis, setSenseis] = useState(null);
    const [activeUser, setUser] = useState(true);
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
        <div className="text-black-500 ">
            {senseis && senseis.map((sensei) => 
            <ol className="divide-y divide-gray-100 w-250 even:bg-slate-100 odd:bg-slate-300 " >
             
            <li className='py-3'>
            <button className="py-2 px-20 text-right" > {sensei.name} </button>
            <div class="inline-flex rounded-md shadow-sm mx-2">
            <button onclick={() => setUser(true)} className={classNames(activeUser ? 'bg-green-300 block px-4 py-2 text-sm text-gray-700 px-4 py-2 text-sm font-medium text-grey-900 bg-white border border-gray-200 rounded-l-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white' :  'block px-4 py-2 text-sm text-gray-700 px-4 py-2 text-sm font-medium text-grey-900 bg-white border border-gray-200 rounded-l-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white')}>
                Active
            </button>
            <button  className={classNames(activeUser ?  'block px-4 py-2 text-sm text-gray-700 px-4 py-2 text-sm font-medium text-grey-900 bg-white border border-gray-200 rounded-l-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white' :  'bg-red-300 block px-4 py-2 text-sm text-gray-700 px-4 py-2 text-sm font-medium text-grey-900 bg-white border border-gray-200 rounded-l-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white')}>
                Inactive
            </button>
            
        </div>
            </li>
        </ol>)}
        </div>
    
    )

}

export default SenseiList