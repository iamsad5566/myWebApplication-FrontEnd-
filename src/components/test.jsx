import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import AuthenticationService from '../api/authenticationService';
import ManipulateData from '../api/manipulateData';
import { select } from 'd3';
import "../css/editableDiv.css";

var indexArray = [];
var updatedArr = [];
var formArray = [];
var formData = new FormData();
var index = 0;

const Test = () => {
    const [successful, setSuccessful] = useState(false);
    const [unsuccessful, setUnsuccessful] = useState(false);
    const [message, setMessage] = useState("");
    const [inputValue, setInputValue] = useState("");
    const inputArea = useRef(null);
    const adminUser = "twyk";

    const onSubmit = value => {
        let title = value.title;
        let content = inputValue;
        let contentArr = content.split("-------------------------------------------------- ");
        for(let i = 0; i < contentArr.length; i++) {
            if(contentArr[i].startsWith("IMAGE"))
                indexArray.push(parseInt(contentArr[i].substring(5, contentArr[i].length-50)));
        }

        for(let i = 0; i < indexArray.length; i++) {
            updatedArr.push(formArray[indexArray[i]]);
        }

        for(let i = 0; i < updatedArr.length; i++) {
            formData.append("file", updatedArr[i]);
        }

        let token = "Bearer " + sessionStorage.getItem(adminUser);
        AuthenticationService.setupAxiosInterceptor(token);
        console.log(token);
        ManipulateData.saveArticle(title, content)
            .then( response => {
                if(response.status === 200) {
                    setSuccessful(true);
                    setMessage("Your post was successful saved!");
                } else {
                    setUnsuccessful(true);
                    setMessage("There was something wrong!");
                }
            }).catch (
                () => {
                    setUnsuccessful(true);
                    setMessage("There was something wrong!");
                }
            )

        
        if(formArray.length > 0) {
            formData.append("title", title);
            return ManipulateData.uploadPicture(formData);
        }
    }

    const handleChange = event => {
        let file = event.target.files[0];

        let reader = new FileReader();
        if(file !== undefined) {
            reader.readAsDataURL(file);
            reader.onload= () => {  
                let src = reader.result;
                select(".textarea")
                .append("text")
                .text("\n");

                select(".textarea")
                .append("div")
                .attr("class", "imageContainer")
                .text(`-------------------------------------------------- IMAGE${index++} --------------------------------------------------`);

                select(".imageContainer")
                .append("img")
                .attr("src", src)
                .attr("style", "width:80%; height:auto; padding:1em");
                formArray.push(file);
            };  
        }
    }

    const validate = value => {
        let error = {};
        if(value.title.length === 0) {
            error.title = "Please set the title!";
        }
        
        return error;
    }

    useEffect( ()=> {
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
        
    },[])

    const styleForContainer = {
        textAlign:"center"
    }

    const styleForForm = {
        textAlign:"center", 
        width:"80%", 
        position:"relative", 
        marginLeft:"2em", 
        marginTop:"5em"
    }

    return ( 
        <React.Fragment>
            <div className="container" style={styleForContainer}>
                <Formik initialValues = {{title:"", content:inputValue}}
                onSubmit={onSubmit}
                validate={validate} 
                validateOnBlur={true}
                validateOnChange={false}          
                >

                    {
                        formProps => (
                            <Form style = {styleForForm}>
                                <fieldset className="form-group">
                                    <ErrorMessage className = "alert alert-warning" name="title" component="div" />
                                    {successful? <div className = "alert alert-success">{message}</div>:<></>}
                                    {unsuccessful? <div className = "alert alert-danger">{message}</div>:<></>}
                                    <label>Title</label>
                                    <input className="form-control" name = "title" onChange={formProps.handleChange}  autoComplete = "off"/>
                                </fieldset>

                                <fieldset className="form-group">
                                    <ErrorMessage className = "alert alert-warning" name="content" component="div" />
                                    <label>content</label>
                                    <label htmlFor="file" id = "select" style={{display:"block"}}>
                                        <input type="file" className="form-control form-control-sm" id="formFileSm" onChange={event => handleChange(event)} />
                                    </label>

                                    <div className="textarea" ref={inputArea} contentEditable="true" placeholder="This is placeholder" />
                                    <div style = {{display:"none"}}>
                                        <Field className="form-control" component = "textarea" name = "content" value={inputValue} onChange={event => handleChange(event)} autoComplete = "off" />
                                    </div>
                                </fieldset>

                                <Link to = "/blog" className="btn btn-danger mt-3 mx-5" > Go back </Link>
                                <button className = "btn btn-success mt-3" type = "submit"> Submit </button> 
                            </Form>
                        )
                    }
                </Formik>
            </div>
                
        </React.Fragment>
     );
}
 
export default Test;

// class AddPost extends React.Component {
//     state = {
//         successful:false,
//         unsuccessful:false,
//         message:"",
//         adminUser:"twyk",
//         inputValue:"",
//         index:0
//     }

