import React, { useState, useEffect } from 'react';

const Timer = props => {
  const [seconds, setSeconds] = useState(0);
  const [index, setIndex] = useState(0);
  const [op, setOpacity] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(seconds => seconds + 0.01);
      setOpacity(op => op + 0.005);
    }, 10);
    return () => clearInterval(interval);
  }, []);

  if(Math.floor(seconds) === 3) {
    setSeconds(seconds => 0);
    setIndex(index => index + 1);
    setOpacity(op => 0);
  }

  if(index === 5) {
    setIndex(index => 0);
  }

  const fontStyle = {
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    position:"relative",
    textAlign:"center", 
    fontStyle:"italic", 
    fontFamily:"Georgia",
    fontSize:"25px",
    testHeight:"50px"
  };

  var picStyle = {
    opacity: op
  }

  return (
    <React.Fragment>
      <div className = "col-sm 8" style = {{margin:"auto"}}>
       <img className = "img-fluid" src = {props.pictureList[Math.floor(index)].url} alt = "qq" style = {picStyle}/>   
      </div>

      <div className = "col-sm-4" style = {fontStyle}>
          <p style = {{opacity:op}}>{props.sentences[Math.floor(index)]}</p>
      </div>
    </React.Fragment>
  );
};

export default Timer;

