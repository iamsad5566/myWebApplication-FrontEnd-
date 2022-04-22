import React from 'react';

const Instruction = props => {
    const handleAgree = props.handleAgree;
    const styleForMiddle = {
        margin:"auto",
        height:"100vh",
        display:"flex", 
        alignItems:"center", 
        justifyContent:"center",
    }

    return ( 
        <React.Fragment>
            <div style={styleForMiddle}>
                <div style={{display:"block", textAlign:"center"}}>
                    This is an instruction
                    <div style={{marginTop:"2em"}}></div>
                    <span> <button className='btn btn-info' style={{borderRadius:"30%"}} onClick={handleAgree}>Agree</button> </span>
                </div>
            </div>
        </React.Fragment>
     );
}
 
export default Instruction;