import React from 'react';
import { Link } from 'react-router-dom';

const ThoughtsEntry = () => {

    const styleForMainContent = {
        marginTop:"16vh",
        textAlign:"center"
    }

    const styleForFollowings = {
        marginTop:"5em",
        textAlign:"center"
    }

    return (
        <React.Fragment> 
            <div style={styleForMainContent}>
                <div className="container px-4 px-lg-5">
                    <div className="row gx-4 gx-lg-5 justify-content-center">
                        <div className="col-md-10 col-lg-8 col-xl-7">
                            <Link to = "chatRoom">
                                <h2 className="post-title">-- Chat room(Beta) --</h2>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div style={styleForFollowings}>
                <div className="container px-4 px-lg-5">
                    <div className="row gx-4 gx-lg-5 justify-content-center">
                        <div className="col-md-10 col-lg-8 col-xl-7">
                            <Link to = "postman">
                                <h2 className="post-title">-- Gmail Postman --</h2>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* <div style={styleForMainContent}>
                <div className="container px-4 px-lg-5">
                    <div className="row gx-4 gx-lg-5 justify-content-center">
                        <div className="col-md-10 col-lg-8 col-xl-7">
                                OOO
                        </div>
                    </div>
                </div>
            </div> */}
        </React.Fragment> 
     );
}
 
export default ThoughtsEntry;