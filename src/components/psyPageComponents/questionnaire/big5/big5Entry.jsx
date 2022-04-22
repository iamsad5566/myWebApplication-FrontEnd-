import React, { useState } from 'react';
import HeaderBig5 from '../../../headers/headerBig5';
import Big5Instruction from './big5Instruction';
import Big5Questions from './big5Questions';

const Big5Entry = () => {
    const [check, setCheck] = useState(false);
    const handleCheck = () => {
        setCheck(true);
    }

    return ( 
        <React.Fragment>
            <HeaderBig5/>
            {check? <Big5Questions/>:<Big5Instruction handleCheck={handleCheck}/>}
        </React.Fragment>
     );
}
 
export default Big5Entry;