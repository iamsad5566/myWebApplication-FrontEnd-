import React from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import AuthenticationService from '../api/authenticationService';
import ManipulateData from '../api/manipulateData';

class AddPost extends React.Component {
    state = {
        successful:false,
        unsuccessful:false,
        message:"",
        adminUser:"twyk"
    }

    onSubmit = value => {
        let title = value.title;
        let content = value.content;
        let token = "Bearer " + sessionStorage.getItem(this.state.adminUser);
        AuthenticationService.setupAxiosInterceptor(token);
        ManipulateData.saveArticle(title, content)
            .then( response => {
                if(response.status === 200) {
                    this.setState( {successful:true} );
                    this.setState( {message:"Your post was successful saved!"} );
                } else {
                    this.setState( {unsuccessful:true} );
                    this.setState( {message:"There was something wrong!"} );
                }
            }).catch (
                () => {
                    this.setState( {unsuccessful:true} );
                    this.setState( {message:"There was something wrong!"} );
                }
            )

        const formData = new FormData();
        formData.append("file", value.file);
        formData.append("title", title);
        
        if(value.file !== undefined)
            return ManipulateData.uploadPicture(formData);
    }

    validate = value => {
        let error = {};
        if(value.title.length === 0) {
            error.title = "Please set the title!";
        }

        if(value.content.length === 0) {
            error.content = "Please say something!";
        }
        
        return error;
    }
    
    render() {
        const {successful, unsuccessful, message} = this.state;

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

        const styleForTextArea = {
            height:"500px"
        }

        const styleForFileInput = {
            marginTop:"2em"
        }

        return <div>
            <div className="container" style={styleForContainer}>
                <Formik initialValues = {{title:"", content:""}}
                onSubmit={this.onSubmit}
                validate={this.validate} 
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
                                    <Field className="form-control" component = "textarea" name = "content" autoComplete = "off" style={styleForTextArea} />
                                </fieldset>

                                <div className="input-group mb-3"  style = {styleForFileInput}>
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
            
        </div>;
    }
}
 
export default AddPost;


