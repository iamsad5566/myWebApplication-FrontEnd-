import React from 'react';
import NavBar from '../../../nav/nav';
import CentralPosition from '../CentralPosition';
import Instructions from '../Instructions';

const Instruction = props => {
    const instruction = Instructions.selectiveAttention;
    const handleClick = props.handleClick;


    return ( 
        <React.Fragment>
            <NavBar/>
            <div style={CentralPosition.central}>
                <div style={{display:"block"}}>
                    <h3 style={{width:"100%", lineHeight:"1.5"}}>{instruction}</h3>
                    <div style={{textAlign:"center", marginTop:"3em"}}>
                        <button className='btn btn-success' onClick={handleClick}>Confirm</button>
                    </div>
                </div>
            </div>
        </React.Fragment>
     );
}
 
export default Instruction;