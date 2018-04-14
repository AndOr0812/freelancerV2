import React,{ Component } from 'react';
import {AUTHENTICATE_USER,LOGOUT_USER} from '../actions';

export default function (state = {},action) {
    switch (action.type) {
        case AUTHENTICATE_USER:
            const user_details = action.payload;
            console.log('inside userprofile reducer');
            console.log('name is ' + user_details.name);
            console.log('email id is '+ user_details.emailid);
            return {'isLoggedIn': true,'name' : user_details.name, 'emailid': user_details.emailid};
        case LOGOUT_USER:
            console.log('inside logout reducer');
            window.sessionStorage.setItem('is_logged_in','false');
            return {};
        default:
            return state;
    }
}