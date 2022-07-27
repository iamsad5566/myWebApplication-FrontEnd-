import React, { useState } from 'react';
import NavBar from '../../../nav/nav';
import StroopController from './stroopController';
import StroopInstruction from './stroopInstruction';
import HeaderStroopEffect from '../../headers/headerStroopEffect';
import psyService from '../../../api/psyService';

const StroopEffect = () => {
    const [confirm, setConfirm] = useState(false);
    const[information, setInformation] = useState({
        name:"",
        age:"",
        sex:""
    })

    const handleInput = event => {
        var tmpInfo = {...information};
        switch (event.target.name) {
            case "nameInput":
                tmpInfo.name = event.target.value;
                setInformation(tmpInfo);
                return;
            case "ageInput":
                tmpInfo.age = event.target.value;
                setInformation(tmpInfo);
                return;
            case "sexInput":
                tmpInfo.sex = event.target.value;
                setInformation(tmpInfo);
                return;
            default:
                return;
        }
        
    }

    const handleConfirm = name => {
        // psyService.saveStroopEffectSubject(name, information)
        // .then( res => {
        //     if(res.status === 200) {
        //         setConfirm(true);
        //     } else {
        //         alert("The subject name already existed, please use another name.");
        //         console.log(information);
        //         // window.location.reload();
        //     }
        // } )

        setConfirm(true);
    }

    return ( 
        <React.Fragment>
            <HeaderStroopEffect/>
            <NavBar/>
            {confirm? <StroopController/>:<StroopInstruction handleConfirm={handleConfirm} handleInput={handleInput} information={information}/>}        
        </React.Fragment>
     );
}
 
export default StroopEffect;