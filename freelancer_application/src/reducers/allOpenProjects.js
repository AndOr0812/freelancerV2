import React,{ Component } from 'react';
import {ALL_OPEN_PROJECTS} from '../actions';

export default function (state = [],action) {
    switch (action.type) {
        case ALL_OPEN_PROJECTS:
            return state= action.payload;
        default:
            return state;
    }
}