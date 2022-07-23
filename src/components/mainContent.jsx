import React from 'react';
import Pagination from './pagination';
import Article from './article';
import AuthenticationService from '../api/authenticationService';
import { Link } from 'react-router-dom';
import getData from '../api/getData';
import Loading from './Loading';

const adminUser = "twyk";
class MainContent extends React.Component {

    state = {
        currentPage:1,
        pageSize:6,
        offset:0,
        articles: [],
        id:0,
        loading:true
    };

    handlePageChange = page => {
        this.setState({currentPage:page});
        let offset = (page-1) * this.state.pageSize;
        this.setState({offset:offset});

        let last = this.props.rowsForEachCategory - (page-1) * this.state.pageSize;
        let rows = last < this.state.pageSize? last:this.state.pageSize;
        
        this.setState({loading:true});
        getData.getPageContent(offset, rows, this.props.category)
            .then( response => {
                this.setState({articles:response.data});
                this.setState({loading:false});
            } )
    }

    handlePagePlus = (page, total) => {
        if(page < Math.ceil(total/this.state.pageSize)) {
            this.setState({currentPage:page+1});

            let offset = this.state.offset + this.state.pageSize;
            this.setState({offset:offset});

            let last = total - page * this.state.pageSize;
            let rows = last < this.state.pageSize? last:this.state.pageSize;
            this.setState({loading:true});
            getData.getPageContent(offset, rows, this.props.category)
            .then( response => {
                this.setState({articles:response.data});
                this.setState({loading:false});
            } )
        }
    }

    

    handlePageMinus = page => {
        if(page > 1) {
            this.setState({currentPage:page-1});

            let offset = this.state.offset - this.state.pageSize;
            this.setState({offset:offset});
            this.setState({loading:true});
            getData.getPageContent(offset, this.state.pageSize, this.props.category)
            .then( response => {
                this.setState({articles:response.data});
                this.setState({loading:false});
            } )
        }
    }
    
    componentDidMount() {
        let rows = this.state.pageSize;
        this.setState({loading:true});
        if(AuthenticationService.isUserLoggedIn()) {
            let token = "Bearer " + sessionStorage.getItem(adminUser);
            AuthenticationService.setupAxiosInterceptor(token);
            getData.getPageContent(this.setState.offset, rows, this.props.category)
            .then( response => {
                this.setState({articles:response.data});
                this.setState({loading:false});
            } )
        } else {
            AuthenticationService.executeJWTAuthenticationService("guest", "guest")
            .then( response => {
                AuthenticationService.registerSuccessfulLogin("guest", response.data.token);
                getData.getPageContent(this.setState.offset, rows, this.props.category)
                .then( response => {
                    this.setState({articles:response.data});
                    this.setState({loading:false});
                } )
            } )
        }
    }

    render() { 
        const {pageSize, currentPage, loading} = this.state;
        let {id} = this.state;
        const numbersOfItems = this.props.rowsForEachCategory;
        const articles = this.state.articles;

        return (
            <React.Fragment>
                <div style={{textAlign:"center"}}>
                    <div className="container px-4 px-lg-5">
                        <div className="row gx-4 gx-lg-5 justify-content-center">
                            <div className="col-md-10 col-lg-8 col-xl-7"  style={{textAlign:"left"}}>
                                    {AuthenticationService.isUserLoggedIn()? <Link to = "add" className = "btn btn-primary" style={{marginBottom:"3em"}}>New Post</Link>:<></>}
                                    { loading? <Loading/>:articles.map( article => (<Article key={id++} postId={article.postId} title={article.title} content={article.content} date = {article.date}/>) )}
                                
                                    <Pagination 
                                    currentPage = {currentPage}
                                    pageSize = {pageSize} 
                                    numbersOfItems = {numbersOfItems} 
                                    handlePageChange = {this.handlePageChange}
                                    handlePageMinus = {this.handlePageMinus}
                                    handlePagePlus = {this.handlePagePlus}/>
                            
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
 
export default MainContent;