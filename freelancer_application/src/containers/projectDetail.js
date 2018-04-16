import React,{Component} from 'react';
import {Link,withRouter} from 'react-router-dom';
import {connect} from "react-redux";
import {getProjectDetails, getUserProfile} from "../actions";
import Header from '../components/headers';
import Home from './home';

class ProjectDetail extends Component{

    componentWillMount(){
        if (JSON.stringify(this.props.current_user) === "{}"){
            this.props.history.push('/login');
        }else if(JSON.stringify(this.props.projectdetails) === "{}"){
            this.props.history.push('/projectDetail');
        }
    }

    handleClick = (event)=>{
        console.log("CLicked the bid now");
    }

    handleBidClick = (event)=>{
        console.log("Handle the Bid click event inside the handleBidClick function");
    }

/*    componentDidMount(){
        if(this.props.current_user.emailid !== undefined || this.props.current_user.emailid !== null){
            console.log(`this.props.project_id is ${this.props.project_id}`);
            this.props.getProjectDetails(this.props.project_id,(res)=>{
                console.log("Inside the profile view,The current user profile details fetched so far are :");
                console.log(JSON.stringify(res.projectdetails));
            });
        }
    }*/

    render(){
        const {projectdetails } = this.props;

        return(<div className="container-fluid">
            <div className="row">
                <div className="col-sm-12">
                <Header/>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-12">
                <Home/>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-9">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="col-sm-6 mt-4">
                                <h4>Project Title:</h4>
                            </div>
                            <div className="col-sm-6 mt-2">
                                <h5>{projectdetails.proj_name}</h5>
                            </div>
                            <div className="col-sm-6 mt-4">
                                <h4>Project Description:</h4>
                            </div>
                            <div className="col-sm-6 mt-2">
                                <h5>{projectdetails.proj_desc}</h5>
                            </div>
                            <div className="col-sm-6 mt-4">
                                <h4>Skills Required:</h4>
                            </div>
                            <div className="col-sm-6 mt-2">
                                <h5>{projectdetails.proj_skills}</h5>
                            </div>
                            <div className="col-sm-6 mt-4">
                                <h4>Files:</h4>
                            </div>
                            <div className="col-sm-6 mt-2">
                                <h5></h5>
                            </div>
                            <div className="col-sm-6 mt-4">
                                <h4>Budget Range:</h4>
                            </div>
                            <div className="col-sm-6 mt-2">
                                <h5><span>$</span>{projectdetails.proj_budget}</h5>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-sm-3 mt-4">
                    <div className="row">
                            <div className="col-sm-6 mt-4">
                                <h4>No of Bids:</h4>
                            </div>
                            <div className="col-sm-6 mt-4">
                                <h5>0</h5>
                            </div>
                    </div>
                <button type="button" className="btn btn-primary btn-block" onClick={this.handleBidClick}>Bid Now</button>
                </div>
            </div>
        </div>);
    }
}

const mapStateToProps=(state,ownProps)=>{
    return {
        current_user:state.userProfile,
        projectdetails: state.projectDetails,
        project_id:ownProps.match.params.id
    }
};
export default withRouter(connect(mapStateToProps,{getUserProfile,getProjectDetails})(ProjectDetail));
