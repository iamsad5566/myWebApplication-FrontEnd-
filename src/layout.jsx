import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/homePage';
import LoginInterface from './logInComponents/loginEntry';
import AuthenticatedPost from './logInComponents/AuthenticatedPost';
import BlogIndex from './pages/blogIndex';
import Post from './components/post';
import AuthenticatedUpdate from './logInComponents/AuthenticatedUpdate';
import Psychology from './pages/psychology';
import Testing from './pages/testing';
import CounsellingContainer from './components/psyPageComponents/counsellingPsycholgist/counsellingContainer';
import AuthenticatedAddWork from './logInComponents/AuthenticatedAddWork';
import ChatRoom from './components/chatRoom/chatRoom';
import BlogInterface from './components/blogInterface/blogInterface';
import {HelmetProvider} from "react-helmet-async";
import Redirect from './pages/redirect';
import PostmanRegister from './components/postman/postmanRegister';
import PostmanInterface from './components/postman/postmanInterface';


class Layout extends React.Component {
    
    render() { 
        
        return (
            <HelmetProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path= "/" element = {<HomePage/>}/>
                        <Route path = "login" element = {<LoginInterface/>}/>

                        <Route path = "/blog" element = {<BlogIndex/>}>
                            <Route index element = {<BlogInterface/>}/>
                            <Route path = "add" element = {<AuthenticatedPost/>}/>
                            <Route path= ":title" element = {<Post/>}/>
                            <Route path = "update" element = {<AuthenticatedUpdate/>}/>
                            <Route path = "*" element = {<Redirect/>}/>
                        </Route>
                        
                        <Route path = "psychology" element = {<Psychology/>}/>
                        <Route path = "psychology/counsellingPsychologist" element={<CounsellingContainer/>}/>

                        <Route path = "testing" element = {<Testing/>}/>
                        <Route path = "testing/chatRoom" element = {<ChatRoom/>}/>
                        <Route path = "testing/postman" element = {<PostmanInterface/>}/>
                        <Route path = "testing/postman/register" element = {<PostmanRegister/>}/>

                        <Route path = "addWork" element = {<AuthenticatedAddWork/>}/>
                        <Route path = "*" element = {<Redirect/>}/>
                    </Routes>
                </BrowserRouter>
            </HelmetProvider>
        );
    }
}
 
export default Layout;