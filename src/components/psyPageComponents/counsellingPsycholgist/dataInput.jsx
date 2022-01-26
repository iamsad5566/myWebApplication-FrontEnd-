import React, { Component } from 'react';
import { Formik, Form, ErrorMessage } from 'formik';
import GetPsyData from '../../../api/getPsyData';
import AuthenticationService from '../../../api/authenticationService';


class DataInput extends Component {
    state = {  } 
    
    validate = value => {
        let error = {};
        if(value.year.length === 0)
            error.year = "Please select the year!";

        if(value.county.length === 0)
            error.county = "Please select a county!";

        if(value.numbers.length === 0)
            error.numbers = "Please provide the numbers!";

        return error;
    }

    onSubmit = values => {
        // Stay the same page as Drawmap, so don't have to re-take the token

        if(!AuthenticationService.isUserLoggedIn()) {
            alert("Invalid authenticaton!");
            return;
        }

        GetPsyData.saveData(values.year, values.county, values.numbers);
        setTimeout( (window.location.reload()), 50);
    }

    handleReset = () => {
        if(!AuthenticationService.isUserLoggedIn()) {
            alert("Invalid authenticaton!");
            return;
        }
        
        if(window.confirm("Are you sure to reset the data?")) {
            GetPsyData.resetData();
            setTimeout( (window.location.reload()), 50)
        }
    }

    render() { 
        const styleForContainer = {
            textAlign:"center"
        }
        
        return (
            <div>
                <div className="container" style={styleForContainer}>
                    <Formik initialValues = {{year:"", county:"", numbers:""}}
                        onSubmit={this.onSubmit}
                        validate={this.validate} 
                        validateOnBlur={true}
                        validateOnChange={false}          
                    >

                        {
                            formProps => (
                                <Form style={{textAlign:"center"}}>

                                    <div style ={{display:"block", marginTop:"0.5em"}}>
                                        <ErrorMessage className = "alert alert-warning" name="year" component="div" />
                                    </div>
                                    <label> Year:     
                                        <select 
                                        name="year"
                                        value={formProps.values.year}
                                        onChange = { formProps.handleChange }
                                        style={{ display: 'block', marginTop:"0.5em", textAlign:"center" }}>
                                            
                                            <option value = "" label = "choose one year"/>
                                            <option value = "2019" label = "2019"/>
                                            <option value = "2020" label = "2020"/>
                                            <option value = "2021" label = "2021"/>

                                        </select>
                                    </label>
                                    
                                    <div style ={{display:"block", marginTop:"0.5em"}}>
                                       <ErrorMessage className = "alert alert-warning" name="county" component="div" />
                                    </div>
                                    <label> County:    
                                        <select
                                        name = "county"
                                        value = {formProps.values.county}
                                        onChange={formProps.handleChange}
                                        style={{ display: 'block', marginTop:"0.5em", textAlign:"center" }}>

                                            <option value = "" label = "choose one couny"/>
                                            <option value = "臺北市" label = "臺北市"/>
                                            <option value = "新北市" label = "新北市"/>
                                            <option value = "桃園市" label = "桃園市"/>
                                            <option value = "臺中市" label = "臺中市"/>
                                            <option value = "臺南市" label = "臺南市"/>
                                            <option value = "高雄市" label = "高雄市"/>
                                            <option value = "基隆市" label = "基隆市"/>
                                            <option value = "新竹市" label = "新竹市"/>
                                            <option value = "嘉義市" label = "嘉義市"/>
                                            <option value = "新竹縣" label = "新竹縣"/>
                                            <option value = "苗栗縣" label = "苗栗縣"/>
                                            <option value = "彰化縣" label = "彰化縣"/>
                                            <option value = "南投縣" label = "南投縣"/>
                                            <option value = "雲林縣" label = "雲林縣"/>
                                            <option value = "嘉義縣" label = "嘉義縣"/>
                                            <option value = "屏東縣" label = "屏東縣"/>
                                            <option value = "臺東縣" label = "臺東縣"/>
                                            <option value = "花蓮縣" label = "花蓮縣"/>
                                            <option value = "宜蘭縣" label = "宜蘭縣"/>
                                            <option value = "澎湖縣" label = "澎湖縣"/>
                                            <option value = "連江縣" label = "連江縣"/>
                                            <option value = "金門縣" label = "金門縣"/>

                                        </select>

                                    </label>

                                    <div style ={{display:"block", marginTop:"0.5em"}}>
                                        <ErrorMessage className = "alert alert-warning" name="numbers" component="div" />
                                    </div>

                                    <label> Numbers:
                                        <input className="form-control" name = "numbers" onChange={formProps.handleChange}  autoComplete = "off" style={{textAlign:"center", marginTop:"0.5em"}}/>
                                    </label>

                                    <div style ={{display:"block", marginTop:"0.5em"}}></div>

                                    <button className = "btn btn-danger mt-3 mx-3" type = "button" onClick={this.handleReset}> Reset </button>
                                    <button className = "btn btn-success mt-3 mx-3" type = "submit"> Submit </button>  
                                </Form>
                            )
                        }
                    </Formik>
                </div>
            </div>
        );
    }
}
 
export default DataInput;