import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import NavBar from '../nav/nav';
import Cover from '../components/cover';
import TableInterface from '../components/tableComponents/tablesInterface';
import Works from '../components/works';
import { Link } from "react-router-dom";
import AuthenticationService from '../api/authenticationService';
import ManipulateWorks from '../api/manipulateWorks';
import IntroManager from '../components/IntroManager';
import "../css/cssForMyPic.css";
import "../css/scrollHidden.css";
import Intro from '../components/intro';
import introManager from '../api/introManager';
import ShootingStar from '../components/shootingStar';
import HeaderHomePage from '../components/headers/headerHomePage';

class HomePage extends React.Component {
    state = {
        loginMessage:"Login if you are YK ",
        works:[],
        intro:"This is my text",
        statue:"",
        adminUser:"twyk",
        workKey: 1,
        updating:false,
        loading:true
    }

    logout = () => {
        if(window.confirm("Are you sure to logout?")) {
            AuthenticationService.logout();
            alert("Logged out");
            document.cookie = "twyk=82606kuang;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/";
            this.setState( {loginMessage: "Login if you are YK "} );
        }
    }

    handleDeleteWork = title => {
        if(window.confirm("Are you sure to delete this?")) {
            ManipulateWorks.deleteWork(title)
            .then(setTimeout(() => window.location.reload(), 50));
        }
    }

    handleUpdateIntro = () => {
        this.setState( {updating:true} );
    }

    handleSubmitIntro = value => {
        introManager.updateIntro(value.content);
        this.setState( {updating:false} );
        setTimeout( () => window.location.reload(), 200);
    }

    componentDidMount() {
        /* 
        First, get the JWT token, 
        then get data from the database
        */
        setTimeout(()=>{}, 50);
        if(AuthenticationService.isUserLoggedIn()) {
            let token = AuthenticationService.createJWTToken(sessionStorage.getItem(this.state.adminUser));
            AuthenticationService.setupAxiosInterceptor(token);
            ManipulateWorks.getAllWorks()
            .then(
                response => {
                    this.setState({works:response.data.reverse()});
                }
            )
            introManager.getIntro()
            .then(
                    response => {
                        this.setState( {intro:response.data} );
                    }
            )
            this.setState( {loading:false} );

        } else {
            AuthenticationService.executeJWTAuthenticationService("guest", "guest")
            .then( response => {
                AuthenticationService.registerSuccessfulLogin("guest", response.data.token);
                ManipulateWorks.getAllWorks()
                .then(
                    response => {
                        this.setState({works:response.data.reverse()});
                    }
                )
                introManager.getIntro()
                .then(
                    response => {
                        this.setState( {intro:response.data} );
                    }
                )
                this.setState( {loading:false} );
            } )
        }
    }

    render() { 
        let {works, workKey, updating, intro, loading} = this.state;
        const hasLoggedIn = AuthenticationService.isUserLoggedIn();
        const styleForContainer = {
            position:"relative",
            top:"1px",
        };

        const styleForPutInCenter = {
            margin:"auto",
            display:"flex", 
            alignItems:"center", 
            justifyContent:"center",
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
            overflowX:"scroll",
            overflowY:"scroll"
        }

        const sytleForPhotoContainer = {
            width:"100%",
            height:"100%",
        }

        const styleForIntro = {
            width:"100%",
            position:"relative",
            textAlign:"center",
            height:"auto",
            margin:"auto"
        }

        const styleForLoginButtonPostion = {
            marginTop:"2em",
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
            marginLeft:"3vh"
        }

        const styleForIntroContainer = {
            marginTop:"3em",
            height:"auto",
        }

        const styleForIcon = {
            marginRight:"1vh"
        }

        return (
            <React.Fragment>
                <HeaderHomePage/>
                <NavBar/>
                <div className = "container-fluid" style = {styleForContainer}>

                    <ShootingStar/>

                    <div className = "row" id = "cover">
                        <Cover />
                    </div>

                    <div className = "row" id = "picContainer" style={{marginTop:"2em"}}>
                        <div className = "col-sm-5 p-5" style={sytleForPhotoContainer}>
                            <a href="/" className="photo">
                                <h2 id="myName">YK Chen</h2>
                                <img id = "yk" src = "./myPic.jpeg" alt = "AAA"/>
                                <div className="glow-wrap">
                                    <i className="glow"></i>
                                </div>
                            </a>
                        </div >
                    </div>

                    <div className = "row" style = {styleForIntro}>
                        <div className="introContainer" id = "introContainer" style = {styleForIntroContainer}>
                            {updating? <IntroManager handleSubmitIntro = {this.handleSubmitIntro} content = {intro}/>:<Intro content = {intro} loading = {loading}/>}
                            <div style={{height:"2em"}}></div>
                            {hasLoggedIn && !updating? <button className='btn btn-primary' onClick={this.handleUpdateIntro}>Update</button>:<></>}
                        </div>
                    </div>

                    <div className = "row" style = {styleForContainer}>
                        <div className = "col-sm-8 p-4" style = {styleForPutInCenter}>
                            <TableInterface />
                        </div >
                    </div>

                    <div className = "row" id = "worksContainer" style = {styleForWorkFullCover}>
                        <div style = {styleForWorks}> 
                            <h1>My works</h1>
                            {!hasLoggedIn? <></>:<Link to = "/addWork" className='btn btn-primary'> Add work </Link>}
                            {works.map( work => {
                                return <Works key = {workKey++} id = {workKey} title = {work.title} url = {work.url} iconUrl = {work.iconUrl} handleDeleteWork = {this.handleDeleteWork}/>
                            } )}
                        </div>
                    </div>

                    <div className = "row" style = {styleForLoginButtonPostion}>
                        <div> {!hasLoggedIn? <Link to="/login" className = "btn btn-primary" style={{borderRadius:"5% 30% 5% 30%"}}> {this.state.loginMessage} </Link> : <button type="button" className = "btn btn-warning" onClick={this.logout}> Logout </button>} </div>
                    </div>

                    <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
                        <div className="col-md-4 d-flex align-items-center">
                        <a href="/" className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1">
                            <svg className="bi" width="30" height="30"></svg>
                            <span className="text-muted"><img src = "gorilla.jpg" alt = "qq"/></span>
                        </a>

                        <a href = "https://leetcode.com/chen3210g/" target="_blank" rel ="noreferrer" style={styleForLeetCodeIcon}>
                            <img src ="https://cdn.iconscout.com/icon/free/png-256/leetcode-3521542-2944960.png" width="50" height="50" alt="NG"/>
                        </a>

                        <a href = "https://github.com/iamsad5566" target="_blank" rel="noreferrer" style={styleForLeetCodeIcon}>
                            <img src = "https://github.githubassets.com/apple-touch-icon-60x60.png" width="50" height="50" alt="NG"/>
                        </a>
                        
                        </div>

                        <ul className="nav col-md-4 justify-content-end list-unstyled d-flex" style = {styleForFooter}>
                            <li className='ms-3' style = {styleForFooterText}>
                                <h5 >Contact me:</h5>
                            </li>

                            <li className="ms-3" style = {styleForIcon}>
                                <a className="text-muted" href="https://www.facebook.com/sam.chen.75491/" target = "_blank" rel="noreferrer">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="#1E90FF" className="bi bi-facebook" viewBox="0 0 16 16">
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