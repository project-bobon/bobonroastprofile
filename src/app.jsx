import React from 'react';
import ReactGA from 'react-ga';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, Link, Redirect } from 'react-router';
import { createStore, applyMiddleware, compose } from 'redux';
import { render } from 'react-dom';

import AppContainer from './containers/AppContainer';
import C from './constants';
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import MainContainer from './containers/MainContainer';
import NewRoastFormContainer from './containers/NewRoastFormContainer';
import RoastProfileContainer from './containers/RoastProfileContainer';
import auth from './auth';
import history from './history';
import rootReducer from './reducers/index';
import {
  checkRoastInProgress,
  fetchedRoasts,
  listeningToAuth,
  loadedData,
  loadingData,
  loginSuccess,
  logout
} from './actions';

const store = applyMiddleware(thunkMiddleware)(createStore)(rootReducer, {}
//,window.devToolsExtension && window.devToolsExtension()
);

// Analytics
ReactGA.initialize(C.GOOGLE_ANALYTICS_CODE);

const logPageView = () => {
  ReactGA.pageview(window.location.pathname);
};

const routes = (
  <Router history={ history } onUpdate={ logPageView }>
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
