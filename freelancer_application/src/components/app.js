import React, { Component } from 'react';
import Headers from './headers';
import Home from '../containers/home';
//import FileUploadComponent from '../containers/fileUploadComponent';

export default class App extends Component {
  render() {
    return (
      <div>
          <Headers/>
          <Home/>
      </div>
    );
  }
}
