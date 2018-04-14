import React from 'react';
import {GET_PROFILE_DETAILS,USER_PROFILE_UPDATE} from "../actions";

const initialState = {
    name:'',
    emailId: '',
    phone: '',
    aboutme: '',
    skills:[],
    imgPath: ''
}

export default function (state = initialState,action) {
    switch (action.type){
        case GET_PROFILE_DETAILS:
            console.log('inside get profile details reducer');
            const user_profile = action.payload;
            console.log(JSON.stringify(user_profile));
            return {...state,name: user_profile.name || '',emailId:user_profile.emailId || '',aboutme:user_profile.aboutme || '',skills:user_profile.skills || [],imgPath:user_profile.imgPath || ''};
        case USER_PROFILE_UPDATE:
            console.log("Inside the user profile update reducer");
            const updated_profile = action.payload.updated_user_profile;
            console.log(`Updated profile details are ${JSON.stringify(updated_profile)}`);
            return {...state,emailId:user_profile.emailId,aboutme:user_profile.aboutme,skills:user_profile.skills,imgPath:user_profile.imgPath};
        default:
            return state;
    }
}