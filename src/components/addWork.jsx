import React from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import AuthenticationService from '../api/authenticationService';
import manipulateWorks from '../api/manipulateWorks';

class AddWork extends React.Component {
    state = {
        successful:false,
        unsuccessful:false,
        message:"",
        adminUser:"twyk"
    }

    onSubmit = value => {
        let title = value.title;
        let url = value.url;
        let iconUrl = value.iconUrl;

        manipulateWorks.saveWork(title, url, iconUrl)
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
    }

    validate = value => {
        let error = {};
        if(value.title.length === 0) {
            error.title = "Please set the title!";
        }

        if(value.url.length === 0) {
            error.url = "Please say something!";
        }
        
        return error;
    }

    componentDidMount() {
        AuthenticationService.setupAxiosInterceptor(AuthenticationService.createJWTToken(sessionStorage.getItem(this.state.adminUser)))
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

        const styleForGap = {
            marginTop:"2em"
        }

        const styleForTextArea = {
            height:"50px"
        }

        return <div>
            <div className="container" style={styleForContainer}>
                <Formik initialValues = {{title:"", url:"", iconUrl:""}}
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

                                <fieldset className="form-group" style = {styleForGap}>
                                    <ErrorMessage className = "alert alert-warning" name="url" component="div" />
                                    <label>url</label>
                                    <Field className="form-control" component = "textarea" name = "url" autoComplete = "off" style={styleForTextArea} />
                                </fieldset>

                                <fieldset className="form-group" style = {styleForGap}>
                                    <label>iconUrl</label>
                                    <Field className="form-control" component = "textarea" name = "iconUrl" autoComplete = "off" style={styleForTextArea} />
                                </fieldset>

                                <Link to = "/" className="btn btn-danger mt-3 mx-5" > Go back </Link>
                                <button className = "btn btn-success mt-3" type = "submit"> Submit </button> 
                            </Form>
                        )
                    }
                </Formik>
            </div>
            
        </div>;
    }
}
 
export default AddWork;


