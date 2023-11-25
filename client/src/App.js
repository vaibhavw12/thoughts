import React, { useState, useEffect } from 'react';
import './App.css'; // Import the external CSS file
import Header from './components/Header';
import Cards from './components/Cards';
import axios from 'axios'

const YourComponent = () => {
  const [title, setTitle] = useState('');
  const [thoughts, setThoughts] = useState([]);
  const [autosave, setAutosave] = useState(true);

  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1; 
  const year = currentDate.getFullYear();
  const formattedDate = `${day < 10 ? '0' + day : day}/${month < 10 ? '0' + month : month}/${year}`;
  let thought = {
    title : title,
    data : '',
    date : formattedDate
  }

  const getTitle = (e) => {
    setTitle(e.target.value);
  };

  const getNote = () => {
    axios.post('http://localhost:4000/',thought)
    .then((res)=>{
    }).catch((err)=>{
      console.log(err)
    })
  };

  const toggleAutosave = () => {
    setAutosave((prevAutosave) => !prevAutosave);
  };
  useEffect(() => {
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

export default YourComponent;
