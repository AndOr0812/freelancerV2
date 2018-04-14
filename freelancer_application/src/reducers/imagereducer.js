import React from 'react';
import {GET_IMAGES} from "../actions";

export default function (state = [],action) {
    switch (action.type){
        case GET_IMAGES:
            console.log('inside getImages reducer');
            //const images = action.payload.data;
            return action.payload;
        default:
            return state;
    }
}