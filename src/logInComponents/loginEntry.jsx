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
        }).catch(
            () => {
                this.setState( {showSuccessMessage:false} );
                this.setState( {hasLoginFailed:true} );
            }
        )
    }

    render() { 
        
        return (
        <div style = {{textAlign:"center", marginTop:"40vh"}}>
            <form>
                <span> User Name: <input type = "text" name = "username" value = {this.state.username} onChange={this.handleChange} autoComplete="off"/> </span>
                <span style = {{display:"block",position:"relative",marginLeft:"1vh", marginTop:"1vh"}}> Password: <input type = "text" name = "password" value = {this.state.password} onChange={this.handleChange} autoComplete="off"/> </span>
                <span style = {{display:"block",position:"relative",marginRight:"2vh", marginTop:"1vh"}}> <button className= "btn btn-warning" type = "submit" onClick={this.loginClicked}>Login</button> </span>
            </form>
            {this.state.hasLoginFailed && <div className="alert alert-danger"> Invalid credential! </div>}
            {this.state.showSuccessMessage && <div className="alert alert-success"> Welcome back, Yen-Kuang! You can manage your website {<Link to = {"/"}> here </Link>} </div>}
            <div style = {{marginTop:"40vh", marginRight:"10vh", textAlign:"right"}}>
                <Link to="/" className = "btn btn-danger"> go back </Link>
            </div>
        </div>);
    }
}
 
export default LoginInterface;

