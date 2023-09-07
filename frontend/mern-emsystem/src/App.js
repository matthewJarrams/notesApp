import './App.css';
import React, {useState, useEffect} from 'react';
import Home from './pages/Home';
import NavBar from './components/NavBar';
import Search from './pages/Search';
import Student from './pages/Student';
import { BrowserRouter, Routes, Route } from 'react-router-dom'


function App() {

  return (
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
              path="/studentProfile/:id"
              element = {<Student />}
            />
            
          </Routes>
          
        </div>
      </BrowserRouter>
    </div>

  );
}

export default App;
