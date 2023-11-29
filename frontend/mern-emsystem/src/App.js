import './App.css';
import React, {useState, useEffect, useCallback, Navigate} from 'react';
import Home from './pages/Home';
import NavBar from './components/NavBar';
import Student from './pages/Student';
import Login from './pages/Login';
import StudentAdmin from './pages/StudentAdmin';
import DojoAdmin from './pages/DojoAdmin';
import { AuthContext } from './context/authContext';
import { BrowserRouter, Routes, Route, UNSAFE_DataRouterStateContext } from 'react-router-dom'
import DataLists from './pages/DataLists';
import StudentList from './pages/StudentList';
import { auth } from './firebase';
import { FirebaseSignIn } from './components/auth/FirebaseSignIn';


function App() {

	const [authUser, setAuthUser] = useState(null);

	useEffect(() => {
		const listen = auth.onAuthStateChanged((user) => {
			if(user){
				setAuthUser(user);
			} else {
				setAuthUser(null);
			}
		});
	}, [])
  

	if (authUser) {
		return(
			<div className="App">
				<BrowserRouter>
					<NavBar />
					<div className='pages'>
					<Routes>
						<Route
						path="/"
						element={<Home/>}
						/>
						<Route 
						path="/login" 
						element={<Login />} 
						/>
						<Route
						path="/studentProfile/:id"
						element = {<Student />}
						/>
						<Route
						path="/studentAdmin/:id"
						element = {<StudentAdmin />}
						/>
						<Route
						path="/generalAdmin"
						element = {<DojoAdmin />}
						/>   
						<Route
						path="/dataLists"
						element = {<DataLists />}
						/>
						<Route
						path="/studentList"
						element = {<StudentList />}
						/>             
						
					</Routes>
					
					</div>
				</BrowserRouter>
				</div>

		)
	} else {
		return(
			<div>
				<FirebaseSignIn/>
			</div>
		)
	}
}

export default App;
