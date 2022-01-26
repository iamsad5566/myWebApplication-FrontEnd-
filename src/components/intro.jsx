import React from 'react';
import "../css/cssForIntro.css";

const Intro = props => {
    const {content, loading} = props;
    let counter = 0;

    const styleForLoading = {
        height:"40vh", 
        textAlign:"center", 
        display:"flex", 
        alignItems:"center", 
        justifyContent:"center"
    }

    const styleForIntroContent = {
        textAlign:"justify",
        fontSize:"1em",
        fontWeight:"600",
        height:"inherit"
    }

    return ( 
        <React.Fragment>
            <div className="title">
                {loading?
                
                    <div style = {styleForLoading}>
                        <svg id = "loading" xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="currentColor" class="bi bi-arrow-clockwise" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
                            <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
                        </svg>
                    </div>

                    :<div style = {styleForIntroContent}> 
                        {content.split("\n").map( session => {
                                return <p key = {counter++} id = "intro"> {session} </p>
                            } 
                        )} 
                        
                    </div>
                    
                } 
            </div>
        </React.Fragment>
    );
}
 
export default Intro;




// <span className="title-word title-word-1">This </span>
// <span className="title-word title-word-2">is </span>
// <span className="title-word title-word-3">my </span>
// <span className="title-word title-word-4">text</span>
