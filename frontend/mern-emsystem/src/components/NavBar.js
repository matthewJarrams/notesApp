import {Link} from 'react-router-dom'
import { Fragment, useState, useEffect, useContext } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import logo from './logo.png';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../context/authContext.js";


const navigation = [
  { name: 'Home', href: '/', current: true },
  { name: 'Student List', href: '/studentList', current: false },
  { name: 'Data Lists', href: '/dataLists', current: false },
  { name: 'Admin', href: '/generalAdmin', current: false },

]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}



const NavBar = () => {
    const [current, setCurrent] = useState("Home");
    const [show, setShow] = useState(false);
    const navigate = useNavigate();


    const data = JSON.parse(localStorage.getItem("userData"));
    const auth = useContext(AuthContext);

    


    useEffect(() => {
        if(data)
        {
            setShow(true);
        }
        else
        {
            setShow(false);
        }
    }, [data])


    const changeCurrent = async (e, item) =>
    {    
        e.preventDefault();

        setCurrent(item.name)
        for (var key in navigation) 
        {
            if (navigation[key].name == item.name)
            {
                navigation[key].current = true;
            }
            else
            {
                navigation[key].current = false;
            }
                               
        }    
        navigate(item.href);
    }

    return (
        <header>
            
            <div className="text-gray-500">

            {show &&
                <Disclosure as="nav" className="bg-gray-800">
                    {({ open }) => (
                        <>
                        <div className="mx-auto  px-2 sm:px-6 lg:px-8">
                            <div className="relative flex h-16 items-center justify-between">
                            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                {/* Mobile menu button*/}
                                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                <span className="absolute -inset-0.5" />
                                <span className="sr-only">Open main menu</span>
                                {open ? (
                                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                ) : (
                                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                )}
                                </Disclosure.Button>
                            </div>
                            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                                <div className="flex flex-shrink-0 items-center">
                                <img
                                    className="h-8 w-auto"
                                    src={logo}
                                    alt="Your Company"
                                />
                                </div>
                                <div className="hidden sm:ml-6 sm:block">
                                <div className="flex space-x-4">
                                    {navigation.map((item) => (
                                    <a
                                        onClick={(e) => changeCurrent(e, item)}
                                        key={item.name}
                                        href={item.href}
                                        className={classNames(
                                        item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                        'rounded-md px-3 py-2 text-sm font-medium'
                                        )}
                                        aria-current={item.current ? 'page' : undefined}
                                    >
                                        {item.name}
                                    </a>
                                    ))}
                                </div>
                                </div>
                            </div>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

                                {/* Profile dropdown */}
                                <Menu as="div" className="relative ml-3">
                                <div>
                                    <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                    <span className="absolute -inset-1.5" />
                                    <span className="sr-only">Open user menu</span>
                                    {/* <img
                                        className="h-8 w-8 rounded-full"
                                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                        alt=""
                                    /> */}
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                                        <path fill-rule="evenodd" d="M4.5 3.75a3 3 0 00-3 3v10.5a3 3 0 003 3h15a3 3 0 003-3V6.75a3 3 0 00-3-3h-15zm4.125 3a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5zm-3.873 8.703a4.126 4.126 0 017.746 0 .75.75 0 01-.351.92 7.47 7.47 0 01-3.522.877 7.47 7.47 0 01-3.522-.877.75.75 0 01-.351-.92zM15 8.25a.75.75 0 000 1.5h3.75a.75.75 0 000-1.5H15zM14.25 12a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H15a.75.75 0 01-.75-.75zm.75 2.25a.75.75 0 000 1.5h3.75a.75.75 0 000-1.5H15z" clip-rule="evenodd" />
                                    </svg>

                                    </Menu.Button>
                                </div>
                                <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                >
                                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    <Menu.Item>
                                        {({ active }) => (
                                        <button
                                            onClick={auth.logout}
                                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                        >
                                            Sign out
                                        </button>
                                        )}
                                    </Menu.Item>
                                    </Menu.Items>
                                </Transition>
                                </Menu>
                            </div>
                            </div>
                        </div>

                        <Disclosure.Panel className="sm:hidden">
                            <div className="space-y-1 px-2 pb-3 pt-2">
                            {navigation.map((item) => (
                                <Disclosure.Button
                                key={item.name}
                                as="a"
                                href={item.href}
                                className={classNames(
                                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                    'block rounded-md px-3 py-2 text-base font-medium'
                                )}
                                aria-current={item.current ? 'page' : undefined}
                                >
                                {item.name}
                                </Disclosure.Button>
                            ))}
                            </div>
                        </Disclosure.Panel>
                        </>
                    )}
                    </Disclosure>
            }
            </div>
        </header>
    )

}

export default NavBar