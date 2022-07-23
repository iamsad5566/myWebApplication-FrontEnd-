import React from 'react';

const StroopInstruction = props => {
    const styleForCenter = {
        height:"100vh",
        display:"flex", 
        alignItems:"center", 
        justifyContent:"center"
    }

    return ( 
        <React.Fragment>
            <div style={styleForCenter}>
                <div style={{display:"block"}}>
                    <span style={{display:"inline-block"}}>
                        Yo, what's up man? This is an instruction. Get yourself prepared, then press the "Confirm" button to start the experiment, please give the responses through pressing the left or right arrow button on your keyboard.
                    </span>
                    <div style={{textAlign:"center", marginTop:"2em"}}>
                        <button className='btn btn-success' style={{borderRadius:"30%"}} onClick = {props.handleConfirm}> Confirm </button>
                    </div>
                    
                </div>
            </div>
        </React.Fragment>
     );
}
 
export default StroopInstruction;