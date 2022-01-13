import React, {useState, useEffect} from 'react';
import "../css/cssArticle.css";
import { Link } from 'react-router-dom';
import AuthenticationService from '../api/authenticationService';
import ManipulateData from '../api/manipulateData';
import GetData from '../api/getData';

const Article = props => {
    const {id, title, content, date} = props;
    const [articleTodayBrowse, setArticleTodayBrowse] = useState(0);
    const [articleAllBrowse, setArticleAllBrowse] = useState(0);
    const contentArray = content.split("\n");

    let subKey = 0;

    useEffect(() => {
        if(AuthenticationService.isUserLoggedIn()) {
            GetData.getArticleBrowse(id)
            .then(
                response => {
                    setArticleTodayBrowse(response.data[0]);
                    setArticleAllBrowse(response.data[1]);
                }
            )
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    } ,[])
    
    function handleDelete(id) {
        if(window.confirm("Are you sure to delete it?")) {
            ManipulateData.delete(id)
            .then(setTimeout(() => window.location.reload(), 50));
        }
    }

    const styleForUpdateButton = {
        color:"white"
    }

    const styleForDeleteButton = {
        marginLeft:"1em"
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
                {AuthenticationService.isUserLoggedIn()? <Link className = "btn btn-success btn-sm" to = {"/blog/update"} state = {{id:id, title:title, content:content}} style={styleForUpdateButton}>Update</Link>:<></>}
                {AuthenticationService.isUserLoggedIn()? <button className = "btn btn-danger btn-sm" style = {styleForDeleteButton} onClick={() => handleDelete(id)} >Delete</button>:<></>}
                {AuthenticationService.isUserLoggedIn()? <div> <p> {`今日點擊次數：${articleTodayBrowse}， 總點擊次數：${articleAllBrowse}`}</p> </div>:<></>}
            </div>
            <hr className="my-4" />
        </React.Fragment>
     );
}
 
export default Article;