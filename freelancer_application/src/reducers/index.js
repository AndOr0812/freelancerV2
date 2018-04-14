import { combineReducers } from 'redux';
import userProfileReducer from './userprofile';
import imageReducer from './imagereducer';
import profileDetailsReducer from './profiledetailreducer';

import {reducer as formReducer} from 'redux-form';
const rootReducer = combineReducers({
    userProfile : userProfileReducer,
    profileDetails: profileDetailsReducer,
    images: imageReducer,
    form : formReducer
});

export default rootReducer;
