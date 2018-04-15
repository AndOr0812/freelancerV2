import React,{Component} from 'react';
import {withRouter,Link} from 'react-router-dom';
import Header from '../components/headers';
import Home from './home';

class RelevantProjects extends Component{
    render(){
        return(
            <div>
                <Header/>
                <Home/>
                <h4>Relevant Projects Page</h4>
            </div>
        );
    }
}

export default withRouter(RelevantProjects);