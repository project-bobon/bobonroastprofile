import { combineReducers } from 'redux';
import authReducer from './authReducer';
import roastsReducer from './roastsReducer';
import newRoastReducer from './newRoastReducer';
import stopWatchReducer from './stopWatchReducer';

export default combineReducers({
  auth: authReducer,
  roasts: roastsReducer,
  newRoast: newRoastReducer,
  stopWatch: stopWatchReducer
});
