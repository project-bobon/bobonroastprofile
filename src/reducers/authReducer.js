import C from '../constants';
import history from '../history';

const initialState = {
  authStatus: C.LOGGING_IN,
  authProvider: null,
  uid: null,
  photoURL: null,
  userName: null,
  listeningToAuth: false
};

const authReducer = (currentState = initialState, action) => {

  switch(action.type) {

    case C.LISTENING_TO_AUTH:
      return {
        ...currentState,
        listeningToAuth: true
      };
      break;

    case C.LOGIN_REQUEST:
      return {
        ...currentState,
        authStatus: C.LOGGING_IN
      };
      break;

    case C.LOGIN_SUCCESS:
      let userName = null;
      return {
        ...currentState,
        authStatus: C.LOGGED_IN,
        uid: action.user.uid,
        photoURL: action.user.photoURL,
        userName: action.user.displayName
      };
      break;

    case C.LOGOUT:
      history.push('/');
      return {
        ...currentState,
        authStatus: C.LOGGED_OUT,
        uid: null,
        userName: null
      };
      break;

    default:
      return currentState;
  }
};

export default authReducer;
