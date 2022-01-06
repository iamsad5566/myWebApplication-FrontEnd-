import React from 'react';

const Header = () => {
    return ( 
        <React.Fragment>
            <header className="masthead" style={{backgroundImage: `url("background.jpg")`}}>
                <div className="container position-relative px-4 px-lg-5">
                    <div className="row gx-4 gx-lg-5 justify-content-center">
                        <div className="col-md-10 col-lg-8 col-xl-7">
                            <div className="site-heading">
                                <h1>夢舒閣</h1>
                                <span className="subheading" style={{marginTop:"30px", lineHeight:"1.5em"}}>雲在我底路上，在我底衣上<br/>我在一個隱隱的思念上<br/>高處沒有鳥喉，沒有花靨 <br/> 我在一片冷冷的夢土上……  </span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </React.Fragment>
     );
}
 
export default Header;