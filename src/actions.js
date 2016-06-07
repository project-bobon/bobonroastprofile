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
    user,
    nextPath
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
export const startListeningToRoasts = () => {
  if (C.FIREBASE.auth().currentUser) {
    const uid = C.FIREBASE.auth().currentUser.uid;
    return (dispatch, getState) => {
      let roastsRef = C.FIREBASE.app().database().ref('roasts').equalTo('uid', uid);
      roastsRef.on('value', snapshot => {
        console.log(snapshot.val());
        dispatch(fetchedRoasts(snapshot.val()));
      }, err => {
        console.log(err);
      });
    };
  } else {
    return (dispatch, getState) => {
      dispatch(logout());
    };
  }
};

export const fetchedRoasts = (roasts) => {
  return {
    type: C.FETCHED_ROASTS,
    roasts
  };
};

// New roast actions.
export const createNewRoast = (roastDetails) => {
  return {
    type: C.CREATING_NEW_ROAST,
    roastDetails: roastDetails
  };
};

export const createNewRoastSuccess = (roastData) => {
  return {
    type: C.CREATE_NEW_ROAST_SUCCESS,
    roastData: roastData
  };
};

export const createNewRoastFailed = (error) => {
  return {
    type: C.CREATE_NEW_ROAST_FAILED,
    error
  };
};

export const updateCurrentRoastValue = (field, value) => {
  return {
    type: C.UPDATE_CURRENT_ROAST_VALUE,
    field,
    value
  };
};

export const startStopWatch = (roastId, roastStart, tick) => {
  return {
    type: C.STOPWATCH_START,
    roastId,
    roastStart,
    tick
  };
};

export const tickStopWatch = (roastStart) => {
  return {
    type: C.STOPWATCH_TICK,
    roastStart
  };
};

export const stopStopWatch = (roastId) => {
  return {
    type: C.STOPWATCH_STOP,
    roastId
  };
};
