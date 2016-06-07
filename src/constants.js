import firebase from 'firebase';

const firebaseConf = {
  apiKey: "AIzaSyAHHNXxfL04NxxSYBIawr1qG15p6L9gex0",
  authDomain: "bobonroast.firebaseapp.com",
  databaseURL: "https://bobonroast.firebaseio.com",
  storageBucket: "bobonroast.appspot.com"
};
firebase.initializeApp(firebaseConf);

const C = {
  // Auth actions.
  LOGIN_REQUEST: 'LOGIN_REQUEST',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILED: 'LOGIN_FAILED',
  LOGOUT: 'LOGOUT',
  LISTENING_TO_AUTH: 'LISTENING_TO_AUTH',

  // Roasts actions.
  FETCHING_ROASTS: 'FETCHING_ROASTS',
  FETCHED_ROASTS: 'FETCHED_ROASTS',
  CREATE_NEW_ROAST: 'CREATE_NEW_ROAST',
  UPDATE_CURRENT_ROAST_VALUE: 'UPDATE_CURRENT_ROAST_VALUE',

  // Auth states.
  LOGGED_IN: 'LOGGED_IN',
  LOGGING_IN: 'LOGGING_IN',
  LOGGED_OUT: 'LOGGED_OUT',

  // MISC.
  FIREBASE: firebase
};

export default C;
