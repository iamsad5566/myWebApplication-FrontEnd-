import React, {useEffect, useRef, useState} from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import AuthenticationService from '../api/authenticationService';
import ManipulateData from '../api/manipulateData';
import getData from '../api/getData';
import "../css/editableDiv.css";
import { select } from 'd3';

var indexArray = [];
var updatedArr = [];
var formArray = [];
let formData = new FormData();
var index = 0;

const UpdatePost = () => {
    const location = useLocation();
    let {title, content} = location.state;
    const [successful, setSuccessful] = useState(false);
    const [unsuccessful, setUnsuccessful] = useState(false);
    const [pictures, setPictures] = useState([]);
    const [message, setMessage] = useState("");
    const [loaded, setLoaded] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const adminUser = "twyk";
    let url = "data:image/jpeg;base64,";
    
    const inputArea = useRef(null);

    const handleSubmit = value => {
        ManipulateData.updatePost(value.title, inputValue)
            .then( response => {
                        if(response.status === 202) {
                            setSuccessful(true);
                            setMessage("Your post was successful updated!");
                        } else {
                            setUnsuccessful(true);
                            setMessage("There was something wrong!");
                        }
                    } 
            ).catch(
                () => {
                    setUnsuccessful(true);
                    setMessage("There was something wrong!");
                }
            )
        
        let content = inputValue;
        let contentArr = content.split("-------------------------------------------------- ");
        for(let i = 0; i < contentArr.length; i++) {
            if(contentArr[i].startsWith("IMAGE"))
                indexArray.push(parseInt(contentArr[i].substring(5, contentArr[i].length)));
        }

        for(let i = 0; i < indexArray.length; i++) {
            updatedArr.push(formArray[indexArray[i]]);
        }

        for(let i = 0; i < updatedArr.length; i++) {
            formData.append("file", updatedArr[i]);
        }

        if(formArray.length > 0) {
            formData.append("title", title);
            return ManipulateData.updatePicture(formData);
        }
    }

    const handleChange = event => {
        let file = event.target.files[0];

        let reader = new FileReader();
        if(file !== undefined) {
            let followUp = index;
            reader.readAsDataURL(file);
            reader.onload= () => {  
                console.log(index);
                let src = reader.result;
                select(".textarea")
                .append("text")
                .text("\n");

                select(".textarea")
                .append("div")
                .attr("class", "imageContainer")
                .attr("id", "update")
                .attr("style", "text-align:center")
                .text(`-------------------------------------------------- IMAGE${followUp++} --------------------------------------------------`);

                select("#update")
                .append("img")
                .attr("src", src)
                .attr("style", "width:80%; height:auto; padding:1em");
                formArray.push(file);
            };  
        }
    }

    const handleReload = () => {
        setTimeout(() => {
            window.location.reload();
        }, 100)
    }

    function validate(value) {
        let error = {};
        if(value.title.length === 0) {
            error.title = "Please set the title!";
        }
        
        return error;
    }

    useEffect( () => {
        let stringArr = content.split("\n");
        let {postId} = location.state;
        let token = "Bearer " + sessionStorage.getItem(adminUser);
        AuthenticationService.setupAxiosInterceptor(token);
        getData.getAllPicturesInArticle(postId)
        .then( response => {
            setPictures(response.data);
            setLoaded(true);
            
        } )
        

        if(loaded) {    
            for(let i = 0; i < stringArr.length; i++) {
                if(!stringArr[i].includes("IMAGE") && stringArr[i].length > 0) {
                    select(".textarea")
                    .append("div")
                    .text(stringArr[i]+"\n");
                } else {
                    if(pictures[index] === undefined) {
                        console.log("No picture");
                    } else {
                        fetch(url+pictures[index].data).then(res => {return res.blob()})
                        .then(file => {
                            formArray.push(file);
                        });

                        select(".textarea")
                        .append("text")
                        .text("\n");

                        select(".textarea")
                        .append("div")
                        .attr("class", "imageContainer")
                        .text(`-------------------------------------------------- IMAGE${index} --------------------------------------------------`);

                        select(".textarea")
                        .append("img")
                        .attr("src", url+pictures[index++].data)
                        .attr("style", "width:80%; height:auto; padding:1em");
                    }
                }
            }
        }

        inputArea.current.addEventListener("input", event => {
            let string = event.target.innerText;
            setInputValue(string);
        })

        inputArea.current.addEventListener("DOMNodeInserted", event => {
            if(event.target.toString() === "[object HTMLImageElement]") {
                let string = event.path[2].innerText;
                setInputValue(string);
            }
        })

        // eslint-disable-next-line
    }, [loaded])

    return ( 
        <React.Fragment>
            <div className="container" style={{textAlign:"center"}}>
                <Formik initialValues = {{title:title}}
                onSubmit={handleSubmit}
                validate={validate} 
                validateOnBlur={false}
                validateOnChange={true}          
                >

                    {
                        formProps => (
                            <Form style = {{textAlign:"center", width:"80%", position:"relative", marginLeft:"3em", marginTop:"5em"}}>
                                <fieldset className="form-group">
                                    {successful? <div className = "alert alert-success">{message}</div>:<></>}
                                    {unsuccessful? <div className = "alert alert-danger">{message}</div>:<></>}
                                    <ErrorMessage className = "alert alert-warning" name="title" component="div" />
                                    <h2>{title}</h2>
                                    <div style={{display:"none"}}>
                                        <Field className="form-control" name = "title" autoComplete = "off"/>
                                    </div>
                                </fieldset>

                                <fieldset className="form-group">
                                    <ErrorMessage className = "alert alert-warning" name="content" component="div" />
                                    <label>content</label>
                                    <label htmlFor="file" id = "select" style={{display:"block"}}>
                                        <input type="file" className="form-control form-control-sm" id="formFileSm" onChange={event => handleChange(event)} />
                                    </label>

                                    <div className="textarea" ref={inputArea} contentEditable="true" placeholder="This is placeholder" />
                                    <div style = {{display:"none"}}>
                                        <Field className="form-control" component = "textarea" name = "content" value = {inputValue} autoComplete = "off" style={{height:"500px"}} />
                                    </div>
                                </fieldset>

                                {/* <div className="input-group mb-3"  style = {{marginTop:"2em"}}>
                                    <input type="file" className="form-control" name="file" onChange={event => formProps.setFieldValue("file", event.target.files[0])}/>
                                   <label className="input-group-text" form="inputGroupFile02">Upload</label>
                                </div> */}

                                <Link to = {`../${title}`} onClick={handleReload} className="btn btn-danger mt-3 mx-5" > Go back </Link>
                                <button className = "btn btn-success mt-3" type = "submit"> Submit </button> 
                            </Form>
                        )
                    }
                </Formik>
            </div>
        </React.Fragment> 
    );
}
 
export default UpdatePost;