import './App.css';
import React, {useState, useEffect, useCallback} from 'react';
import Home from './pages/Home';
import NavBar from './components/NavBar';
import Search from './pages/Search';
import Student from './pages/Student';
import Login from './pages/Login';
import StudentAdmin from './pages/StudentAdmin';
import { AuthContext } from './context/authContext';
import { BrowserRouter, Routes, Route } from 'react-router-dom'


function App() {

  const [token, setToken] = useState(false);
  const [name, setName] = useState(false);
  const [expirationDate, setExpirationDate] = useState(false);
  const [userId, setUserId] = useState(false);

  const login = useCallback((token, name, id, texpirationDate) => {
    setToken(token);
    setName(name);
    setUserId(id);
    // const tokenExpiration = texpirationDate || new Date(new Date().getTime()+ 1000*60*60) //1000*60*60 converts to one hour after current time
    const tokenExpiration = texpirationDate || new Date(new Date().getTime() + 1000 * 60 * 60 * 24); //1000*60*60 converts to one hour after current time
    setExpirationDate(tokenExpiration);
    localStorage.setItem(
      "userData",
      JSON.stringify({
        token: token,
        name: name,
        userId: id,
        expiration: tokenExpiration.toISOString(),
      })
    );
  }, []);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (
      storedData &&
      storedData.token &&
      storedData.userId &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(
        storedData.token,
        storedData.name,
        storedData.userId,
        new Date(storedData.expiration)
      );
    }
  }, [login]);

  return (
    <AuthContext.Provider
    value={{
      isLoggedIn: !!token,
      token: token,
      name: name,
      userId: userId,
      login: login,
    }}
  >
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Search />
        <div className='pages'>
          <Routes>
            <Route
              path="/"
              element ={<Home />}
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
            
            
          </Routes>
          
        </div>
      </BrowserRouter>
    </div>
    </AuthContext.Provider>


  );
}

export default App;
