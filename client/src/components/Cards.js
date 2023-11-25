import React, { useState, useEffect } from 'react';
import './Cards.css'; 
import axios from 'axios';

// by passing prop getting data from App compnent to Card component
const Cards = (props) => {
  
  // initially setting sate of text as data that is already in the database
  const [text, setText] = useState(props.data);

  useEffect(() => {
    if(props.autosave){ // if use has enabel autosave mode then only content will automatically get autosave afer 1 sec
        // console.log(true)
        const autosaveTimer = setTimeout(() => {        
            submitChange();
        }, 1000);
      
        return () => clearTimeout(autosaveTimer);
    }else{
        // console.log(false)
    }
  }, [text, props.autosave]);  // will execute when conetnt in texarea change or autosave mode got change

  const changeInText = (e) => {
    setText(e.target.value);
  };

  // updates the text field and by using put api request sending modified data to database
  const submitChange = ()=> {
      axios.put(`http://localhost:4000/${props.id}`, { text })
      .then().catch((err)=> console.log(err))
  }

  // delete the card using delete request 
  const deleteCard = ()=>{
    axios.delete(`http://localhost:4000/${props.id}`)
      .then().catch((err)=> console.log(err))
  }

  return (
    <div className="card-container">
      <div className="card-content">
        <div className="card-title">{props.title}</div>
        <div className="card-date">{props.date}</div>
        {/* text content get autosave if enabled */}
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