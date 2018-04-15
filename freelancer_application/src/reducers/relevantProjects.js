import React,{ Component } from 'react';
import {RELEVANT_PROJECTS} from '../actions';

export default function (state = [],action) {
    switch (action.type) {
        case RELEVANT_PROJECTS:
            return state= action.payload;
        default:
            return state;
    }
}