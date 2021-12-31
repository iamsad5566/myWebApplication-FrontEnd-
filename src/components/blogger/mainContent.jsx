import React from 'react';
import Pagination from '../pagination';
import { paginate } from '../../utils/paginate';
import Article from './article';
import AuthenticationService from '../../api/AuthenticationService';
import { Link } from 'react-router-dom';

class MainContent extends React.Component {

    state = {
        currentPage:1,
        pageSize:4,
        numbersOfItems:5,
        articles: []
    };

    handlePageChange = page => {
        this.setState({currentPage:page});
    }

    handlePagePlus = page => {
        if(page+1 <= Math.ceil(this.state.numbersOfItems/this.state.pageSize))
            this.setState({currentPage:page+1});
    }

    handlePageMinus = page => {
        if(page-1 >= 0)
            this.setState({currentPage:page-1})
    }


    render() { 
        const {pageSize, currentPage} = this.state;
        let {numbersOfItems, artiles:allArticles} = this.state;
        
        if(this.props.data.length > 0) {
            allArticles = this.props.data.reverse();
            numbersOfItems = allArticles.length;
        }

        const articles = paginate(allArticles,currentPage, pageSize);
        return (
            <div>
                <div className="container px-4 px-lg-5">
                    <div className="row gx-4 gx-lg-5 justify-content-center">
                        <div className="col-md-10 col-lg-8 col-xl-7">
                            {AuthenticationService.isUserLoggedIn()? <Link to = "/blog/add" className = "btn btn-primary" style={{marginBottom:"3em"}}>New Post</Link>:<></>}
                            {articles.map( article => (<Article key={article.id} id = {article.id} title={article.title} content={article.content} date = {article.date}/>) )}
                            
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