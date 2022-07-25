import React, { useState } from 'react';
import NavBar from '../../../nav/nav';
import StroopController from './stroopController';
import StroopInstruction from './stroopInstruction';
import HeaderStroopEffect from '../../headers/headerStroopEffect';

const StroopEffect = () => {
    const [confirm, setConfirm] = useState(false);
    const handleConfirm = () => {
        setConfirm(true);
    }

    return ( 
        <React.Fragment>
            <HeaderStroopEffect/>
            <NavBar/>
            {confirm? <StroopController/>:<StroopInstruction handleConfirm={handleConfirm}/>}        
        </React.Fragment>
     );
}
 
export default StroopEffect;