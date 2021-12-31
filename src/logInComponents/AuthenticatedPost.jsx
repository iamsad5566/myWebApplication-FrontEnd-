import React from 'react';
import { Navigate } from "react-router-dom";
import AddPost from '../components/blogger/addPost';
import AuthenticationService from '../api/AuthenticationService';

class AuthenticatedPost extends React.Component {
    render() { 
        if(AuthenticationService.isUserLoggedIn()) {
            return (<AddPost/>)
        } else {
            return <Navigate to = "/login"/>
        }
    }
}
 
export default AuthenticatedPost;