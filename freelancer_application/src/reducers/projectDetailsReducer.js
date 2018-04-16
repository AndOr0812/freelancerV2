import React,{ Component } from 'react';
import {PROJECT_DETAIL} from '../actions';

export default function (state = {},action) {
    switch (action.type) {
        case PROJECT_DETAIL:
            return state= action.payload;
        default:
            return state;
    }
}