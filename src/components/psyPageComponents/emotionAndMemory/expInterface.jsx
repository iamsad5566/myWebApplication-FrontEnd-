import React, { useState } from 'react';
import NavBar from '../../../nav/nav';
import ExpManager from './expManager';
import Instruction from './instruction';

const ExpInterface = () => {
    const [agree, setAgree] = useState(false);
    const handleAgree = () => {
        setAgree(true);
    }

    document.title = "Psy exp"

    return ( 
        <React.Fragment>
            <NavBar/>
            {
                agree? <ExpManager/>:<Instruction handleAgree={handleAgree}/>
            }
        </React.Fragment>
     );
}
 
export default ExpInterface;