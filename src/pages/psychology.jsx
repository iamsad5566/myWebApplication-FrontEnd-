import React from 'react';
import NavBar from '../nav/nav';
import PsyMainContent from '../components/psyPageComponents/psyMainContent';
import HeaderPsy from '../components/headers/headerPsy';
//import HeaderPsy from '../components/headers/headerPsy';

const Psychology = () => {

    return ( 
        <React.Fragment>
            <HeaderPsy/>
            <NavBar/>
            <PsyMainContent/>
        </React.Fragment>
    );
}
 
export default Psychology;