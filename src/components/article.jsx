import React, {useState, useEffect} from 'react';
import "../css/cssArticle.css";
import { Link } from 'react-router-dom';
import AuthenticationService from '../api/authenticationService';
import ManipulateData from '../api/manipulateData';
import GetData from '../api/getData';

const Article = props => {
    const {id, title, content, date} = props;
    const [articleBrowse, setArticleBrowse] = useState(0);
    const contentArray = content.split("\n");
    let subKey = 0;

    useEffect(() => {
        if(AuthenticationService.isUserLoggedIn()) {
            GetData.getArticleBrowse(id)
            .then(
                response => {
                    setArticleBrowse(response.data);
                }
            )
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    } ,[])
    
    function handleDelete(id) {
        ManipulateData.delete(id)
        .then(setTimeout(() => window.location.reload(), 50));
    }

    return ( 
        <React.Fragment>
            <div className="post-preview">

                <Link to={`/blog/post?post=${title}/${id}`}>
                    <h2 className="post-title">{title}</h2>
                    <h3 className="post-subtitle"><div>{contentArray.map( paragraph => { return <p key = {subKey++}>{paragraph}</p>} )}</div></h3>
                </Link>
                
                <p className="post-meta">
                    Posted by
                    <a href="#!">{"  Yen-Kuang  "}</a>
                    on {date}
                </p>
                {AuthenticationService.isUserLoggedIn()? <Link className = "btn btn-success btn-sm" to = {"/blog/update"} state = {{id:id, title:title, content:content}} style={{color:"white"}}>Update</Link>:<></>}
                {AuthenticationService.isUserLoggedIn()? <button className = "btn btn-danger btn-sm" style = {{marginLeft:"1em"}} onClick={() => handleDelete(id)} >Delete</button>:<></>}
                {AuthenticationService.isUserLoggedIn()? <p> {`觀看次數：${articleBrowse}`} </p>:<></>}
            </div>
            <hr className="my-4" />
        </React.Fragment>
     );
}
 
export default Article;