//     onSubmit = value => {
//         let title = value.title;
//         let content = this.state.inputValue;
//         let contentArr = content.split("\n");
//         for(let i = 0; i < contentArr.length; i++) {
//             if(contentArr[i].startsWith("IMAGE"))
//                 indexArray.push(parseInt(contentArr[i].substring(5, contentArr[i].length)));
//         }

//         for(let i = 0; i < indexArray.length; i++) {
//             updatedArr.push(formArray[indexArray[i]]);
//         }

//         for(let i = 0; i < updatedArr.length; i++) {
//             formData.append("file", updatedArr[i]);
//         }

//         let token = "Bearer " + localStorage.getItem(this.state.adminUser);
//         AuthenticationService.setupAxiosInterceptor(token);
//         console.log(token);
//         ManipulateData.saveArticle(title, content)
//             .then( response => {
//                 if(response.status === 200) {
//                     this.setState( {successful:true} );
//                     this.setState( {message:"Your post was successful saved!"} );
//                 } else {
//                     this.setState( {unsuccessful:true} );
//                     this.setState( {message:"There was something wrong!"} );
//                 }
//             }).catch (
//                 () => {
//                     this.setState( {unsuccessful:true} );
//                     this.setState( {message:"There was something wrong!"} );
//                 }
//             )

        
//         if(picArray.length > 0) {
//             formData.append("title", title);
//             return ManipulateData.uploadPicture(formData);
//         }
//     }

//     handleChange = event => {
//         let file = event.target.files[0];

//         let reader = new FileReader();
//         if(file !== undefined) {
//             reader.readAsDataURL(file);
//             reader.onload= () => {  
//                 let src = reader.result;
//                 select(".textarea")
//                 .append("img")
//                 .attr("src", src)
//                 .attr("style", "width:100%; height:auto; padding:1em");
//                 picArray.push(front+src+back);
//                 formArray.push(file);
//             };  
//         }
//     }

//     validate = value => {
//         let error = {};
//         if(value.title.length === 0) {
//             error.title = "Please set the title!";
//         }
        
//         return error;
//     }

//     handleInput = formProps => {
//         let string = formProps.target.innerHTML;
//         let index = 0;
//         for(let i = 0; i < picArray.length; i++) {
//             string = string.replace(picArray[i], `IMAGE${index++}`);
//         }
        
//         this.setState( {inputValue: string.replaceAll("<div>", "\n").replaceAll("</div>", "").replaceAll("<br>", "").replaceAll("&nbsp;", " ")} );
//     }
    
//     render() {
//         const {successful, unsuccessful, message, inputValue} = this.state;

//         const styleForContainer = {
//             textAlign:"center"
//         }

//         const styleForForm = {
//             textAlign:"center", 
//             width:"80%", 
//             position:"relative", 
//             marginLeft:"2em", 
//             marginTop:"5em"
//         }

//         const styleForTextArea = {
//             height:"500px"
//         }

//         const styleForFileInput = {
//             marginTop:"2em"
//         }

//         return (
//             <React.Fragment>
//                 <div className="container" style={styleForContainer}>
//                     <Formik initialValues = {{title:"", content:inputValue}}
//                     onSubmit={this.onSubmit}
//                     validate={this.validate} 
//                     validateOnBlur={true}
//                     validateOnChange={false}          
//                     >

//                         {
//                             formProps => (
//                                 <Form style = {styleForForm}>
//                                     <fieldset className="form-group">
//                                         <ErrorMessage className = "alert alert-warning" name="title" component="div" />
//                                         {successful? <div className = "alert alert-success">{message}</div>:<></>}
//                                         {unsuccessful? <div className = "alert alert-danger">{message}</div>:<></>}
//                                         <label>Title</label>
//                                         <input className="form-control" name = "title" onChange={formProps.handleChange}  autoComplete = "off"/>
//                                     </fieldset>

//                                     <fieldset className="form-group">
//                                         <ErrorMessage className = "alert alert-warning" name="content" component="div" />
//                                         <label>content</label>
//                                         <label htmlFor="file" id = "select" style={{display:"block"}}>
//                                             <input type="file" className="form-control form-control-sm" id="formFileSm" onChange={event => this.handleChange(event)} />
//                                         </label>

//                                         <div className="textarea" contentEditable="true" onInput={formProps => this.handleInput(formProps)} placeholder="This is placeholder" />
//                                         <div style = {{display:"none"}}>
//                                             <Field className="form-control" component = "textarea" name = "content" value={inputValue} onChange={event => this.handleChange(event)} autoComplete = "off" style={styleForTextArea} />
//                                         </div>
//                                     </fieldset>

//                                     <div className="input-group mb-3"  style = {styleForFileInput}>
//                                         <input type="file" className="form-control" name="file" onChange={event => formProps.setFieldValue("file", event.target.files[0])}/>
//                                     <label className="input-group-text" form="inputGroupFile02">Upload</label>
//                                     </div>

//                                     <Link to = "/blog" className="btn btn-danger mt-3 mx-5" > Go back </Link>
//                                     <button className = "btn btn-success mt-3" type = "submit"> Submit </button> 
//                                 </Form>
//                             )
//                         }
//                     </Formik>
//                 </div>
                
//             </React.Fragment>
//         );
//     }
// }
 
// export default AddPost;


