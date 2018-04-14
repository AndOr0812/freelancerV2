import React from 'react';
import {Link} from 'react-router-dom';

const Headers = () => {
    return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white justify-content-between">
        <Link to="/" className="navbar-brand">
            <img src="../../style/freelancer.png" width="200px" height="70px" className="d-inline-block align-top" alt=""/>
        </Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
                <li className="nav-item dropdown">
                    <Link to="/" className="nav-link dropdown-toggle"
                          id="hire_freelancers_link" data-toggle="dropdown">
                        Hire FreeLancers
                    </Link>
                    <div  className="dropdown-menu">
                        <h6>FIND A FREELANCER</h6>
                        <Link to="#" className="dropdown-item">Post a Project</Link>
                        <Link to="#" className="dropdown-item">Post a Content</Link>
                        <Link to="#" className="dropdown-item">Post a Local Job</Link>
                        <div className="dropdown-divider"></div>
                        <h6>Discover</h6>
                        <Link to="#" className="dropdown-item">Showcase</Link>
                    </div>
                </li>

                <li className="nav-item dropdown">
                    <Link to="/" className="nav-link dropdown-toggle"
                          id="hire_freelancers_link" data-toggle="dropdown">
                        Find Work
                    </Link>
                    <div  className="dropdown-menu">
                        <h6>FIND WORK</h6>
                        <Link to="#" className="dropdown-item">Browse Projects</Link>
                        <Link to="#" className="dropdown-item">Browse Contests</Link>
                        <Link to="#" className="dropdown-item">Browse Categories</Link>
                    </div>
                </li>
                <li className="nav-item">
                    <Link to="#" className="nav-link">How It Works</Link>
                </li>

            </ul>
            <ul className="navbar-nav">
                <Link to="/profile" className="nav-link">Welcome</Link>
                <Link to="/login" className="nav-link">Login</Link>
                <Link to="/signup" className="nav-link">Sign Up</Link>
                <Link to="/logout" className="nav-link">Log Out</Link>
                <Link to="/post_project" id= "post_project_btn" className="btn btn-warning"> Post a Project </Link>
            </ul>
        </div>
    </nav>
    );
};

export default Headers;