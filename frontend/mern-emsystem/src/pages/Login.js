import { useEffect, useState } from "react"
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import React, { useContext } from "react";
import { FirebaseSignIn } from '../components/auth/FirebaseSignIn';

import { AuthContext } from "../context/authContext";


const Login = () => {
	return(
		<div>
			<FirebaseSignIn/>
		</div>
	)
}

export default Login