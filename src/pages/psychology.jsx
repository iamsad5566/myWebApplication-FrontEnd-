import React, {useState, useEffect} from 'react';
import {Navigate} from "react-router-dom";

const Psychology = () => {
    const[number, setNumber] = useState(5);
    let counter = 0;
    useEffect(()=>{
        const interval = setInterval(() => {
            counter++;
            if(counter === 5)
                clearInterval(interval);
            setNumber(number => number - 1);
        }, 1000);

        return () => clearInterval(interval);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    let styleForContainer = {
            height:"100vh",
            textAlign:"center",
            display:"flex", 
            alignItems:"center", 
            justifyContent:"center",
            fontSize:"2em"
        }
    
    return ( 
        <div style = {styleForContainer}> 
            <div>
                施工中......
            {number === 0? <Navigate to = "/" />:number} 秒後重新導向首頁
            </div>
        </div> );
}
 
export default Psychology;