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
    const[todayBrowseTimes, setTodayBrowseTimes] = useState(0);
    const[totalBrowseTimes, setTotalBrowseTimes] = useState(0);
    const[isLoading, setIsLoading] = useState(false);
    const[postCategory, setPostCategory] = useState("All");
    const[rowsForEachCategory, setRowsForEachCategory] = useState(0);
    let key = 0;

    const handleCategory = event => {
        setIsLoading(false);
        setPostCategory(event.target.value);
    }
    
    function getRows() {
        GetData.getRowsByCategory(postCategory)
            .then( response => {
                setRowsForEachCategory(response.data);
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
        if(AuthenticationService.isUserLoggedIn()) {
            let token = "Bearer " + sessionStorage.getItem(adminUser);
            AuthenticationService.setupAxiosInterceptor(token);
            getRows();
        } else {
            AuthenticationService.executeJWTAuthenticationService("guest", "guest")
                .then( response => {
                    AuthenticationService.registerSuccessfulLogin("guest", response.data.token);
                    getRows();
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
                    <MainContent rowsForEachCategory={rowsForEachCategory} category = {postCategory}/>:<Loading/>
                }

                {AuthenticationService.isUserLoggedIn()? <div style={styleForBrowseTimes}> <p>{`今日瀏覽次數：${todayBrowseTimes}， 總瀏覽次數：${totalBrowseTimes}`}</p> </div>:<></>}
            </div>
            
        </React.Fragment>
    );
}
 
export default BlogInterface;