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
        adminUser:"",
        workKey: 1
    }

    logout = () => {
        AuthenticationService.logout();
        alert("Logged out");
        this.setState( {loginMessage: "Login if you are YK "} );
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
            display:"flex", 
            alignItems:"center", 
            justifyContent:"center"
        }

        const styleForWorks = {
            marginTop:"10vh"
        }

        const styleForFooter = {
            marginTop:"20vh",
            height: "auto"
        }

        const styleForWorkFullCover = {
            position:"relative",
            display:"flex",
            alignItem:"center",
            textAlign:"center",
            height:"100vh",
            margin:"auto",
            overflow:"scroll"
        };

        return (
            <React.Fragment>
                <NavBar />
                <div className = "container-fluid" style = {styleForContainer}>
                    
                    <div className = "row" style = {styleForFullCover}>
                        <Cover />
                    </div>

                    <div className = "row" style = {styleForContainer}>
                        <div className = "col-sm-4 p-3" style = {styleForPutInCenter}>
                            <img className = "img-fluid" src = "./myPic.jpeg" alt = "AAA"/>
                        </div >

                        <div className = "col-sm-8 p-3" style = {styleForPutInCenter}>
                            <Tables />
                        </div >
                    </div>

                    <div className = "row" style = {styleForWorkFullCover}>
                        <div style = {styleForWorks}> 
                            <h1>My works</h1>
                            {!hasLoggedIn? <></>:<Link to = "/addWork" className='btn btn-primary'> Add work </Link>}
                            {works.map( work => {
                                return <Works key = {workKey++} id = {workKey} title = {work.title} url = {work.url} iconUrl = {work.iconUrl}/>
                            } )}
                        </div>
                    </div>

                    <div className = "row" style = {styleForFooter}>
                        <div className = "d-grid gap-2 d-md-flex justify-content-md-end" style = {styleForFooter}>
                            <div> {!hasLoggedIn? <Link to="/login" className = "btn btn-primary"> {this.state.loginMessage} </Link> : <Link to="/" className = "btn btn-warning" onClick={this.logout}> Logout </Link>} </div>
                        </div>
                    </div>
                </div>
        </React.Fragment>);
    }
}
 
export default HomePage;