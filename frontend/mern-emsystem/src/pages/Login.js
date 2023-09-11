import { useEffect, useState } from "react"
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword]= useState('');

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