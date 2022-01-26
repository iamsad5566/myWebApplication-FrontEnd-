import React from 'react';
// eslint-disable-next-line
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

class Layout extends React.Component {
    
    render() { 
        
        return (
            <BrowserRouter>
                <Routes>
                    <Route index element = {<HomePage/>}/>
                    <Route path = "login" element = {<LoginInterface/>}/>

                    <Route path = "blog/*" element = {<BlogIndex/>}/>
                    <Route path = "blog/:postId" element = {<Post/>}/>
                    <Route path = "blog/add" element = {<AuthenticatedPost/>}/>
                    <Route path = "blog/update" element = {<AuthenticatedUpdate/>}/>
                    
                    <Route path = "psychology/*" element = {<Psychology/>}/>
                    <Route path = "psychology/counsellingPsychologist" element={<CounsellingContainer/>}/>

                    <Route path = "testing" element = {<Testing/>}/>
                    <Route path = "addWork" element = {<AuthenticatedAddWork/>}/>
                </Routes>
            </BrowserRouter>
        );
    }
}
 
export default Layout;