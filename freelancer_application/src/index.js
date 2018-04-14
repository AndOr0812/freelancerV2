import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import {BrowserRouter, Route, Switch} from 'react-router-dom';

import reduxThunk from 'redux-thunk';

import App from './components/app';
import SignUp from './containers/signup';
import Login from './containers/login';
import LogOut from './containers/logout';
import reducers from './reducers';
import Profile from "./components/profile";
import EditProfile from './containers/editprofile';
import PostProject from "./containers/postproject";

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);

export const store = createStoreWithMiddleware(reducers);

ReactDOM.render(
  <Provider store={store}>
      <BrowserRouter>
          <Switch>
              {console.log(store.getState())};
              <Route path="/profile" component={Profile}/>
              <Route path="/editprofile" component={EditProfile}/>
              <Route path="/post_project" component={PostProject}/>
              <Route path="/logout" component={LogOut}/>
              <Route path="/signup" component={SignUp}/>
              <Route path="/login" component={Login}/>
              <Route path="/" component={App}/>
          </Switch>
      </BrowserRouter>
  </Provider>
  , document.querySelector('#maincontainer'));
