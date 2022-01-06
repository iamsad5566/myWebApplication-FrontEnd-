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
    const[browseTimes, setBrowseTimes] = useState(0);
    
    function getArticle() {
        GetData.getAllArticles()
            .then( response => {
                setData(response.data.reverse());
            }
        ).then(
            GetData.getBlogBrowse()
            .then( response => {
                setBrowseTimes(response.data);
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