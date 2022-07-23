import React from 'react';
import NavBar from '../nav/nav';
import PsyMainContent from '../components/psyPageComponents/psyMainContent';
import HeaderPsy from '../components/headers/headerPsy';
import psyService from '../api/psyService';
//import HeaderPsy from '../components/headers/headerPsy';

const Psychology = () => {
    psyService.getStroopEffect("yk")
    .then( res => {
        console.log(res)
    } )
    return ( 
        <React.Fragment>
            <HeaderPsy/>
            <NavBar/>
            <PsyMainContent/>
        </React.Fragment>
    );
}
 
export default Psychology;