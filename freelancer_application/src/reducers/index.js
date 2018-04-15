import { combineReducers } from 'redux';
import userProfileReducer from './userprofile';
import imageReducer from './imagereducer';
import profileDetailsReducer from './profiledetailreducer';
import allOpenProjects from './allOpenProjects';

import {reducer as formReducer} from 'redux-form';
const rootReducer = combineReducers({
    userProfile : userProfileReducer,
    profileDetails: profileDetailsReducer,
    images: imageReducer,
    allOpenProjects:allOpenProjects,
    form : formReducer
});

export default rootReducer;
