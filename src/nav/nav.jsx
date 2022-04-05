// eslint-disable-next-line
import React from 'react';
import 'bootstrap';
import {Link} from "react-router-dom";
import "../css/styles.css";

class NavBar extends React.Component {
    componentDidMount() {
        function addListener(scrollPos, mainNav, headerHeight) {
            function scrollFunction() {
                const currentTop = document.body.getBoundingClientRect().top * -1;
                if ( currentTop < scrollPos) {
    
                    // Scrolling Up
                    if (currentTop > 0 && mainNav.classList.contains('is-fixed')) {
                        mainNav.classList.remove('bg-dark');
                        mainNav.classList.add('is-visible', 'bg-light');
                    } else {
                        mainNav.classList.remove('is-visible', 'is-fixed');
                        mainNav.classList.add("bg-dark")
                    }
                } else {
                    
                    // Scrolling Down
                    mainNav.classList.remove(['is-visible']);
                    if (currentTop > headerHeight && !mainNav.classList.contains('is-fixed')) {
                        mainNav.classList.add('is-fixed');
                    }
                }
                scrollPos = currentTop;
            }
            
            window.addEventListener('scroll', scrollFunction, false);
        }

        function loadInEvent() {
            let scrollPos = 0;
            let mainNav = document.getElementById("mainNav");
            const headerHeight = mainNav.clientHeight;
            addListener(scrollPos, mainNav, headerHeight);
        }

        loadInEvent();
    }

    render() {
        return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark" id="mainNav">
                <div className="container px-4 px-lg-5">
                    <Link className="navbar-brand" to="/" onClick={this.handleRefresh}>Home</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                        Menu
                        <i className="fas fa-bars"></i>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarResponsive">
                        <ul className="navbar-nav ms-auto py-4 py-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link px-lg-3 py-3 py-lg-4" to="/blog">myBlog</Link></li>
                            <li className="nav-item"><Link className="nav-link px-lg-3 py-3 py-lg-4" to="/psychology" onClick={this.handleRefresh}>Psy zone</Link></li>
                            <li className="nav-item"><Link className="nav-link px-lg-3 py-3 py-lg-4" to="/testing" onClick={this.handleRefresh}>Testing thought</Link></li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>);
    }
}
 
export default NavBar;