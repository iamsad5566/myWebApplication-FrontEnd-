import React, {useState, useEffect} from 'react';
import NavBar from '../nav/nav';
import Header from '../components/hearder';
import MainContent from '../components/mainContent';
import AuthenticationService from '../api/authenticationService';
import GetData from '../api/getData';

const BlogIndex = () => {
    document.title = "my blog";
    const adminUser = "twyk";

    const[data, setData] = useState([]);
    const[todayBrowseTimes, setTodayBrowseTimes] = useState(0);
    const[totalBrowseTimes, setTotalBrowseTimes] = useState(0);
    
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
                <NavBar/>
                <Header/>
                <MainContent data = {data}/>
                {AuthenticationService.isUserLoggedIn()? <div style={styleForBrowseTimes}> <p>{`今日瀏覽次數：${todayBrowseTimes}， 總瀏覽次數：${totalBrowseTimes}`}</p> </div>:<></>}
            </React.Fragment>
        </div>
    );
}
 
export default BlogIndex;