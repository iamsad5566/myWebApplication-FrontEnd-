import React from 'react';
import { Navigate } from "react-router-dom";
import AuthenticationService from '../api/AuthenticationService';
import UpdatePost from '../components/blogger/updatePost';

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