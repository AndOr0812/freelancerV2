import React, { Component } from 'react';
import {connect} from 'react-redux';
import Headers from '../components/headers';
import {withRouter} from "react-router-dom";
import {logout} from "../actions";


class Logout extends Component{

    constructor(props) {
        super(props);
        this.props.logout(()=>{
            console.log('return from the callback');
                console.log('valid credentials');
                console.log('User profile state is');
                //console.log(this.props.userProfile);
/*
                this.props.history.push('/profile');
*/
        });
    }

    render(){
        console.log('inside Logout page');
        console.log("Current User is");
        console.log(this.props.current_user);
        return (
            <div>
                <Headers/>
                <h2>LogOut Page</h2>
                <div>
                    <h4>User Successfully Logged out</h4>
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        current_user : state.userProfile
    }
};
export default withRouter(connect(mapStateToProps,{logout})(Logout));