import React,{Component} from 'react';
import {withRouter,Link} from 'react-router-dom';

class Home extends Component{
    render(){
        return(
                <nav className="navbar navbar-expand-lg navbar-light bg-dark justify-content-between">
                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarSupportedContent">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav">
                            <Link to="/allProjects" className="nav-link text-white">All Projects</Link>
                            <Link to="/relevantProjects" className="nav-link text-white">Relevant Projects</Link>
                            <Link to="/dashboard" className="nav-link text-white">Dashboard</Link>
                        </ul>
                    </div>
                </nav>
        );
    }
}

export default withRouter(Home);