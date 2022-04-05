import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

var num = 5;

const Redirect = () => {
    const [counter, setCounter] = useState(num);
    const navigate = useNavigate();

    useEffect(
        () => {
            let counting = setInterval( () => {
                if(num > 0) {
                    num--;
                    setCounter(num);
                } else {
                    clearInterval(counting);
                    return navigate("/");
                }
            }, 1000)
        }
        // eslint-disable-next-line
    ,[])

    const styleForTitle = {
        marginTop:"10em"
    }

    return ( 
        <React.Fragment>
            <h1 style={styleForTitle}>Redirecting</h1>
            {counter}
        </React.Fragment>
     );
}
 
export default Redirect;