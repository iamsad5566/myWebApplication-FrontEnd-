import React, { useState } from 'react';
import { paginate } from '../../../../utils/paginate';
import Pagination from '../../../pagination';
import questionsList from './questionsList';

const Big5Questions = () => {
    let pageSize = 10;
    const [currentPage, setCurrentPage] = useState(1);
    let index = (currentPage-1) * pageSize;
    
    const options = [
        "非常同意",
        "同意",
        "部分同意",
        "部分不同意",
        "不同意",
        "非常不同意"
    ]

    let optionKey = 0;

    const handlePageChange = page => {
        setCurrentPage(page);
    }

    const handlePagePlus = (page, total) => {
        if(page < Math.ceil(total/pageSize))
        setCurrentPage(currentPage => currentPage+1);
    }

    const handlePageMinus = (page, total) => {
        if(page > 1)
        setCurrentPage(currentPage => currentPage-1);
    }

    const questions = paginate(questionsList.questionArr, currentPage, pageSize);


    const styleForContainer = {
        textAlign:"center",
        marginTop:"5em"
    }

    
    return ( 
        <React.Fragment>
            <div className='QContainer' style={styleForContainer}>
                <h3>大五人格測驗 (Big Five)</h3>
                <div style={{marginTop:"2em"}}>
                    {
                        questions.map( question => {
                            return (
                                <div key={index}>
                                    <div style={{padding:"2em", textAlign:"center", fontSize:"1.1em"}}> <span style={{display:"inline-block", width:"15em", textAlign:"left", marginRight:"15em"}}> {++index}. {" " + question[0]} </span> </div>
                                    <div></div>
                                    <span style={{backgroundColor:"#F0F8FF", display:"inline-block", textAlign:"center", width:"90%"}}>
                                        <form>
                                            {
                                                options.map( option => {
                                                    return <label style={{padding:"0.5em"}} key={optionKey++}> <input type="radio" name="selected" value={option}/> {option} </label>
                                                } )
                                            }
                                        </form>
                                    </span>
                                </div>
                            );
                        } )
                    }
                </div>
                
                <div style={{marginTop:"3em"}}></div>
                <Pagination 
                    currentPage={currentPage}
                    pageSize={pageSize}
                    numbersOfItems={questionsList.questionArr.length}
                    handlePageChange={handlePageChange}
                    handlePagePlus={handlePagePlus}
                    handlePageMinus={handlePageMinus}
                    />
            </div>
        </React.Fragment>
     );
}
 
export default Big5Questions;