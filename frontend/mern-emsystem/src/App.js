import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from 'react';

function App() {
  const [message, setMessage] = useState("");
    
  useEffect(() => {
    fetch("http://localhost:5000/message")
    .then((res) => res.json())
    .then((data) => setMessage(data.message))
  }, [])
  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>

    <div className='title'>
      Code Ninjas Marda Loop Notes App (HomeMade!)
    <h1>{message}</h1>
    </div>
  );
}

export default App;
