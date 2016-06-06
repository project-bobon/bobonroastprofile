import firebase from 'firebase';

const firebaseConf = {
  apiKey: "AIzaSyAHHNXxfL04NxxSYBIawr1qG15p6L9gex0",
  authDomain: "bobonroast.firebaseapp.com",
  databaseURL: "https://bobonroast.firebaseio.com",
  storageBucket: "bobonroast.appspot.com"
};
firebase.initializeApp(firebaseConf);

const C = {
  // Actions.
  LOGIN_REQUEST: 'LOGIN_REQUEST',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILED: 'LOGIN_FAILED',
  LOGOUT: 'LOGOUT',
  LISTENING_TO_AUTH: 'LISTENING_TO_AUTH',

  // Auth states.
  LOGGED_IN: 'LOGGED_IN',
  LOGGING_IN: 'LOGGING_IN',
  LOGGED_OUT: 'LOGGED_OUT',

  // MISC.
  FIREBASE: firebase
};

export default C;
