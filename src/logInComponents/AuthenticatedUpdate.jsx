import React from 'react';
import { Navigate } from "react-router-dom";
import AuthenticationService from '../api/authenticationService';
import UpdatePost from '../components/updatePost';

class AuthenticatedUpdate extends React.Component {
    render() { 
        if(AuthenticationService.isUserLoggedIn()) {
            return <UpdatePost/>
        } else {
            return <Navigate to = "/login"/>
        }
    }
}
 
export default AuthenticatedUpdate;