import React from 'react';
import { Formik, Form, ErrorMessage, Field } from 'formik';

const IntroManager = (props) => {
    const {handleSubmitIntro, content} = props;

    function onSubmit(value) {
        handleSubmitIntro(value);
    }

    function validate(value) {
        let error = {};
        if(value.content.length === 0)
            error.content = "Please say something!";

        return error;
    }

    const styleForContainer = {
        textAlign:"center"
    }

    const styleForTextArea = {
        position:"relative",
        width:"100%",
        height:"300px",
    }
    
    return ( 
        
        <div>
            <div className="container" style={styleForContainer}>
                <Formik initialValues = {{content:content}}
                            onSubmit={value => onSubmit(value)}
                            validate={validate} 
                            validateOnBlur={true}
                            validateOnChange={false}          
                        >
                    {
                        formProps => (
                            <Form>
                                <div style ={{display:"block", marginTop:"0.5em"}}>
                                    <ErrorMessage className = "alert alert-warning" name="content" component="div" />
                                </div>

                                <Field className="form-control" component = "textarea" name = "content" onChange={formProps.handleChange}  autoComplete = "off" style={styleForTextArea}/>
                                
                                <button className = "btn btn-success mt-3" type = "submit"> Submit </button> 
                            </Form>
                        )
                    }

                </Formik>
            </div>
        </div>
     );
}
 
export default IntroManager;