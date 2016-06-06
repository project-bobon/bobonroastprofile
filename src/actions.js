import C from './constants';
import firebase from 'firebase';

// Auth actions.
export const listeningToAuth = () => {
  return {
    type: C.LISTENING_TO_AUTH
  };
};

export const loginRequest = (method = 'google', nextPath = '/') => {
  return {
    type: C.LOGIN_REQUEST,
    method,
    nextPath
  };
};

export const loginSuccess = (user, nextPath = '/') => {
  return {
    type: C.LOGIN_SUCCESS,
    nextPath,
    user
  };
};

export const logout = (nextPath = '/') => {
  return {
    type: C.LOGOUT,
    nextPath
  };
};

export const startListeningToAuth = () => {
  return function (dispatch) {
    dispatch(listeningToAuth());
    // Start listening to firebase auth changes.
    C.FIREBASE.auth().onAuthStateChanged(authData => {
      // If logged in.
      if (authData) {
        dispatch(loginSuccess(authData));
      } else {
        dispatch(logout());
      }
    });
  };
};

// Roasts actions.
