import React from 'react';
import { Link } from "react-router-dom";
import AuthenticationService from '../api/authenticationService';

class LoginInterface extends React.Component {
    state = {
        username: "",
        password: "",
        hasLoginFailed: false,
        showSuccessMessage: false,
        test:"",
    }

    handleChange = event => {
        this.setState( {[event.target.name]: event.target.value} );
    }

    loginClicked = event => {
        // prevent from redirecting 
        event.preventDefault();

        // sent a request to the backend
        AuthenticationService.executeJWTAuthenticationService(this.state.username, this.state.password)
        .then( response => {
            // register successful login in browser
            AuthenticationService.registerSuccessfulLogin(this.state.username, response.data.token);
            this.setState( {showSuccessMessage:true} );
            this.setState( {hasLoginFailed:false} );
            let now = new Date();
            let expire = new Date();
            expire.setTime(now.getTime() + 36000 * 1000);
            document.cookie = this.state.username + "=" + this.state.password + ";expires=" + expire.toUTCString() + ";path=/";
            
        }).catch(
            () => {
                this.setState( {showSuccessMessage:false} );
                this.setState( {hasLoginFailed:true} );
            }
        )
    }

    handleReload = () => {
        setTimeout( () => {
            console.log("Loading");
            window.location.reload();
        }, 500)
    }

    render() { 
        
        const styleForContainer = {
            textAlign:"center", 
            marginTop:"40vh"
        }

        const styleForUserPasswordInput = {
            display:"block",
            position:"relative",
            marginLeft:"1vh", 
            marginTop:"1vh"
        }

        const styleForLoginButton = {
            display:"inline-block",
            position:"relative",
            marginTop:"1em"
        }

        return (
        <div style = {styleForContainer}>
            <form>
                <span> User Name: <input type = "text" name = "username" value = {this.state.username} onChange={this.handleChange} autoComplete="off"/> </span>
                <span style = {styleForUserPasswordInput}> Password: <input type = "password" name = "password" value = {this.state.password} onChange={this.handleChange} autoComplete="off"/> </span>
                <span> <Link to="/" className = "btn btn-danger m-2" style={{borderRadius:"50%"}}> back </Link> </span>
                <span style = {styleForLoginButton}> <button className= "btn btn-warning m-2" type = "submit" onClick={this.loginClicked} style={{borderRadius:"50%"}}>Login</button> </span>
                
            </form>
            {this.state.hasLoginFailed && <div className="alert alert-danger"> Invalid credential! </div>}
            {this.state.showSuccessMessage && <div className="alert alert-success"> Welcome back, Yen-Kuang! You can manage your website now, go back to {<Link to="/" onClick={this.handleReload}> home page </Link>} </div>}
            <div style={{marginTop:"5em"}}> </div>
        </div>);
    }
}
 
export default LoginInterface;

