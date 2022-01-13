import React, {useState, useEffect} from 'react';
import DocumentMeta from 'react-document-meta';
import NavBar from '../nav/nav';
import Header from '../components/hearder';
import MainContent from '../components/mainContent';
import AuthenticationService from '../api/authenticationService';
import GetData from '../api/getData';

const BlogIndex = props => {
    const adminUser = "twyk";
    const[data, setData] = useState([]);
    const[todayBrowseTimes, setTodayBrowseTimes] = useState(0);
    const[totalBrowseTimes, setTotalBrowseTimes] = useState(0);

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
    }
  
    useEffect(() => {
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

    return ( 
        <div>
            <React.Fragment>
                <DocumentMeta {...meta}>
                <NavBar/>
                <Header/>
                <MainContent data = {data}/>
                {AuthenticationService.isUserLoggedIn()? <div style={styleForBrowseTimes}> <p>{`今日瀏覽次數：${todayBrowseTimes}， 總瀏覽次數：${totalBrowseTimes}`}</p> </div>:<></>}
                </DocumentMeta>
            </React.Fragment>
        </div>
    );
}
 
export default BlogIndex;