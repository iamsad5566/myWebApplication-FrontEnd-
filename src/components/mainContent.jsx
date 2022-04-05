import React from 'react';
import Pagination from './pagination';
import { paginate } from '../utils/paginate';
import Article from './article';
import AuthenticationService from '../api/authenticationService';
import { Link } from 'react-router-dom';

class MainContent extends React.Component {

    state = {
        currentPage:1,
        pageSize:4,
        articles: [],
        id:0
    };

    handlePageChange = page => {
        this.setState({currentPage:page});
    }

    handlePagePlus = (page, total) => {
        if(page < Math.ceil(total/this.state.pageSize))
            this.setState({currentPage:page+1});
    }

    handlePageMinus = page => {
        if(page > 1)
            this.setState({currentPage:page-1})
    }

    render() { 
        const {pageSize, currentPage} = this.state;
        let {id} = this.state;
        let allArticles = this.props.data;
        let numbersOfItems = allArticles.length;
        const articles = paginate(allArticles,currentPage, pageSize);

        return (
            <div>
                <div className="container px-4 px-lg-5">
                    <div className="row gx-4 gx-lg-5 justify-content-center">
                        <div className="col-md-10 col-lg-8 col-xl-7">
                                {AuthenticationService.isUserLoggedIn()? <Link to = "add" className = "btn btn-primary" style={{marginBottom:"3em"}}>New Post</Link>:<></>}
                                {articles.map( article => (<Article key={id++} title={article.title} content={article.content.length > 80? article.content.substring(0, 110):article.content} date = {article.date}/>) )}
                            
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
        );
    }
}
 
export default MainContent;