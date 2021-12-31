import React, {useState, useEffect} from 'react';
import "./cssArticle.css";
import { Link } from 'react-router-dom';
import AuthenticationService from '../../api/AuthenticationService';
import ManipulateData from '../../api/ManipulateData';
import axios from 'axios';

const Article = props => {
    const {id, title, content, date} = props;
    const [postBrowse, setPostBrowse] = useState(0);
    const contentArray = content.spilt("\n");

    useEffect(() => {
        if(AuthenticationService.isUserLoggedIn()) {
            axios.get(`http://localhost:8080/article/postBrowse?id=${id}`)
            .then(
                response => {
                    setPostBrowse(response.data);
                }
            )
        }
    } ,[])
    
    function handleDelete(id) {
        ManipulateData.delete(id)
        .then(setTimeout(() => window.location.reload(), 50));
    }

    return ( 
        <React.Fragment>
            <div className="post-preview">

                <Link to={`/blog/post/${id}`}>
                    <h2 className="post-title">{title}</h2>
                    <h3 className="post-subtitle">{contentArray.map( paragraph => { return <p>{paragraph}</p>} )}</h3>
                </Link>
                
                <p className="post-meta">
                    Posted by
                    <a href="#!">{"  Yen-Kuang  "}</a>
                    on {date}
                </p>
                {AuthenticationService.isUserLoggedIn()? <Link className = "btn btn-success btn-sm" to = {"/blog/update"} state = {{id:id, title:title, content:content}} style={{color:"white"}}>Update</Link>:<></>}
                {AuthenticationService.isUserLoggedIn()? <button className = "btn btn-danger btn-sm" style = {{marginLeft:"1em"}} onClick={() => handleDelete(id)} >Delete</button>:<></>}
                {AuthenticationService.isUserLoggedIn()? <p> {`觀看次數：${postBrowse}`} </p>:<></>}
            </div>
            <hr className="my-4" />
        </React.Fragment>
     );
}
 
export default Article;