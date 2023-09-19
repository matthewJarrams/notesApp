import { useEffect, useState } from "react"
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import React, { useContext } from "react";


import { AuthContext } from "../context/authContext";


const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword]= useState('');
    const navigate = useNavigate();
    const auth = useContext(AuthContext);



    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("login pressed");
        console.log(username, password);

        const loginAttempt = {username, password}
        
        const response = await fetch(`http://localhost:5000/login`, {
            method: 'POST',
            body: JSON.stringify(loginAttempt),
            headers: {
              'Content-Type': 'application/json'
            }
          })
          const json = await response.json()

          console.log(json.token)

        if(json.login)
        {
            const token = json.token;
            const username = json.username;
            const id = json.userId;
            auth.login(token, username, id);
            // auth.token = token;
            // auth.name = json.name;
            // auth.username = username;
            // auth.isLoggedIn = true;
            // auth.userId = id;
            console.log(auth, json.token)
            navigate('/');
        }
    }


    return(
        // <div>
        // <form onSubmit={handleSubmit}>
        // <br></br>
        // <label>Username</label>
        // <input type="text" placeholder="username" onChange={(e) => setUsername(e.target.value)}/>
        // <br></br><br></br>
        // <label>Password</label>
        // <input type="password" onChange={(e) => setPassword(e.target.value)}></input>
        // <br></br><br></br>
        // <input  type="submit" value="Login" />
        // </form>
        // </div>
<div class="flex justify-center">

<div class="w-full max-w-xs">
<form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
  <div class="mb-4">
    <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
      Username
    </label>
    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)}/>
  </div>
  <div class="mb-6">
    <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
      Password
    </label>
    <input class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" onChange={(e) => setPassword(e.target.value)}/>
    <p class="text-red-500 text-xs italic">Please enter your username and password.</p>
  </div>
  <div class="flex items-center justify-between">
    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
      Login
    </button>
  </div>
</form>
</div>
</div>
    )

}

export default Login