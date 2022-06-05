import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import authenticationService from '../../api/authenticationService';
import manipulateData from '../../api/manipulateData';
import NavBar from '../../nav/nav';
import HeaderPostman from '../headers/headerPostman';
import FirstTimeVisit from './firstTimeVisit';
import PostmanManager from './postmanManager';
import TextHandler from './textHandler';
import textStorage from './textStorage';

const PostmanInterface = () => {
    const adminUser = "twyk";
    const [template, setTemplate] = useState("");
    const [remoteTemplate, setRemoteTemplate] = useState([])
    const [index, setIndex] = useState(0);
    let key = 1;
    
    let handleChange = event => {
        let tmpTemplate = event.target.value;
        let tmpIndex = 0
        for(let i = 0; i < event.target.length; i++) {
            if(tmpTemplate === event.target[i].value) {
                let tmp = event.target[i].id;
                tmpIndex = tmp;
                break;
            }
        }
        setIndex(tmpIndex);
        setTemplate(tmpTemplate);
    }

    let keyExplation = 0;
    const styleForInput = {
        borderColor:"#5b88a4",
        borderStyle:"groove",
        textAlign:"center",
    }

    useEffect( () => {
        
        if(authenticationService.isUserLoggedIn()) {
            let token = authenticationService.createJWTToken(sessionStorage.getItem(adminUser));
            authenticationService.setupAxiosInterceptor(token);
            manipulateData.getAllTemplate()
            .then( response => {
                let tmpArr = [...remoteTemplate];
                tmpArr = response.data;
                setRemoteTemplate( tmpArr );
            } )
        }
        else {
            authenticationService.executeJWTAuthenticationService("guest", "guest")
                .then( response => {
                    let token = authenticationService.createJWTToken(response.data.token);
                    authenticationService.setupAxiosInterceptor(token);
                    manipulateData.getAllTemplate()
                    .then( response => {
                        let tmpArr = [...remoteTemplate];
                        tmpArr = response.data;
                        setRemoteTemplate( tmpArr );
                    } )
                    .catch( error => {
                        alert("Something wrong, please reload the page!");
                    } )
                } )
        }

        
        // eslint-disable-next-line
    } ,[])

    return (
        <React.Fragment>
            <HeaderPostman/>
            <NavBar/>
            <FirstTimeVisit/>
            <div className='container' style = {{marginTop:"4em"}}>
                <div className="row justify-content-md-center">
                    <div className="col col-lg-4" style = {{borderStyle:"groove", borderColor:"#5b88a4", textAlign:"center"}}>
                        <h3>Instruction:</h3>
                        {textStorage.Explation.split("\n").map( p => {
                            if(p.includes("<red>")) {
                                let pArr = p.split("<red>");
                                return (
                                    <React.Fragment key={keyExplation++}>
                                        <span style = {{display:"inline-block", marginTop:"1em", textAlign:"justify"}}>
                                            <span>{pArr[0]}</span>
                                            <span style={{color:"red"}}>{pArr[1]}</span>
                                            <span>{pArr[2]}</span>
                                        </span>
                                    </React.Fragment>
                                )
                            }

                            return <span style = {{display:"inline-block", marginTop:"1em", textAlign:"justify"}} key={keyExplation++}> {p} </span>
                        } )}
                    </div>
                    <div className="col-md-auto" style = {styleForInput}>
                        
                        <span style = {{display:"block", textAlign:"center", marginTop:"4em"}}>
                            <label>
                                Template select:　
                                <select name = "template" value = {template} onChange = {handleChange}>
                                    <option value = "" label = "Choose a template"/>
                                    {/* <option value = {textStorage.YuAn} label = "宇安's template"/>
                                    <option value = {textStorage.YuHsin} label = "宇昕's template"/> */}
                                    { remoteTemplate.map( template => {
                                        if(template.content !== undefined)
                                            return <option value = {template.content} key={template.id} id={template.id} label = {`Template ${key++}`}/>
                                        return <></>;
                                    } ) }
                                </select>
                            </label>
                        </span>
                        
                        <div style={{marginTop:"2em"}}> 
                            <span> Press </span>
                            <Link to = "add" style={{fontWeight:"bold", backgroundColor:"black", color:"white"}}>here</Link>
                            <span> to add a new template </span>
                        </div>

                        <PostmanManager text = {template} index = {index}/>
                    </div>
                    <div className="col col-lg-4" style = {{borderStyle:"groove", borderColor:"#5b88a4", textAlign:"center"}}>
                        <h3>Preview</h3>
                        <span style = {{display:"inline-block"}}>
                            <TextHandler text = {template} index = {index}/>
                        </span>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}
 
export default PostmanInterface;
