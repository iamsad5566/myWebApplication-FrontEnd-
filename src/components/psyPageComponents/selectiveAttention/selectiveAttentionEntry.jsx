import React, { useState } from 'react';
import NavBar from '../../../nav/nav';
import BlockController from './blockController';
import Instruction from './instruction';

const SelectiveAttentionEntry = () => {
    const [confirmed, setConfirmed] = useState(false);

    const handleClick = () => {
        setConfirmed(true);
    }

    return ( 
        <React.Fragment>
            <NavBar/>
            {!confirmed? <Instruction handleClick={handleClick}/>:<BlockController/>}
        </React.Fragment>
     );
}
 
export default SelectiveAttentionEntry;