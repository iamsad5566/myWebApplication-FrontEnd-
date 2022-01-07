import React from 'react';
// eslint-disable-next-line
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/homePage';
import Works from './components/works';
import LoginInterface from './logInComponents/loginEntry';
import AuthenticatedPost from './logInComponents/AuthenticatedPost';
import BlogIndex from './pages/blogIndex';
import Post from './components/post';
import AuthenticatedUpdate from './logInComponents/AuthenticatedUpdate';
import Psychology from './pages/psychology';
import Testing from './pages/testing';

class Layout extends React.Component {
    
    render() { 
        
        return (
            <BrowserRouter>
                <Routes>
                    <Route path = "/" exact element = {<HomePage />}/>
                    <Route path = "/project" element = {<Works/>}/>
                    <Route path = "/login" element = {<LoginInterface/>}/>
                    <Route path = "/blog/*" element = {<BlogIndex/>}/>
                    <Route path = "/blog/post/*" element = {<Post/>}/>
                    <Route path = "/blog/add" element = {<AuthenticatedPost/>}/>
                    <Route path = "/blog/update" element = {<AuthenticatedUpdate/>}/>
                    <Route path = "/psychology" element = {<Psychology/>}/>
                    <Route path = "/testing" element = {<Testing/>}/>
                </Routes>
            </BrowserRouter>
        );
    }
}
 
export default Layout;