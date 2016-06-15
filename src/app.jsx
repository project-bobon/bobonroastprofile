import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, Link, Redirect } from 'react-router';
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';

import AppContainer from './containers/AppContainer';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import rootReducer from './reducers/index';

import {
  listeningToAuth,
  loginSuccess,
  logout,
  fetchedRoasts,
  checkRoastInProgress,
  loadingData,
  loadedData
} from './actions';

import auth from './auth';
import C from './constants';
import history from './history';
import MainContainer from './containers/MainContainer';
import NewRoastFormContainer from './containers/NewRoastFormContainer';
import RoastProfileContainer from './containers/RoastProfileContainer';


const store = applyMiddleware(thunkMiddleware)(createStore)(rootReducer, {}
//,window.devToolsExtension && window.devToolsExtension()
);

const routes = (
  <Router history={ history }>
    <Route path="/" component={ AppContainer }>
      <IndexRoute component={ MainContainer }/>

      <Route path="new" component={ NewRoastFormContainer } onEnter={ auth.checkAuth }/>

      <Redirect from="roasts" to="/" onEnter={ auth.checkAuth }/>
      <Route path="roasts/:roastId" component={ RoastProfileContainer } onEnter={ auth.checkAuth }/>
    </Route>
  </Router>
);

render(
  <Provider store={ store }>
    { routes }
  </Provider>,
  document.body
);


store.dispatch(listeningToAuth());

// Start listening to firebase auth changes.
C.FIREBASE.auth().onAuthStateChanged((user) => {
  // If logged in.
  if (user) {
    store.dispatch(loginSuccess(user));

    // Listen to roast changes
    let roastsRef = C.FIREBASE.app().database().ref(`/roasts/${user.uid}`);

    store.dispatch(loadingData());
    roastsRef.on('value', snapshot => {
      store.dispatch(fetchedRoasts(snapshot.val()));
      store.dispatch(loadedData());
      store.dispatch(checkRoastInProgress(snapshot.val()));
    }, err => {
      console.log(err);
    });

  } else {
    C.FIREBASE.auth().getRedirectResult().then(function(result) {
      if (!result.user) {
        store.dispatch(logout());
      } else {
        store.dispatch(loginSuccess(result.user));
      }
    });
  }
}, err => {
  console.log(err);
});
