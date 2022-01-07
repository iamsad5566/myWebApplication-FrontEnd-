import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import NavBar from '../nav/nav';
import Cover from '../components/cover';
import Tables from '../components/tables';
import Works from '../components/works';
import { Link } from "react-router-dom";
import AuthenticationService from '../api/authenticationService';

class HomePage extends React.Component {
    state = {
        works: [
            {key:1, project:"PPP"},
            {key:2, project:"QQQ"}
        ],
        loginMessage:"Login if you are YK "
    }

    logout = () => {
        AuthenticationService.logout();
        alert("Logged out");
        this.setState( {loginMessage: "Login if you are YK "} );
    }

    render() { 
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

        const styleForFooter = {
            height: "auto"
        }

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

                    <div className = "row" style = {styleForFullCover}>
                        <div style = {{marginTop:"10vh"}}> 
                            <h1>My works</h1>
                            {this.state.works.map(project => <Works key = {project.key} project = {project}/>)}
                        </div>
                    </div>

                    <div className = "row" style = {styleForFooter}>
                        <div className = "d-grid gap-2 d-md-flex justify-content-md-end">
                            {!hasLoggedIn? <Link to="/login" className = "btn btn-primary"> {this.state.loginMessage} </Link> : <Link to="/" className = "btn btn-warning" onClick={this.logout}> Logout </Link>}
                        </div>
                    </div>
                </div>
        </React.Fragment>);
    }
}
 
export default HomePage;