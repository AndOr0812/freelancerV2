import React, {Component} from 'react'
import { Field, reduxForm } from 'redux-form'

const required = value => (value ? undefined : 'Required');

const maxLength = max => value =>
    value && value.length > max ? `Must be ${max} characters or less` : undefined;
const maxLength45 = maxLength(45);
const maxLength15 = maxLength(15);
const maxLength30 = maxLength(30);


export const minLength = min => value =>
    value && value.length < min ? `Must be ${min} characters or more` : undefined;
export const minLength2 = minLength(2);
export const minLength8 = minLength(8);

const number = value =>
    value && isNaN(Number(value)) ? 'Must be a number' : undefined;

const email = value =>
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
        ? 'Invalid email address'
        : undefined;

const aol = value =>
    value && /.+@aol\.com/.test(value)
        ? 'Really? You still use AOL for your email?'
        : undefined;

const alphaNumeric = value =>
    value && /[^a-zA-Z0-9 ]/i.test(value)
        ? 'Only alphanumeric characters'
        : undefined;

const renderField = ({
                         input,
                         label,
                         type,
                         meta: { touched, error, warning }
                     }) => (
    <div>
        <label>{label}</label>
        <div>
            <input {...input} placeholder={label} type={type} />
            {touched &&
            ((error && <span>{error}</span>) ||
                (warning && <span>{warning}</span>))}
        </div>
    </div>
)

const TempForm = props => {

    const { handleSubmit, pristine, reset, submitting } = props;
    return (
        <form>
            <Field
                name="name"
                type="text"
                component={renderField}
                label="Name"
                validate={[required, maxLength45, minLength2]}
                warn={alphaNumeric}
            />
            <Field
                name="email"
                type="email"
                component={renderField}
                label="Email"
                validate={[required,email,maxLength30]}
                warn={aol}
            />
            <Field
                name="password"
                type="password"
                component={renderField}
                label="Password"
                validate={[required, maxLength15, minLength8]}
            />
            <div>
                <button className='btn btn-primary' type="submit" disabled={submitting}>
                    Submit
                </button>
                <button className='btn btn-danger' type="button" disabled={pristine || submitting} onClick={reset}>
                    Reset
                </button>
            </div>
        </form>
    )
}

export default reduxForm({
    form: 'Temp'// a unique identifier for this form
})(TempForm);