import React from 'react';
import NavBar from '../nav/nav';
import "../css/loadingIcon.css";
import { Outlet } from 'react-router-dom';
import HeaderBlogPage from '../components/headers/headerBlogPage';

const BlogIndex = () => {

    return ( 
        <React.Fragment>
            <HeaderBlogPage/>
            <NavBar/>
            <Outlet/>
        </React.Fragment>
    );
}
 
export default BlogIndex;