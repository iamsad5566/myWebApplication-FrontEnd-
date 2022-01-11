import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../nav/nav';
import AuthenticationService from '../api/authenticationService';
import GetData from '../api/getData';

class Post extends React.Component {
    url = window.location.href.split("/");

    state = {
        postId:this.url[this.url.length-1],
        title: "",
        content: "",
        date: "",
        picture: "",
        keyValue: 0,
        adminUser: "twyk"
    }

    getArticleAndPic = addressId => {
        GetData.getSingleArticle(addressId)
                    .then( response => {
                                this.setState({title:response.data.title});
                                this.setState({content:response.data.content});
                                this.setState({date:response.data.date});
                                let addressTitle = this.state.title;
                                console.log("Successful get post!")
                                GetData.getSinglePicture(addressTitle)
                                .then( response => {
                                            this.setState({picture:response.data.img.byte});
                                            console.log("Successful get picture");
                                        }
                                ).catch(
                                    () => console.log("No picture!")
                                )
                            }
                    )
                    .catch("Something wrong!");
    }

    componentDidMount() {
        const addressId = this.state.postId;
        if(AuthenticationService.isUserLoggedIn()) {
            let token = "Bearer " + sessionStorage.getItem(this.state.adminUser);
            AuthenticationService.setupAxiosInterceptor(token);
            this.getArticleAndPic(addressId);
        }

        else {
            AuthenticationService.executeJWTAuthenticationService("guest", "guest")
            .then( response => {
                        AuthenticationService.registerSuccessfulLogin("guest", response.data.token);
                        this.getArticleAndPic(addressId)
                    }
            );
        }
    }

    render() { 
        
        const { title, content, date, picture} = this.state;
        let {keyValue} = this.state;
        let url = "data:image/jpeg;base64," + picture;
        let contentArray = content.split("\n");
        document.title = title;

        const styleForBackgroundImage = {
            backgroundImage:`url(${url})`
        }

        const styleForPostInfo = {
            marginTop:"2em"
        }

        return (
            <React.Fragment>
            <NavBar/>
            <header className="masthead" style={styleForBackgroundImage}>
                <div className="container position-relative px-4 px-lg-5">
                <Link to = "/blog">
                    <svg xmlns="//www.w3.org/2000/svg" width="50" height="50" fill="currentColor" className="bi bi-arrow-left-circle-fill" viewBox="0 0 16 16">
                        <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/>
                        Go back 
                    </svg>
                </Link>
                    <div className="row gx-4 gx-lg-5 justify-content-center">
                        <div className="col-md-10 col-lg-8 col-xl-7">
                            <div className="post-heading">
                                <h1>{title}</h1>
                                <span className="meta" style = {styleForPostInfo}>
                                    {"Posted by "}
                                    <a href="#!">{" Yen-Kuang "}</a>
                                    {" on"} {date}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
                
            <article className="mb-4">
                <div className="container px-4 px-lg-5">
                    <div className="row gx-4 gx-lg-5 justify-content-center">
                        <div className="col-md-10 col-lg-8 col-xl-7">
                            {contentArray.map( paragraph => {  return <p key = {keyValue++}> {paragraph} </p>  } )}
                        </div>
                    </div>
                </div>
            </article>
        </React.Fragment>
        );
    }
}
 
export default Post;