import React, { Component } from 'react';
import {connect} from 'react-redux';
import Header from '../components/headers';
import {Link} from 'react-router-dom';
import {Field, reduxForm} from 'redux-form';
import {withRouter} from 'react-router-dom';
import {uploadFile,profileUpdate,getUserProfile} from "../actions";
import ImageUpload from './imageupload';
import Multiselect from 'react-widgets/lib/Multiselect';
import 'react-widgets/dist/css/react-widgets.css';
//const  { DOM: { textarea } } = React;

var FILE_PATH="";

class EditUserProfile extends Component{

    componentWillMount(){
        if (JSON.stringify(this.props.current_user) === "{}"){
            this.props.history.push('/login');
        }
    }

    renderMultiselect({ input, ...rest }){
        return (<div><Multiselect {...input}
                                  onBlur={() => input.onBlur()}
                                  value={input.value || rest.existing_skills || []}
                                  {...rest}/>
            <div className='text-help'>
                {rest.meta.touched ? rest.meta.error : ''}
            </div>
        </div>);
    }

    renderTextArea({input, meta: { touched, error, warning },...rest}) {
        console.log("Inside the render textarea");
        console.log(JSON.stringify(input));
        return (
        <div className='form-group'>
                <textarea className="form-control" {...input} placeholder="Content" rows="5" cols="50"></textarea>
            <div>
                {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
            </div>
        </div>
    );
    }

    renderField(field){

        console.log(JSON.stringify(field));

        const className=`form-group ${field.meta.touched && field.meta.error ? 'has-danger': ''}`;

        return (
            <div className={className}>
                <input
                    className='form-control'
                    type = {field.type}
                    placeholder= {field.hint}
                />
                <div className='text-help'>
                    {field.meta.touched ? field.meta.error : ''}
                </div>
            </div>
        );
    }

    handleFileUpload = (event) => {

        const payload = new FormData();

        payload.append('mypic', event.target.files[0]);

        console.log("calling the uploadfile dispatcher function");
        this.props.uploadFile(payload,(filename) => {
            if(!filename){
                console.log("There is an error while uploading the image");
            }
            else {
                console.log("Inside the callback function, Uploded File name is");
                console.log(filename);
                FILE_PATH='http://localhost:3001/uploads/'+filename;
            }
        });
    };

    onSubmit(values){
        values.emailId = this.props.current_user.emailid;
        console.log("After including the current user emailid");
        console.log(JSON.stringify(values));
        if(FILE_PATH !== this.props.current_profile_details.imgPath){
            values.imgPath = FILE_PATH;
        }
        else {
            values.imgPath = this.props.current_profile_details.imgPath;
        }
        console.log("After updating the image Path");
        console.log(JSON.stringify(values));
        this.props.profileUpdate(values,(result_user)=>{
            console.log('return from the callback');
            console.log(result_user);
            if (result_user.code === 200){
                this.props.history.push('/profile');
                return;
                /*let err_msg = result_user.value;
                document.getElementById("message").innerHTML = err_msg;*/
            }
            let err_msg = result_user.value;
            document.getElementById("message").innerHTML = err_msg;
        });
    }

    render(){
        const {handleSubmit, current_profile_details, initialValues } = this.props;

        console.dir(`Initial values are : ${JSON.stringify(initialValues)}`);  // has correct value "myuser"
        return (<div className="container-fluid">
                <div className="row">
                    <Header />
                </div>
                    <div className="row mt-3">
                        <label htmlFor="upload_image">
                            <input id="upload_image" type="file" style={{visibility: 'hidden'}} onChange={this.handleFileUpload}/>
                        <ImageUpload/>
                        </label>
                        <div className="col-sm-6">
                            <form onSubmit={handleSubmit(this.onSubmit.bind(this))} className='form-group'>
                            <div className="row">
                                <div className="col-sm-12">
                                    <h4>Name </h4>
                                </div>
                                <div className="col-sm-12">
                                    <Field
                                        hint = 'Name'
                                        type = 'text'
                                        name = "name"
                                        initialValues = {initialValues.name}
                                        component = {this.renderField}
                                    />
                                </div>
                                {/*<input className='form-control' type="text" value={this.props.current_user.name}/>*/}
                            </div>
                            <div className="row">
                                <div className="col-sm-12">
                                    <h4>Phone Number</h4>
                                </div>
                                <div className="col-sm-12">
                                    <Field
                                        hint = 'Phone Number'
                                        type = 'text'
                                        name = "phone"
                                        initialValues = {initialValues.phone}
                                        component = {this.renderField}
                                    />
                                </div>
                                {/*<input className='form-control' type="text" value={this.props.current_profile_details.phone}/>*/}
                            </div>
                            <div className="row">
                                <div className="col-sm-12">
                                    <h4>About Me</h4>
                                </div>
                                <div className="col-sm-12">
                                    <Field
                                        name="aboutme"
                                        component={this.renderTextArea}>
                                        {initialValues.aboutme}</Field>
                                </div>
                                {/*<input className='form-control' style={{height: 150+'px'}} type="text" value={this.props.current_profile_details.aboutme}/>*/}
                            </div>
                            <div className="row">
                                <div className="col-sm-12">
                                    <h4>Skills</h4>
                                </div>
                                <div className="col-sm-12">
                                    <Field
                                        name="user_skills"
                                        existing_skills={initialValues.skills}
                                        component={this.renderMultiselect}
                                        data={[ 'MySQL', 'NodeJS', 'ReactJS', 'Redux'  ]}
                                    />
                                </div>
                            </div>
                                <div className="row mt-2">
                                <button type='submit' className='btn btn-primary'>
                                    Submit
                                </button>
                                <button type="cancel" className='btn btn-default'>Cancel</button>
                                </div>
                            </form>
                        </div>
                        <div className="col-sm-3 mt-3" style={{height: 50 +"rem"}}>
                            <button className="btn btn-primary btn-block"
                                    onClick={()=>this.props.history.push('/editprofile')}>
                                View Profile
                            </button>
                        </div>
                    </div>
        </div>
        );
    }
}

function validate(values) {
    //console.log(values);
    const errors = {};

    if(values.phone){
        if(values.phone.length!== 10) {
            errors.phone = "Must be 10 digits";
        }
        else if (!/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(values.phone)) {
                errors.phone = "Phone number should be either in the form of xxx-xxx-xxxx or  XXX.XXX.XXXX or  XXX XXX XXXX"
            }
    }

    if(!values.name){
        errors.name = "Name should not be Empty."
    } else if(values.name.length <2 || values.name.length >30){
        errors.name="Name should be min 2 chars and max 30 chars";
    }

    return errors;
}


const mapStateToProps=(state)=>{
    return {
        current_user:state.userProfile,
        current_profile_details : state.profileDetails,
        images: state.images,
        initialValues: {
            phone: state.profileDetails.phone,
            name: (state.userProfile.name) ? state.userProfile.name : 'Akhil Bhavirisetty',
            imgPath: state.profileDetails.imgPath,
            skills: (state.profileDetails.skills) ? state.profileDetails.skills: [],
            aboutme: state.profileDetails.aboutme
        }
    }
};

/*
export default reduxForm({
    validate,
    form: 'EditProfileForm'
},mapStateToProps)(
    withRouter(connect(mapStateToProps,{uploadFile,profileUpdate})(EditUserProfile))
);
*/
export default withRouter(connect(mapStateToProps,{uploadFile,profileUpdate,getUserProfile})(
    reduxForm({
        validate,
        form: 'EditProfileForm'
    })
    (EditUserProfile)));
