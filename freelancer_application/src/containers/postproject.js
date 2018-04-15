import React,{ Component } from 'react';
import {Field, reduxForm} from 'redux-form';
import {Link} from 'react-router-dom';
import {connect} from "react-redux";
import {postProject} from "../actions";
import { withRouter } from "react-router-dom";
import Multiselect from 'react-widgets/lib/Multiselect';
import 'react-widgets/dist/css/react-widgets.css';
import Dropzone from 'react-dropzone';

const FILE_FIELD_NAME = 'files';

const renderDropzoneInput = (field) => {
    const files = field.input.value;
    return (
        <div>
            <Dropzone
                name={field.name}
                className={`form-group ${field.meta.touched && field.meta.error ? 'has-danger': ''}`}
                onDrop={
                    ( filesToUpload, e ) => {
                        console.log("Uploaded files are:");
                        console.log(filesToUpload);
                        field.input.onChange(filesToUpload)
                    }
                }
            >
                <span className="form-group input-group-btn">
                    <span className="btn btn-info btn-file">
                        Upload Files&hellip;
                    </span>
                    <p className="font-weight-light">Drag & drop any images or documents that might be helpful in explaining your project brief here.</p>
                </span>
            </Dropzone>
            {field.meta.touched &&
            field.meta.error &&
            <span className="error">{field.meta.error}</span>}
            {files && Array.isArray(files) && (
                <ul>
                    { files.map((file, i) => <li key={i}><img src={file.preview}/> </li>) }
                </ul>
            )}
        </div>
    );
};

class PostProject extends Component {

    componentWillMount(){
        if (JSON.stringify(this.props.current_user) === "{}"){
            this.props.history.push('/login');
        }
    }

    componentWillReceiveProps(nextProps){
        console.log(`Current User Next Props Value is ${nextProps.current_user}`);
        if (JSON.stringify(nextProps.current_user) === "{}"){
            this.props.history.push('/login');
        }
    }

    renderMultiselect({ input, ...rest }){
        return (<div><Multiselect {...input}
                     onBlur={() => input.onBlur()}
                     placeholder={"What skills are required"}
                     value={input.value || []} // requires value to be an array
                     {...rest}/>
            <div className='text-danger'>
        {rest.meta.touched ? rest.meta.error : ''}
        </div>
        </div>);
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
                    {...field.input}
                />
                <div className='text-help'>
                    {field.meta.touched ? field.meta.error : ''}
                </div>
            </div>
        );
    }

    renderTextArea({input, meta: { touched, error, warning },...rest}) {
        console.log("Inside the render textarea");
        console.log(JSON.stringify(input));
        return (
            <div className='form-group'>
                <textarea className="form-control mt-3" {...input} placeholder="Describe your project here" rows="5"></textarea>
                <div>
                    {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
                </div>
            </div>
        );
    }

    onSubmit(values){
        this.props.postProject(values, result => {
            console.log("Return from the callback");
            console.log(result);
            let err_msg ="";
            if (result.code === 200){
                this.props.history.push('/');
                return;
            } else {
                err_msg = "Error while posting a new project";
            }
            document.getElementById("message").innerHTML = err_msg;
        });

     /*   axios({
            method: 'post',
            url: 'http://example.com/send/',
            body: body,
            config: {headers: {'Content-Type': 'multipart/form-data'}}
        })
            .then(res => res.json())
            .then(res => console.log(res))
            .catch(err => console.error(err));*/
    }

    render(){
        const {handleSubmit} = this.props;

        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-2"></div>
                    <div className="col-sm-8">
                        <div className="row max">
                            <div className="row"></div>
                            <div className="col-sm-2">
                            <img src="../../style/freelancer.png" style={{maxWidth:'300'+'px'}} alt=""/>
                            </div>
                            <div className="row"></div>
                        </div>
                        <div className="row"> </div>
                        <div className="row">
                            <h4 className="font-weight-bold mb-2">Tell us what you need done</h4>
                        </div>
                        <div className="row mt-2">
                            <p className="font-weight-light"> Get free quotes from skilled freelancers within minutes, view profiles, ratings and portfolios and chat with them. Pay the freelancer only when you are 100% satisfied with their work. </p>
                        </div>
                        <div className="row mt-4">
                <form id="postproject" className="row" onSubmit={handleSubmit(this.onSubmit.bind(this))} encType="multipart/form-data">
                    <div className="col-sm-12">
                        <h6 className="font-weight-bold">Choose a name for your project</h6>
                    <Field
                        hint = 'e.g. Build me a website'
                        type = 'text'
                        name = "proj_name"
                        component = {this.renderField}
                    />
                    </div>
                    <div className="col-sm-12 mt-4">
                        <h6 className="font-weight-bold">Tell us more about your project</h6>
                        <p className="font-weight-light mt-2">Great project descriptions include a little bit about yourself, details of what you are trying to achieve, and any decisions that you have already made about your project. If there are things you are unsure of, don't worry, a freelancer will be able to help you fill in the blanks.</p>
                            <Field
                                name="proj_desc"
                                component={this.renderTextArea}>
                            </Field>
                    </div>
                    <div className="col-sm-12 mt-4">
                    <h6 className="font-weight-bold">What Skills are required?</h6>
                        <p className="font-weight-light">Enter up to 5 skills that best describe your project. Freelancers will use these skills to find projects they are most interested and experienced in.</p>
                        <Field
                            name="proj_skills"
                            component={this.renderMultiselect}
                            data={[ 'MySQL', 'NodeJS', 'ReactJS', 'Redux'  ]}/>
                    </div>

                    <div className="col-sm-12 mt-4">
                        <h6 className="font-weight-bold">What is your estimated budget?</h6>
                        <Field
                            hint = 'Estimated Project Budget'
                            type = 'text'
                            name = "proj_budget"
                            component = {this.renderField}
                        />
                    </div>

                    <div className="col-sm-12 mt-4" style={{border: "dashed"}}>
                        <label htmlFor={FILE_FIELD_NAME}></label>
                        <Field
                            name={FILE_FIELD_NAME}
                            component={renderDropzoneInput}
                        />
                    </div>

                    <div className="container mt-4">
                        <div className="row">
                            <div className="col-sm-6">
                                <button type='submit' className='btn btn-warning btn-lg'>Post My Project</button>
                            </div>
                            <div className="col-sm-6">
                            </div>
                        </div>
                    </div>
                    <div className="row text-danger" id="message"></div>
                </form>
                        </div>
                    </div>
                    <div className="col-sm-2"></div>
                </div>
            </div>
        );
    }
}

function validate(values) {
    console.log(JSON.stringify(values));
    const errors = {};
    console.log(JSON.stringify(values.files));

    console.log(`values.files values is ${values.files}`);

    if (!values.proj_name){
        errors.proj_name = 'Please Enter a project name.'
    }
    if (!values.proj_desc){
        errors.proj_desc = 'Please Enter the project description.'
    }
    console.log(`project skills data is ${values.proj_skills}`);
    if(!values.proj_skills){
        console.log("Inside the project skills if clause");
        errors.proj_skills = 'Please select at lease one skills'
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
    form: 'PostProjectForm'
})(
    withRouter(connect(mapStateToProps,{postProject})(PostProject))
);