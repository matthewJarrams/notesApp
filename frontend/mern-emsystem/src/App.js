import './App.css';
import React, {useState, useEffect} from 'react';
import Home from './pages/Home';
import NavBar from './components/NavBar';
import Search from './pages/Search';
import { BrowserRouter, Routes, Route } from 'react-router-dom'


function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
       
        <div className='pages'>
          <Routes>
            <Route
              path="/"
              element ={<Home />}
            />
            
          </Routes>
          <Search />
        </div>
      </BrowserRouter>
    </div>

  );
}

export default App;
