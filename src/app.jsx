import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, Link } from 'react-router';
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';

import AppContainer from './containers/AppContainer';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import rootReducer from './reducers/index';
import { listeningToAuth, loginSuccess, logout } from './actions';
import auth from './auth';
import C from './constants';
import history from './history';
import MainContainer from './containers/MainContainer';

const store = applyMiddleware(thunkMiddleware)(createStore)(rootReducer, {}
);

const routes = (
  <Router history={ history }>
    <Route path="/" component={ AppContainer }>
      <IndexRoute component={ MainContainer }/>
    </Route>
  </Router>
);

render(
  <Provider store={ store }>
    { routes }
  </Provider>,
  document.getElementById('main')
);

store.dispatch(listeningToAuth());

// Start listening to firebase auth changes.
C.FIREBASE.auth().onAuthStateChanged((user) => {
  // If logged in.
  if (user) {
    store.dispatch(loginSuccess(user));
  } else {
    store.dispatch(logout());
  }
}, err => {
  console.log(err);
});
