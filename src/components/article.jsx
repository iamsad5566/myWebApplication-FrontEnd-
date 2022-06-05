import React, {useState, useEffect} from 'react';
import "../css/cssArticle.css";
import { Link } from 'react-router-dom';
import AuthenticationService from '../api/authenticationService';
import ManipulateData from '../api/manipulateData';
import GetData from '../api/getData';
import ReactMarkdown from 'react-markdown';

const Article = props => {
    const {title, content, date, postId} = props;
    const [articleTodayBrowse, setArticleTodayBrowse] = useState(0);
    const [articleAllBrowse, setArticleAllBrowse] = useState(0);

    useEffect(() => {
        if(AuthenticationService.isUserLoggedIn()) {
            GetData.getArticleBrowse(postId)
            .then(
                response => {
                    setArticleTodayBrowse(response.data[0]);
                    setArticleAllBrowse(response.data[1]);
                }
            )
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    } ,[postId])
    
    function handleDelete(postId) {
        if(window.confirm("Are you sure to delete it?")) {
            ManipulateData.delete(postId)
            .then(setTimeout(() => window.location.reload(), 1000));
        }
    }

    const styleForDeleteButton = {
        marginLeft:"1em"
    }

    return ( 
        <React.Fragment>
            <div className="post-preview">

                <Link to= {`/blog/${postId}`}>
                    <h2 className="post-title">{title}</h2>
                    <h3 className="post-subtitle">
                        <ReactMarkdown>
                            {content}
                        </ReactMarkdown>
                    </h3>
                </Link>
                
                <p className="post-meta">
                    Posted by
                    <a href="#!">{"  Yen-Kuang  "}</a>
                    on {date}
                </p>
                {AuthenticationService.isUserLoggedIn()? <button className = "btn btn-danger btn-sm" style = {styleForDeleteButton} onClick={() => handleDelete(postId)} >Delete</button>:<></>}
                {AuthenticationService.isUserLoggedIn()? <div> <p> {`今日點擊次數：${articleTodayBrowse}， 總點擊次數：${articleAllBrowse}`}</p> </div>:<></>}
            </div>
            <hr className="my-4" />
        </React.Fragment>
     );
}
 
export default Article;