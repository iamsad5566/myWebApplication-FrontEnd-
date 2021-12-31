import React, {useState, useEffect} from 'react';
import NavBar from '../nav/nav';
import Header from '../components/blogger/hearder';
import MainContent from '../components/blogger/mainContent';
import axios from 'axios';
import AuthenticationService from '../api/AuthenticationService';

const BlogIndex = () => {
    const[data, setData] = useState([]);
    const[browseTimes, setBrowseTimes] = useState(0);
    
    function getArticle() {
        axios.get("http://localhost:8080/article/retrieveArticles")
            .then( response => {
                setData(response.data);
            }
        ).then(
            axios.get("http://localhost:8080/article/blogBrowse")
            .then( response => {
                setBrowseTimes(response.data);
            })
        )
    }
  
    useEffect(() => {
        if(AuthenticationService.isUserLoggedIn()) {
            let token = "Bearer " + sessionStorage.getItem("authenticatedUser");
            AuthenticationService.setupAxiosInterceptor(token);
            getArticle();
        }

        else {
            AuthenticationService.executeJWTAuthenticationService("guest", "guest")
                .then( response => {
                    AuthenticationService.setupAxiosInterceptor(AuthenticationService.createJWTToken(response.data.token));
                    sessionStorage.setItem("guestAuthenticaiton", response.data.token);
                    getArticle();
                });
        }
    }, []);

    return ( 
        <div>
            <React.Fragment>
                <NavBar/>
                <Header/>
                <MainContent data = {data}/>
                {AuthenticationService.isUserLoggedIn()? <div style={{textAlign:"center"}}> {`部落格瀏覽次數：${browseTimes}`} </div>:<></>}
            </React.Fragment>
        </div>
    );
}
 
export default BlogIndex;