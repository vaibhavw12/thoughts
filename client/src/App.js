import React, { useState, useEffect } from 'react';
import './App.css'; // Import the external CSS file
import Header from './components/Header';
import Cards from './components/Cards';
import axios from 'axios'

const App = () => {
  // state hooks for managing states on client side
  const [title, setTitle] = useState('');       // setting title of the card
  const [thoughts, setThoughts] = useState([]); // an arrry to get all the data 
  const [autosave, setAutosave] = useState(true); // autosave option bydefault set to true

  // getting current date
  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1; 
  const year = currentDate.getFullYear();
  const formattedDate = `${day < 10 ? '0' + day : day}/${month < 10 ? '0' + month : month}/${year}`;

  // obj for storing data from user
  let thought = {
    title : title,
    data : '',  // bydefault data field is empty
    date : formattedDate
  }

  const getTitle = (e) => {
    setTitle(e.target.value);       // getting title of the card
  };

  // setting all data using thought object to database by post api
  const getNote = () => {
    axios.post('http://localhost:4000/',thought)
    .then((res)=>{
    }).catch((err)=>{
      console.log(err)
    })
  };

  // toggleAutosave function disable or enables the autosave mode
  const toggleAutosave = () => {
    setAutosave((prevAutosave) => !prevAutosave);
  };

  // useeffect hook runs on first render and when getnote runs 
  useEffect(() => {
    // get api to get all data from database
    axios.get('http://localhost:4000/')
    .then((res)=>{
      setThoughts(res.data.data)
    }).catch((err)=>{
      console.log(err)
    })
  }, [getNote]);

  return (
    
    <div className="container">
      <Header />
      <div className="content-container">
        <span className="title-label">Title:</span>
        <input
          id="noteTitle"
          onChange={getTitle}
          type="text"
          value={title}
          placeholder="Enter note title"
          className="title-input"
        />
        <button onClick={getNote} className="create-button btn">
          Create New Card
        </button>
        <div className="autosave-container">
          {autosave && <div className="autosave-message">Content will be autosaved </div>}
          <label className="autosave-label">
            <span className="autosave-text">Autosave Mode :</span>
            <div className="toggle-switch">
              <input type="checkbox" checked={autosave} onChange={toggleAutosave} className="toggle-input" />
              <div className="toggle-slider"></div>
            </div>
          </label>
        </div>
        <div className="grid-container">
          {/* sperate component for Cards for each card creation */}
          {thoughts &&
            thoughts.map((thought) => (
              <Cards
                key={thought._id}
                id={thought._id}
                title={thought.title}
                data={thought.data}
                date={thought.date}
                autosave={autosave}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default App;
