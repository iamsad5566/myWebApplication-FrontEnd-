import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import NavBar from '../nav/nav';
import Cover from '../components/cover';
import Tables from '../components/tables';
import Works from '../components/works';
import { Link } from "react-router-dom";
import AuthenticationService from '../api/authenticationService';
import ManipulateWorks from '../api/manipulateWorks';

class HomePage extends React.Component {
    state = {
        loginMessage:"Login if you are YK ",
        works:[],
        adminUser:"twyk",
        workKey: 1
    }

    logout = () => {
        AuthenticationService.logout();
        alert("Logged out");
        this.setState( {loginMessage: "Login if you are YK "} );
    }

    handleDeleteWork = title => {
        ManipulateWorks.deleteWork(title)
        .then(setTimeout(() => window.location.reload(), 50));
    }

    componentDidMount() {
        /* 
        First, get the JWT token, 
        then get data from the database
        */

        if(AuthenticationService.isUserLoggedIn()) {
            let token = AuthenticationService.createJWTToken(sessionStorage.getItem(this.state.adminUser));
            AuthenticationService.setupAxiosInterceptor(token);
            ManipulateWorks.getAllWorks()
            .then(
                response => {
                    this.setState({works:response.data});
                }
            )
        } else {
            AuthenticationService.executeJWTAuthenticationService("guest", "guest")
            .then( response => {
                AuthenticationService.registerSuccessfulLogin("guest", response.data.token);
                ManipulateWorks.getAllWorks()
                .then(
                    response => {
                        this.setState({works:response.data});
                    }
                )
            } )
        }
    }

    render() { 
        let {works, workKey} = this.state;
        const hasLoggedIn = AuthenticationService.isUserLoggedIn();
        document.title = "Home page";
        const styleForContainer = {
            position:"relative",
            top:"1px",
        };

        const styleForFullCover = {
            position:"relative",
            display:"flex",
            alignItem:"center",
            textAlign:"center",
            height:"100vh",
            margin:"auto"
        };

        const styleForPutInCenter = {
            margin:"auto",
            display:"flex", 
            alignItems:"center", 
            justifyContent:"center"
        }

        const styleForWorks = {
            marginTop:"10vh"
        }

        const styleForWorkFullCover = {
            position:"relative",
            display:"flex",
            alignItem:"center",
            textAlign:"center",
            height:"100vh",
            margin:"auto",
            overflowX:"hidden",
            overflowY:"scroll"
        };

        const styleForLoginButtonPostion = {
            textAlign:"center"
        }

        const styleForFooter = {
            marginRight:"6vh"
        }

        const styleForFooterText = {
            marginRight:"1vh",
            marginTop:"0.5em"
        }

        const styleForLeetCodeIcon = {
            marginLeft:"3vh"d
        }

        const styleForIcon = {
            marginRight:"1vh"
        }

        return (
            <React.Fragment>
                <NavBar />
                <div className = "container-fluid" style = {styleForContainer}>
                    
                    <div className = "row" style = {styleForFullCover}>
                        <Cover />
                    </div>

                    <div className = "row" style = {styleForContainer}>
                        <div className = "col-sm-4 p-4" style = {styleForPutInCenter}>
                            <img className = "img-fluid" src = "./myPic.jpeg" alt = "AAA"/>
                        </div >

                        <div className = "col-sm-8 p-4" style = {styleForPutInCenter}>
                            <Tables />
                        </div >
                    </div>

                    <div className = "row" style = {styleForWorkFullCover}>
                        <div style = {styleForWorks}> 
                            <h1>My works</h1>
                            {!hasLoggedIn? <></>:<Link to = "/addWork" className='btn btn-primary'> Add work </Link>}
                            {works.map( work => {
                                return <Works key = {workKey++} id = {workKey} title = {work.title} url = {work.url} iconUrl = {work.iconUrl} handleDeleteWork = {this.handleDeleteWork}/>
                            } )}
                        </div>
                    </div>

                    <div className = "row" style = {styleForLoginButtonPostion}>
                        <div> {!hasLoggedIn? <Link to="/login" className = "btn btn-primary"> {this.state.loginMessage} </Link> : <Link to="/" className = "btn btn-warning" onClick={this.logout}> Logout </Link>} </div>
                    </div>

                    <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
                        <div className="col-md-4 d-flex align-items-center">
                        <a href="/" className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1">
                            <svg className="bi" width="30" height="30"></svg>
                            <span className="text-muted"><img src = "gorilla.ico"/></span>
                        </a>

                        <a href = "https://leetcode.com/chen3210g/" target="_blank" rel ="noreferrer" style={styleForLeetCodeIcon}>
                            <img src ="https://cdn.iconscout.com/icon/free/png-256/leetcode-3521542-2944960.png" width="50" height="50" alt="NG"/>
                        </a>
                        
                        </div>

                        <ul className="nav col-md-4 justify-content-end list-unstyled d-flex" style = {styleForFooter}>
                            <li className='ms-3' style = {styleForFooterText}>
                                <h5 >Contact me:</h5>
                            </li>

                            <li className="ms-3" style = {styleForIcon}>
                                <a className="text-muted" href="https://www.facebook.com/sam.chen.75491/" target = "_blank" rel="noreferrer">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" className="bi bi-facebook" viewBox="0 0 16 16">
                                        <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
                                    </svg>
                                </a>
                            </li>
                            
                            <li className="ms-3">
                                <a className="text-muted" href="mailto:chen3210g@gmail.com">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" className="bi bi-envelope" viewBox="0 0 16 16">
                                        <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z"/>
                                    </svg>
                                </a>
                            </li>
                        </ul>
                    </footer>
                </div>
        </React.Fragment>);
    }
}
 
export default HomePage;