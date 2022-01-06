import React, {useCallback} from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import AuthenticationService from '../api/authenticationService';
import {useDropzone} from "react-dropzone";
import axios from 'axios';

class Test extends React.Component {
    state = {
        data: "12"
    }
    onSubmit = value => {
        let title = value.title;
        let content = value.content;
        let token = "Bearer " + sessionStorage.getItem("authenticatedUser");
        AuthenticationService.setupAxiosInterceptor(token);
        AuthenticationService.test(title, content);
    }

    validate = value => {
        let error = {};
        if(value.title.length === 0) {
            error.title = "Please set the title!";
        }

        if(value.content.length === 0) {
            error.title = "Please say something!";
        }
        
        return error;
    }
    
    

    render() {
        return <div>
            <div className="container">
                <Formik initialValues = {{title:"", content:""}}
                onSubmit={this.onSubmit}
                validate={this.validate} 
                validateOnBlur={false}
                validateOnChange={false}          
                >

                    {
                        props => (
                            <Form style = {{width:"800px"}}>
                                <fieldset className="form-group">
                                    <ErrorMessage className = "alert alert-warning" name="title" component="div" />
                                    <label>title</label>
                                    <Field className="form-control" name = "title" autoComplete = "off"/>
                                </fieldset>

                                <fieldset className="form-group">
                                    <ErrorMessage className = "alert alert-warning" name="content" component="div" />
                                    <label>content</label>
                                    <Field className="form-control" component = "textArea" name = "content" autoComplete = "off" style={{height:"500px"}} />
                                </fieldset>
                                <button className = "btn btn-success mt-3" type = "submit"> Submit </button> 
                            </Form>
                        )
                    }
                </Formik>
                <Dropzone/>
            </div>
        </div>;
    }
}
 
export default Test;

function Dropzone() {
    const onDrop = useCallback(acceptedFiles => {
        const file = acceptedFiles[0];
        console.log(file);
        const formData = new FormData();
        formData.append("file", file);
        let token = "Bearer " + sessionStorage.getItem("authenticatedUser");
        AuthenticationService.setupAxiosInterceptor(token);
        axios.post("https://tw-yk.website:8443/article/upload", formData, {headers:{"Content-type":"multipart/form-data"}})
        .then(()=> {
            console.log("file uploaded successfully")
        })
      // Do something with the files
    }, [])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
  

    return (
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {
          isDragActive ?
            <p>Drop the files here ...</p> :
            <p>Drag 'n' drop some files here, or click to select files</p>
        }
      </div>
    )
  }

