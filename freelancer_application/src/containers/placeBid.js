import React,{Component} from 'react';
import {withRouter,Link} from 'react-router-dom';
import {connect} from "react-redux";
import {placeBid} from "../actions";

class PlaceBid extends Component{
    componentWillMount(){
        if (JSON.stringify(this.props.current_user) !== "{}"){
            this.props.history.push('/profile');
        }
    }

    componentWillReceiveProps(nextProps){
        console.log(`Current Profile Details Next Props Value is ${nextProps.projectdetails}`);
        if (this.props.projectdetails !== nextProps.projectdetails){
            this.props.history.push('/placeBid');
        }
    }


    renderField(field){

        const className=`form-group ${field.meta.touched && field.meta.error ? 'has-danger': ''}`;
        return (
            <div className={className}>
                <input
                    className='form-control'
                    type = {field.type}
                    placeholder= {field.hint}
                    {...field.input}
                />
                <div className='text-danger'>
                    {field.meta.touched ? field.meta.error : ''}
                </div>
            </div>
        );
    }

    onSubmit(values){
        console.log(values);
        var bid_values = {
            proj_id: this.props.projectdetails._id,
            bid_userId: this.props.userprofile._id,
            bid_userName: this.props.userprofile.name,
            bid_amount: values.bid_amount,
            bid_period: values.bid_period,
            bid_status: 'new'
        };
        this.props.placeBid(bid_values,(result_user)=>{
            console.log('return from the callback');
            console.log(result_user);
            let err_msg="";
            /*if (result_user.error === 'Invalid Email Id'){
                err_msg = "Email Address doesn't exist.";
            } else if (result_user.error === 'Invalid password'){
                err_msg = "Please enter the correct Password";
            }*/
            if(!result_user){
                err_msg = "Invalid EmailID / Password.";
            }else {
                this.props.history.push('/profile');
                return;
            }
            document.getElementById("message").innerHTML = err_msg;
        });
    }

    render(){
        const {handleSubmit} = this.props;

        return (<div className="container">
                <div className="row">
                    <div className="col-sm-4"></div>
                    <div className="col-sm-4">
                        <div className="row h-25">
                            <img src="../../style/freelancer.png" alt=""/>
                        </div>
                        <div className="row"><hr className="someClass"/></div>
                        <div className="row">
                            <div className="col-sm-2"></div>
                            <div className="col-sm-8 text-center">
                                <h3>Place a Bid</h3></div>
                        </div>
                        <div className="col-sm-2"></div>
                        <div className="row"><hr className="someClass"/></div>
                        <div className="row">
                            <form className="row" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                                <div className="col-sm-12">
                                    <Field
                                        hint = 'Bid Amount'
                                        type = 'text'
                                        name = "bid_amount"
                                        component = {this.renderField}
                                    />
                                </div>
                                <div className="col-sm-12">
                                    <Field
                                        hint = 'Bid Period in days'
                                        type = 'text'
                                        name = "bid_period"
                                        component = {this.renderField}
                                    />
                                </div>
                                <div className="container">
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <button type='submit' className='btn btn-primary'>Place Bid</button>
                                        </div>
                                        <div className="col-sm-6">
                                            <Link to='/' className='btn btn-danger'>Cancel</Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="container">
                                    <div className="row text-danger">
                                        <div className="col-sm-2"></div>
                                        <div className="col-sm-10" id="message"></div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="col-sm-4"></div>
                </div>
            </div>
        );
    }
}

function validate(values) {
    //console.log(values);
    const errors = {};

    if (!values.bid_amount){
        errors.username = 'Please Enter the bid amount'
    }
    if (!values.bid_period){
        errors.password = 'Please Enter the bid Period'
    }
    return errors;
}

const mapStateToProps=(state)=>{
    return {
        current_user:state.userProfile,
        userprofile:state.profileDetails,
        projectdetails: state.projectDetails,
    }
};
export default withRouter(connect(mapStateToProps,{placeBid})(PlaceBid));
