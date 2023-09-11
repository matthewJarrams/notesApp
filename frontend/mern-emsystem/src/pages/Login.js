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
        <div>
        <form onSubmit={handleSubmit}>
        <br></br>
        <label>Username</label>
        <input type="text" placeholder="username" onChange={(e) => setUsername(e.target.value)}/>
        <br></br><br></br>
        <label>Password</label>
        <input type="password" onChange={(e) => setPassword(e.target.value)}></input>
        <br></br><br></br>
        <input  type="submit" value="Login" />
        </form>
        </div>
    )

}

export default Login