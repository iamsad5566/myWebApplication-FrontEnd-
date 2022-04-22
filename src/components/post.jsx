import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../nav/nav';
import AuthenticationService from '../api/authenticationService';
import GetData from '../api/getData';
import HeaderBlogPost from './headers/headerBlogPost';

class Post extends React.Component {
    state = {
        title: "",
        content: "",
        date: "",
        pictures: [],
        keyValue: 0,
        adminUser: "twyk",
        postId: "",
    }

    getArticleAndPic = addressTitle => {
        GetData.getAllPicturesInArticle(addressTitle)
        .then( response => {
            this.setState( {pictures:response.data} );
        } );

        GetData.getSingleArticle(addressTitle)
                    .then( response => {
                                this.setState({title:response.data.title});
                                this.setState({content:response.data.content});
                                this.setState({date:response.data.date});
                                console.log("Successfully got the post and pictures!")
                            }
                    )
                    .catch("Something wrong!");
    }

    handleReload = () => {
        setTimeout(() => {
            window.location.reload();
        }, 100)
    }

    componentDidMount() {
        let url = window.location.href.split("/");
        let addressTitle = url[url.length-1] || url[url.length-2];
        this.setState({postId:addressTitle});
        if(AuthenticationService.isUserLoggedIn()) {
            let token = "Bearer " + sessionStorage.getItem(this.state.adminUser);
            AuthenticationService.setupAxiosInterceptor(token);
            this.getArticleAndPic(addressTitle);
        }

        else {
            AuthenticationService.executeJWTAuthenticationService("guest", "guest")
            .then( response => {
                        AuthenticationService.registerSuccessfulLogin("guest", response.data.token);
                        this.getArticleAndPic(addressTitle)
                    }
            );
        }
    }
    
    render() { 
        
        const { title, content, date, pictures, postId } = this.state;
        let {keyValue} = this.state;
        let url = "data:image/jpeg;base64,";
        let contentArray = content.split("\n");
        let picIndex = 0;

        const styleForBackgroundImage = {
            backgroundImage:`url("https://tw-yk.com/1.jpeg")`
        }

        const styleForPostInfo = {
            marginTop:"2em"
        }

        const styleForUpdateButton = {
            color:"white",
            width:"60%",
            marginTop:"2em"
        }

        return (
            <React.Fragment>
            <HeaderBlogPost title={title} content={content} postId = {postId}/>
            <NavBar/>
            <header className="masthead" style={styleForBackgroundImage}>
                <div className="container position-relative px-4 px-lg-5">
                <Link to = "/blog">
                    <svg xmlns="//www.w3.org/2000/svg" width="50" height="50" fill="currentColor" className="bi bi-arrow-left-circle-fill" viewBox="0 0 16 16">
                        <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/>
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
                            {contentArray.map( paragraph => {  
                                    if(paragraph.includes("-------------------------------------------------- IMAGE") && pictures.length > 0) {
                                        return (
                                            <div style={{width:"100%", height:"auto", textAlign:"center"}} key = {keyValue++}>
                                                <img className = "img-fluid" src = {url+pictures[picIndex++].data} alt="qq"/>
                                            </div>
                                        )
                                    }
                                    return <p key = {keyValue++}> {paragraph} </p>  
                                } )}
                                
                            <div style={{textAlign:"center"}}>
                                {AuthenticationService.isUserLoggedIn()? <Link className = "btn btn-success btn" to = {"/blog/update"} onClick = {this.handleReload} state = {{title:title, content:content, postId:postId}} style={styleForUpdateButton}>Update</Link>:<></>}
                            </div>
                        </div>
                        
                    </div>
                </div>
            </article>
        </React.Fragment>
        );
    }
}
 
export default Post;