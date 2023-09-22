import {Link} from 'react-router-dom'
import { Fragment, useState, useEffect, useContext } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import logo from './logo.png';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import { secondsInQuarter } from 'date-fns';


const SenseiList = () => {

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
      }

    const [senseis, setSenseis] = useState(null);
    const auth = useContext(AuthContext);
    console.log(auth)
    const data = JSON.parse(localStorage.getItem("userData"));
    console.log(data)
    const navigate = useNavigate();
    const [change, setChange] = useState(false);
    

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
        


    }, [change]);

    const handleActive = async (e, user) => {
        e.preventDefault();
        if(user.active)
        {
            console.log("already active!")
        }
        else
        {
            const active = true;
            const userData = {
                active,
            };
              console.log(userData);
              try {
                  let res = await fetch(`http://localhost:5000/updateUser/${user._id}`, {
                    method: "PATCH",
                    body: JSON.stringify(userData),
                    headers: {
                      "Content-Type": "application/json",
                      "x-access-token": auth.token,
                    },
                  });
                  let resJson = await res.json();
                  if (res.status === 200) {
                    console.log("Success");
                    console.log(resJson);
                    if(change)
                    {
                        setChange(false)
                    }
                    else
                    {
                        setChange(true);
                    }
                  } else {
                    console.log("Fail");
                  }
                } catch (err) {
                  console.log(err);
                }
        }
        
    }

    const handleInactive = async (e, user) => {
        e.preventDefault();
        if(user.active)
        {
            const active = false;
            const userData = {
                active,
            };
              console.log(data);
              try {
                  let res = await fetch(`http://localhost:5000/updateUser/${user._id}`, {
                    method: "PATCH",
                    body: JSON.stringify(userData),
                    headers: {
                      "Content-Type": "application/json",
                      "x-access-token": auth.token,
                    },
                  });
                  let resJson = await res.json();
                  if (res.status === 200) {
                    console.log("Success");
                    console.log(resJson);
                    if(change)
                    {
                        setChange(false)
                    }
                    else
                    {
                        setChange(true);
                    }
    
                  } else {
                    console.log("Fail");
                  }
                } catch (err) {
                  console.log(err);
                }

                if(data.name == user.username)
                {
                    auth.logout();
                    navigate('/login')
                }



        }
        else
        {
           console.log("already Inactive!")
        }
    }


    return (
        <div className="text-black-500 ">
            {senseis && senseis.map((sensei) => (
            <ol className="divide-y divide-gray-100 w-250 even:bg-slate-100 odd:bg-slate-300 " >
             
            <li className='py-3'>
            <button className="py-2 px-20 text-right" > {sensei.username} </button>
            <div class="inline-flex rounded-md shadow-sm mx-2">
            <button onClick={(e) => {if(window.confirm("Are you sure you want to change this use to active?")){handleActive(e, sensei)}}} className={classNames(sensei.active ? 'bg-green-300 block px-4 py-2 text-sm text-gray-700 px-4 py-2 text-sm font-medium text-grey-900 border border-grey-200 rounded-l-lg' :  ' block px-4 py-2 text-sm text-gray-700 px-4 py-2 text-sm font-medium text-grey-900 bg-white border border-gray-200 rounded-l-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white')}>
                Active
            </button>
            <button onClick={(e) => {if(window.confirm("Are you sure you want to change this user to inactive?")){handleInactive(e, sensei)}}}  className={classNames(sensei.active ?  'block px-4 py-2 text-sm text-gray-700 px-4 py-2 text-sm font-medium text-grey-900 bg-white border border-gray-200 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white' :  'bg-red-300 block px-4 py-2 text-sm text-grey-700 font-medium text-grey-900 border border-grey-200 rounded')}>
                Inactive
            </button>
            
        </div>
            </li>
        </ol>))}
        </div>
    
    )

}

export default SenseiList