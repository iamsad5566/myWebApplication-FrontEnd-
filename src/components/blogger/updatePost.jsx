import React, {useState} from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import AuthenticationService from '../../api/AuthenticationService';
import ManipulateData from '../../api/ManipulateData';

const UpdatePost = () => {
    const location = useLocation();
    let {id, title, content} = location.state;
    const[successful, setSuccessful] = useState(false);
    const[unsuccessful, setUnsuccessful] = useState(false);
    const[message, setMessage] = useState("");

    function handleSubmit(value) {
        let token = "Bearer " + sessionStorage.getItem("authenticatedUser");
        AuthenticationService.setupAxiosInterceptor(token);
        ManipulateData.updatePost(id, value.title, value.content)
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

        const formData = new FormData();
        formData.append("file", value.file);
        formData.append("title", value.title);
        
        if(value.file !== undefined)
            return ManipulateData.uploadPicture(formData);
    }

    function validate(value) {
        let error = {};
        if(value.title.length === 0) {
            error.title = "Please set the title!";
        }

        if(value.content.length === 0) {
            error.content = "Please say something!";
        }
        
        return error;
    }

    return ( 
        <div>
            <div className="container" style={{textAlign:"center"}}>
                <Formik initialValues = {{title:title, content:content}}
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
                                    <label>Title</label>
                                    <Field className="form-control" name = "title" autoComplete = "off"/>
                                </fieldset>

                                <fieldset className="form-group">
                                    <ErrorMessage className = "alert alert-warning" name="content" component="div" />
                                    <label>content</label>
                                    <Field className="form-control" component = "textarea" name = "content" autoComplete = "off" style={{height:"500px"}} />
                                </fieldset>

                                <div className="input-group mb-3"  style = {{marginTop:"2em"}}>
                                    <input type="file" className="form-control" name="file" onChange={event => formProps.setFieldValue("file", event.target.files[0])}/>
                                   <label className="input-group-text" form="inputGroupFile02">Upload</label>
                                </div>

                                <Link to = "/blog" className="btn btn-danger mt-3 mx-5" > Go back </Link>
                                <button className = "btn btn-success mt-3" type = "submit"> Submit </button> 
                            </Form>
                        )
                    }
                </Formik>
            </div>
        </div> 
    );
}
 
export default UpdatePost;