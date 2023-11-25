import React, { useState, useEffect } from 'react';
import './Cards.css'; 
import axios from 'axios';

const Cards = (props) => {
  const [text, setText] = useState(props.data);

  useEffect(() => {
    if(props.autosave){
        // console.log(true)
        const autosaveTimer = setTimeout(() => {
            submitChange();
        }, 1000);
      
        return () => clearTimeout(autosaveTimer);
    }else{
        // console.log(false)
    }
  }, [text, props.autosave]);  

  const changeInText = (e) => {
    setText(e.target.value);
  };

  const submitChange = ()=> {
      axios.put(`http://localhost:4000/${props.id}`, { text })
      .then().catch((err)=> console.log(err))
  }

  const deleteCard = ()=>{
    axios.delete(`http://localhost:4000/${props.id}`)
      .then().catch((err)=> console.log(err))
  }

  return (
    <div className="card-container">
      <div className="card-content">
        <div className="card-title">{props.title}</div>
        <div className="card-date">{props.date}</div>
        <textarea
          onChange={changeInText}
          value={text}
          className="card-textarea"
        ></textarea>
        <div className="card-buttons">
            <button onClick={submitChange} className="card-button btn">
            Submit
            </button>
            <button onClick={deleteCard} className="card-button-delete btn">
            Delete
            </button>
        </div>
      </div>
    </div>
  );
};

export default Cards;