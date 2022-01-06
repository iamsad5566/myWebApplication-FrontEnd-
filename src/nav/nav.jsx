// eslint-disable-next-line
import React from 'react';
import 'bootstrap';
import {Link} from "react-router-dom";
import controller from '../utils/navAnimate';
import "../css/styles.css";

class NavBar extends React.Component {
    refreshThePage = () => {
        setTimeout(() => {window.location.reload();}, 10);
    }

    render() { 
        controller();
        return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark" id="mainNav">
                <div className="container px-4 px-lg-5">
                    <Link className="navbar-brand" to="/" onClick={this.refreshThePage}>Home</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                        Menu
                        <i className="fas fa-bars"></i>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarResponsive">
                        <ul className="navbar-nav ms-auto py-4 py-lg-0">
                            <li className="nav-item"><Link className="nav-link px-lg-3 py-3 py-lg-4" to="/blog" onClick={this.refreshThePage}>myBlog</Link></li>
                            <li className="nav-item"><Link className="nav-link px-lg-3 py-3 py-lg-4" to="/psychology">心理學專區</Link></li>
                            <li className="nav-item"><Link className="nav-link px-lg-3 py-3 py-lg-4" to="/testing">Testing thought</Link></li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>);
    }
}
 
export default NavBar;