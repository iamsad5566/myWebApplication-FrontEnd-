import React from 'react';

const StroopInstruction = props => {
    
    const name = props.information.name;
    const age = props.information.age;
    const sex = props.information.sex;
    const handleInput = props.handleInput;

    const styleForCenter = {
        height:"100vh",
        display:"flex", 
        alignItems:"center", 
        justifyContent:"center"
    }

    return ( 
        <React.Fragment>
            <div style={styleForCenter}>
                <div style={{display:"block", margin: "0em 3em"}}>
                    <span> Before the experiment begin, please provide your name and some of the basic information. All these record will be well protected and only used for research pupose, make sure you are agree with this, and fill in the rows below.</span>
                    <div style={{marginTop:"2em", textAlign:"right"}}>
                        <label> Name:  
                            <input style={{margin:"0em 3em 0em 0.5em"}} value={name} name="nameInput" onChange={handleInput} autoComplete="off"/>
                        </label>
                    </div>
                    <div style={{marginTop:"1em", textAlign:"right"}}>
                        <label> Age:  
                            <input style={{margin:"0em 3em 0em 0.5em"}} value={age} name="ageInput" onChange={handleInput} autoComplete="off"/>
                        </label>
                    </div>
                    <div style={{marginTop:"1em", textAlign:"right"}}>
                        <label> Sex:  
                            <input style={{margin:"0em 3em 0em 0.5em"}} value={sex} name="sexInput" onChange={handleInput} autoComplete="off"/>
                        </label>
                    </div>
                    <span style={{display:"inline-block", marginTop:"3em"}}>
                        In the following up experiment, you will see a series of word related to colors. For some of the cases, the sematic of those words are different to the color you see, while some of them are the same. Get yourself prepared, then press the "Confirm" button to start the experiment, please give the responses through pressing the left or right arrow button on your keyboard. <span style={{color:"red"}}>During the process, <b>please do not refresh or close the page to avoid from any lose of the data.</b></span>
                    </span>
                    <div style={{textAlign:"center", marginTop:"2em"}}>
                        <button className='btn btn-success' style={{borderRadius:"30%"}} onClick = {() => props.handleConfirm(name)}> Confirm </button>
                    </div>
                    
                </div>
            </div>
        </React.Fragment>
     );
}
 
export default StroopInstruction;