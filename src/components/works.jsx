import React from 'react';
import AuthenticationService from '../api/authenticationService';

const Works = props => {
    const {id, title, url, iconUrl, handleDeleteWork} = props;
    
    const styleForWorks = {
        marginTop:"5vh",
        fontWeight:"bold"
    }

    const styleForUrl = {
        display:"block",
        marginTop:"2vh"
    }

    return ( 
        <div>
            <h4 style={styleForWorks}>
                <span> {id + ". " + title} </span>
                <div style = {styleForUrl}></div>
                <a href={url} target="_blank" rel ="noreferrer">
                    <img src = {iconUrl} alt = "Click me!"/>
                </a>
                
                <div style = {{display:"block"}}></div>
                {AuthenticationService.isUserLoggedIn()? <button className='btn btn-danger my-3' onClick = {() => handleDeleteWork(title)}> Delete </button>: <></>}
            </h4>
        </div>
     );
}
 
export default Works;