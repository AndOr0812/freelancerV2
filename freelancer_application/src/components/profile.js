import React, { Component } from 'react';
import {connect} from 'react-redux';
import Headers from './headers';
import {withRouter} from "react-router-dom";
import ImageUpload from '../containers/imageupload';
//import EditUserProfile from '../containers/editprofile';
import {profileUpdate,getUserProfile, uploadFile} from "../actions";

//import {Link} from 'react-router-dom';
import {Field, reduxForm} from 'redux-form';
import Multiselect from 'react-widgets/lib/Multiselect';
import 'react-widgets/dist/css/react-widgets.css';

let FILE_PATH="";

class Profile extends Component{
    componentWillMount(){
        if (JSON.stringify(this.props.current_user) === "{}"){
            this.props.history.push('/login');
        }
    }

    componentDidMount(){
        if(this.props.current_user.emailid !== undefined || this.props.current_user.emailid !== null){
        this.props.getUserProfile(this.props.current_user.emailid,(res)=>{
            console.log("Inside the profile view,The current user profile details fetched so far are :");
            console.log(JSON.stringify(res.user));
        });
        }
    }
/*
    componentWillReceiveProps(nextProps){
        console.log(`Current User Next Props Value is ${nextProps.current_profile_details}`);
        if (this.props.current_profile_details !== nextProps.current_profile_details){
            this.props.history.push('/profile');
        }
    }
*/

    conditionalRendering(handleSubmit) {
        console.log('inside profile page');
        console.log("Current User is");
        console.log(JSON.stringify(this.props.current_user));

        console.log(typeof JSON.stringify(this.props.current_user));

        if (JSON.stringify(this.props.current_user) === '{}'){
            console.log("Please login, since the current user is null");
            return (<div>
                <div>
                    "Please login, since the current user is null"
                </div>
                <div>{this.props.history.push("/login")}</div>
                </div>);
        }
        else if (JSON.stringify(this.props.current_profile_details) === '{}'){
            this.props.history.push('/editprofile');
        }
        else {
            return (
                <div className="row mt-3">
                    <div className="col-sm-3">
                        <div className="card" style={{width: 15 +"rem"}}>
                            <img className="card-img-top" style={{maxHeight:'250'+'px'}} src={this.props.current_profile_details.imgPath} alt="Card image cap" />
                            <div className="card-body">
                                <h6 className="card-title font-weight-bold">{this.props.current_user.emailid}</h6>
                                <p className="card-text">+1(515)-639-1448</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="row">
                            <h2>{this.props.current_user.name}</h2>
                        </div>
                        <div className="row">
                            <p className="lead">Full Stack Developer</p>
                        </div>
                        <div className="row">
                            <h4>About Me</h4>
                        </div>
                        <div className="row">
                            <h6 className="font-weight-light">{this.props.current_profile_details.aboutme}
                            </h6>
                        </div>
                        <div className="row">
                            <h4>Skills</h4>
                        </div>
                        <div className="row">
                            <h6 className="font-weight-light">{(this.props.current_profile_details.skills).toString()}</h6>
                        </div>
                    </div>
                    <div className="col-sm-3 mt-3" style={{height: 50 +"rem"}}>
                        <button className="btn btn-primary btn-block" onClick={()=> {this.props.history.push('/editprofile')}}>Edit Profile</button>
                    </div>
                </div>
            );
        }
    }

    render(){

        return (<div className="container-fluid">
            <Headers/>
            {this.conditionalRendering()}
        </div>);
    }
}

const mapStateToProps=(state)=>{
    return {
        current_user:state.userProfile,
        current_profile_details : state.profileDetails,
        images: state.images
    }
};


export default withRouter(connect(mapStateToProps,{uploadFile,getUserProfile,profileUpdate})(Profile));
