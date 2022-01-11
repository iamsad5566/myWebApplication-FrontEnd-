import React, { useState, useEffect } from 'react';

const Timer = props => {
  const {pictureList, sentences} = props;
  const [seconds, setSeconds] = useState(0);
  const [index, setIndex] = useState(0);
  const [op, setOpacity] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(seconds => seconds + 0.01);
      setOpacity(op => op + 0.0025);
    }, 10);
    return () => clearInterval(interval);
  }, []);

  if(Math.floor(seconds) === 4) {
    setSeconds(seconds => 0);
    setIndex(index => index + 1);
    setOpacity(op => 0);
  }

  if(index === 5) {
    setIndex(index => 0);
  }

  const styleForFormat = {
    margin:"auto",
    position:"relative",
    textAlign:"left",
    height:"auto",
    width:"100%"
  }

  const styleForFont = {
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

  var styleForPic = {
    opacity: op
  }

  const styleForHide = {
    display:"none"
  }

  let keyVal = 0;

  return (
    <React.Fragment>
        <div style = {styleForHide}> 
          {pictureList.map( picture => {
            return <img key = {keyVal} src = {picture.url} alt="qq"/>
          } )}
        </div>
      <div className = "col-sm 8" style = {styleForFormat}>
          <img className = "img-fluid" src = {pictureList[index].url} alt = "qq" style = {styleForPic} loading = "lazy"/>
      </div>

      <div className = "col-sm-4" style = {styleForFont}>
          <p style = {styleForPic}>{sentences[index]}</p>
      </div>
    </React.Fragment>
  );
};

export default Timer;

