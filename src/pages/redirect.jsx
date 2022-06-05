import React, { useEffect, useState } from 'react';

var num = 5;

const Redirect = () => {
    const [counter, setCounter] = useState(num);

    useEffect(
        () => {
            let counting = setInterval( () => {
                if(num > 0) {
                    num--;
                    setCounter(num);
                } else {
                    clearInterval(counting);
                    window.location.assign("https://tw-yk.com");
                }
            }, 1000)
        }
        // eslint-disable-next-line
    ,[])

    const styleForMiddle = {
        height:"100vh",
        display:"flex", 
        alignItems:"center", 
        justifyContent:"center",
        textAlign:"center"
    }

    return ( 
        <div>
            <div style={styleForMiddle}>
                <div style={{display:"block",marginBottom:"10em"}}>
                    <h2 style={{color:"#FF7F50"}}> Cannot browse the page </h2>
                    <span style={{marginTop:"2em", display:"inline-block", fontWeight:"bold", fontSize:"1.1em"}}> This address is not existed, please make sure if there's any type error. </span>
                    <div></div>
                    <span style={{marginTop:"2em", display:"inline-block", fontWeight:"bold", fontSize:"1.1em", color:"#00008B"}}> Redirecting to the home page: {counter}s </span>
                </div>
            </div>
        </div>
     );
}
 
export default Redirect;