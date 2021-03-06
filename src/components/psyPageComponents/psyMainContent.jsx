import React from 'react';
import { Link } from 'react-router-dom';

const PsyMainContent = () => {

    const styleForMainContent = {
        marginTop:"16vh",
        textAlign:"center"
    }

    return (
        <React.Fragment> 
            <div style={styleForMainContent}>
                <div className="container px-4 px-lg-5">
                    <div className="row gx-4 gx-lg-5 justify-content-center">
                        <div className="col-md-10 col-lg-8 col-xl-7">
                            <Link to = "counsellingPsychologist">
                                <h2 className="post-title">-- 全國心理師分佈資料 --</h2>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div style={{marginTop:"5em", textAlign:"center"}}>
                <div className="container px-4 px-lg-5">
                    <div className="row gx-4 gx-lg-5 justify-content-center">
                        <div className="col-md-10 col-lg-8 col-xl-7">
                            <Link to = "emotionAndColor">
                                <h2 className='post-title'>-- Emotion and memory (Beta) --</h2>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div style={{marginTop:"5em", textAlign:"center"}}>
                <div className="container px-4 px-lg-5">
                    <div className="row gx-4 gx-lg-5 justify-content-center">
                        <div className="col-md-10 col-lg-8 col-xl-7">
                            <Link to = "stroopEffect">
                                <h2>-- Stroop effect --</h2>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div style={{marginTop:"5em", textAlign:"center"}}>
                <div className="container px-4 px-lg-5">
                    <div className="row gx-4 gx-lg-5 justify-content-center">
                        <div className="col-md-10 col-lg-8 col-xl-7">
                            <Link to = "selective_attention">
                                <h2>-- Selective attentition --</h2>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            

            <div style={{marginTop:"16vh", textAlign:"center", display:"none"}}>
                <div className="container px-4 px-lg-5">
                    <div className="row gx-4 gx-lg-5 justify-content-center">
                        <div className="col-md-10 col-lg-8 col-xl-7">
                            <Link to = "questionnaire/big5">
                                <h2>-- Big 5 --</h2>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* <div style={{marginTop:"16vh", textAlign:"center", display:"none"}}>
                <div className="container px-4 px-lg-5">
                    <div className="row gx-4 gx-lg-5 justify-content-center">
                        <div className="col-md-10 col-lg-8 col-xl-7">
                            <Link to = "/test">
                                <h2>-- T --</h2>
                            </Link>
                        </div>
                    </div>
                </div>
            </div> */}
        </React.Fragment> 
     );
}
 
export default PsyMainContent;