import React, {useState, useEffect} from 'react';
import DocumentMeta from 'react-document-meta';
import NavBar from '../nav/nav';
import Header from '../components/hearder';
import MainContent from '../components/mainContent';
import AuthenticationService from '../api/authenticationService';
import GetData from '../api/getData';
import "../css/loadingIcon.css";

const BlogIndex = props => {
    const adminUser = "twyk";
    const[data, setData] = useState([]);
    const[todayBrowseTimes, setTodayBrowseTimes] = useState(0);
    const[totalBrowseTimes, setTotalBrowseTimes] = useState(0);
    const[isLoading, setIsLoading] = useState(false);

    const meta = {
        title:"Yen-Kuang's Blog",
        description:"Wellcome to my blog, I will share about books that I love here!",
        canonical:"https://tw-yk.website/blog",
        meta:{
            charset:"utf-8"
        }
    }
    
    function getArticle() {
        GetData.getAllArticles()
            .then( response => {
                setData(response.data.reverse());
            }
        ).then(
            GetData.getBlogBrowse()
            .then( response => {
                setTodayBrowseTimes(response.data[0]);
                setTotalBrowseTimes(response.data[1]);
            })
        )
        
        setIsLoading(true);
    }
  
    useEffect(() => {

        setTimeout(()=>{}, 50);

        if(AuthenticationService.isUserLoggedIn()) {
            let token = "Bearer " + sessionStorage.getItem(adminUser);
            AuthenticationService.setupAxiosInterceptor(token);
            getArticle();
        }

        else {
            AuthenticationService.executeJWTAuthenticationService("guest", "guest")
                .then( response => {
                    AuthenticationService.registerSuccessfulLogin("guest", response.data.token);
                    getArticle();
                });
        }
    }, []);

    const styleForBrowseTimes = {
        textAlign:"center"
    }

    const styleForLoading = {
        height:"40vh", 
        textAlign:"center", 
        display:"flex", 
        alignItems:"center", 
        justifyContent:"center"
    }

    return ( 
        <div>
            <React.Fragment>
                <DocumentMeta {...meta}>
                <NavBar/>
                <Header/>
                {isLoading? <MainContent data = {data}/>:
                    <div style = {styleForLoading}>
                        <svg id = "loading" xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="currentColor" class="bi bi-arrow-clockwise" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
                            <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
                        </svg>
                    </div>
                }
                {AuthenticationService.isUserLoggedIn()? <div style={styleForBrowseTimes}> <p>{`今日瀏覽次數：${todayBrowseTimes}， 總瀏覽次數：${totalBrowseTimes}`}</p> </div>:<></>}
                </DocumentMeta>
            </React.Fragment>
        </div>
    );
}
 
export default BlogIndex;