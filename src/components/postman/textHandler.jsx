import React from 'react';
import authenticationService from '../../api/authenticationService';
import manipulateData from '../../api/manipulateData';

const TextHandler = props => {
    let template = "";
    let index = 0;
    if(props.text !== undefined) {
        template = props.text;
        index = props.index;
    }

    const handleDelete = () => {
        manipulateData.deleteTemplate(index);
        setTimeout( () => {
            window.location.reload();
        } ,500);
    }
    

    return ( 
        <React.Fragment>
            <span style = {{display:"inline-block", marginTop:"1em", width:"100%", textAlign:"justify"}} dangerouslySetInnerHTML={{__html: template}}>
                {/* {template.split("\n").map( p => {
                    if(p.includes("<ul>")) {
                        let list = p.replace("<ul>","").split("<li>");
                        
                        return (
                            list.map( li => {
                                if(li.includes("<red>") && li.includes("<i><strong>")) {
                                    let focusArr = li.replaceAll("<red>", "").split("<i><strong>");
                                    return (
                                            <li style={{marginLeft:"3em", marginTop:"1em", color:"red"}} key={index++}>
                                                {focusArr[0]}
                                                <i>
                                                    <strong>
                                                        {focusArr[1]}
                                                    </strong>
                                                </i>
                                                {focusArr[2]}
                                            </li>
                                    ) 
                                }

                                return <li style={{marginLeft:"3em", marginTop:"1em"}} key={index++}>{li}</li>
                            } )
                        )
                    }

                    else if(p.includes("<red>")) {
                        return (
                            <span key={index++} style={{color:"red", display:"inline-block", marginTop:"1em"}}> {p.replaceAll("<red>", "")} </span>
                        )
                    }

                    return <span key={index++} style = {{display:"inline-block", marginTop:"1em"}}> {p} </span>
                } )} */}
            </span>
            <div style={{textAlign:"end", margin:"1em"}}>
                {authenticationService.isUserLoggedIn()?  <button className='btn btn-danger' type="button"  style={{borderRadius:"50%", fontSize:"0.6em"}} onClick={handleDelete}> Delete </button>:<></>}
            </div>
        </React.Fragment>
     );
}
 
export default TextHandler;