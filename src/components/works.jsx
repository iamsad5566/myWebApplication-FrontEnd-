import React from 'react';

const Works = props => {
    const {id, title, url, iconUrl} = props;
    
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
                {id + ". " + title}
                <a href={url} style={styleForUrl}>
                    <img src = {iconUrl} alt = "Click me!"/>
                </a> 
            </h4>
        </div>
     );
}
 
export default Works;