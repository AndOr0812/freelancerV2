import React,{ Component } from 'react';
import {Field , reduxForm} from 'redux-form';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {createUsers} from "../actions";

class SignUp extends Component {

    renderField(field){
        console.log(field);

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
        this.props.createUsers(values,(data)=>{
            /*            if (!data.success) {
                            let err_msg = "";
                            if (data.error.name === "SequelizeUniqueConstraintError") {
                                err_msg = "User with Email ID already Exists";
                            }
                            else if (data.error === 'Please submit the required fields') {
                                err_msg = "Please submit the required fields"
                            }
                            else {
                                err_msg = (data.error.name) ? data.error.name : data.error;
                            }
                            document.getElementById("message").innerHTML = err_msg;
                            return;
                        }*/
            let err_msg = "";
            if (data !== 'error') {
                console.log("Inside the error callback of createUser action creation in signup");
                err_msg = "Successfully Signed Up";
                document.getElementById("message").innerHTML = err_msg;
                this.props.history.push("/login");
            } else if (data === 'error') {
                console.log("Inside the success callback of createUser action creation in signup");
                err_msg = "Error while Signing Up";
                document.getElementById("message").innerHTML = err_msg;
                return;
            }
            /*console.log("In the callback function with no error");
            this.props.history.push('/login');*/
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
                            <div className="col-sm-8">
                                <h5><label>Sign Up for <em>free </em>today</label></h5></div>
                            </div>
                            <div className="col-sm-2"></div>
                        <div className="row"><hr className="someClass"/></div>
                        <div className="row">
                            <form className="row" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                                <div className="col-sm-12">
                                <Field
                                    hint = 'Name'
                                    type = 'text'
                                    name = "name"
                                    component = {this.renderField}
                                />
                                </div>
                                <div className="col-sm-12">
                                <Field
                                hint = 'Email Address'
                                type = 'email'
                                name = "emailid"
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
                                <div className="row text-danger" id="message"></div>
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
    console.log(values);
    const errors = {};

    if (!values.name){
        errors.name = 'Please Enter the Name'
    }else if (values.name.length > 30) {
        console.log()
        errors.name = 'Must be 30 characters or less'
    } else if (values.name.length < 2) {
        errors.name = 'Must be 2 characters or more'
    }
    if (!values.emailid) {
        errors.emailid = 'Please Enter your Email Address'
    }else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.emailid)) {
        errors.emailid = 'Invalid email address'
    }
    if (!values.password){
        errors.password = 'Please Enter the Password'
    }  else if(values.password.length < 8 || values.password.length >15){
        errors.password = "password should be min 8 chars and max 15 chars";
    }
    return errors;
}
export default reduxForm({
    validate,
    form: 'SignUpForm'
})(
    connect(null,{createUsers})(SignUp)
);