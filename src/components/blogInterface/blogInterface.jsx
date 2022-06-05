import React, {useState, useEffect} from 'react';
import MainContent from '../mainContent';
import Header from '../hearder';
import AuthenticationService from '../../api/authenticationService';
import GetData from '../../api/getData';
import "../../css/loadingIcon.css";
import categories from '../../utils/categories';
import Loading from '../Loading';

const BlogInterface = () => {

    const adminUser = "twyk";
    const[data, setData] = useState([]);
    const[todayBrowseTimes, setTodayBrowseTimes] = useState(0);
    const[totalBrowseTimes, setTotalBrowseTimes] = useState(0);
    const[isLoading, setIsLoading] = useState(false);
    const[postCategory, setPostCategory] = useState("All");
    let key = 0;

    const handleCategory = event => {
        setIsLoading(false);
        setPostCategory(event.target.value);
    }
    
    function getArticle() {
        GetData.getAllArticles(postCategory)
            .then( response => {
                setData(response.data.reverse());
            }
        ).then(
            GetData.getBlogBrowse()
            .then( response => {
                setTodayBrowseTimes(response.data[0]);
                setTotalBrowseTimes(response.data[1]);
            })
        ).then(
            () => {setIsLoading(true);}
        )
    }
  
    useEffect(() => {

        setTimeout(()=>{}, 50);

        if(AuthenticationService.isUserLoggedIn()) {
            let token = "Bearer " + sessionStorage.getItem(adminUser);
            AuthenticationService.setupAxiosInterceptor(token);
            getArticle(postCategory);
        }

        else {
            AuthenticationService.executeJWTAuthenticationService("guest", "guest")
                .then( response => {
                    AuthenticationService.registerSuccessfulLogin("guest", response.data.token);
                    getArticle(postCategory);
                })
                .catch( error => {
                    alert("Something wrong, please reload the page!");
                } )
        }
        // eslint-disable-next-line
    }, [postCategory]);

    const styleForBrowseTimes = {
        textAlign:"center"
    }

    const styleForCategory = {
        margin:"5em",
        textAlign:"center",
    }

    return ( 
        <React.Fragment>
            <div>
                <Header/>
                <div style={styleForCategory}>
                    <h2 style={{display:"inline", fontSize:"1.5em"}}>Category:</h2>
                        <select style={{marginLeft:"1em"}} value = {postCategory} onChange={event => handleCategory(event)}>
                            {categories.all.map( category => {
                                return <option value={category} key={key++}> {category} </option>;
                            } )}
                        </select>
                </div>

                {isLoading?
                    <MainContent data = {data}/>:<Loading/>
                }

                {AuthenticationService.isUserLoggedIn()? <div style={styleForBrowseTimes}> <p>{`今日瀏覽次數：${todayBrowseTimes}， 總瀏覽次數：${totalBrowseTimes}`}</p> </div>:<></>}
            </div>
            
        </React.Fragment>
    );
}
 
export default BlogInterface;