import React,{ Component } from 'react';
import {Field, reduxForm} from 'redux-form';
import {Link} from 'react-router-dom';
import {connect} from "react-redux";
import {authenticateUser} from "../actions";
import { withRouter } from "react-router-dom";

class Login extends Component {

    componentWillMount(){
        if (JSON.stringify(this.props.current_user) !== "{}"){
            this.props.history.push('/profile');
        }
    }

    componentWillReceiveProps(nextProps){
        console.log(`Current User Next Props Value is ${nextProps.current_user}`);
        if (JSON.stringify(nextProps.current_user) !== "{}"){
            this.props.history.push('/profile');
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
        this.props.authenticateUser(values,(result_user)=>{
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
                            <h3>Login</h3></div>
                    </div>
                    <div className="col-sm-2"></div>
                    <div className="row"><hr className="someClass"/></div>
                    <div className="row">
            <form className="row" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <div className="col-sm-12">
                <Field
                    hint = 'Email Address'
                    type = 'email'
                    name = "username"
                    component = {this.renderField}
                />
                </div>
                <div className="col-sm-12">
                <Field
                    hint = 'Password'
                    type = 'password'
                    name = "password"
                    component = {this.renderField}
                />
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-6">
                            <button type='submit' className='btn btn-primary'>Submit</button>
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

    if (!values.username){
        errors.username = 'Please Enter the EmailID'
    }
    if (!values.password){
        errors.password = 'Please Enter the Password'
    }
    return errors;
}

const mapStateToProps = state => {
    return {
        current_user : state.userProfile
    }
};

export default reduxForm({
    validate,
    form: 'LoginForm'
})(
    withRouter(connect(mapStateToProps,{authenticateUser})(Login))
);