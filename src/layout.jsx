import React from 'react';
// eslint-disable-next-line
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/homePage';
import ProjectComponent from './components/projectComponent';
import LoginInterface from './logInComponents/loginEntry';
import AuthenticatedPost from './logInComponents/AuthenticatedPost';
import Test from './components/test';
import BlogIndex from './pages/blogIndex';
import Post from './components/blogger/post';
import AuthenticatedUpdate from './logInComponents/AuthenticatedUpdate';

class Layout extends React.Component {
    
    render() { 
        
        return (
            <BrowserRouter>
                <Routes>
                    <Route path = "/" exact element = {<HomePage />}/>
                    <Route path = "/project" element = {<ProjectComponent/>}/>
                    <Route path = "/login" element = {<LoginInterface/>}/>
                    <Route path = "/test" element = {<Test/>}/>
                    <Route path = "/blog/*" element = {<BlogIndex/>}/>
                    <Route path = "/blog/post/*" element = {<Post/>}/>
                    <Route path = "/blog/add" element = {<AuthenticatedPost/>}/>
                    <Route path = "/blog/update" element = {<AuthenticatedUpdate/>}/>
                </Routes>
            </BrowserRouter>
        );
    }
}
 
export default Layout;