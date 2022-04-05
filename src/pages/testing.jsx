import React from 'react';
import ThoughtsEntry from '../components/thoughtsEntry';
import HeaderTesting from '../components/headers/headerTesting';
import NavBar from '../nav/nav';

const Testing = () => {

    return ( 
        <React.Fragment>
            <HeaderTesting/>
            <NavBar/>
            <ThoughtsEntry/>
        </React.Fragment> );
}
 
export default Testing;