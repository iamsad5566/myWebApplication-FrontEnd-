import React from 'react';
import authenticationService from '../api/authenticationService';
import AddWork from '../components/addWork';
import { Navigate } from 'react-router-dom';

const AuthenticatedAddWork = () => {
    if(authenticationService.isUserLoggedIn()) {
        return <AddWork/>;
    } else {
        return <Navigate to = "/login"/>;
    }
}
 
export default AuthenticatedAddWork;