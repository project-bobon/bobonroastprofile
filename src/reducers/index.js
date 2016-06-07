import { combineReducers } from 'redux';
import authReducer from './authReducer';
import roastsReducer from './roastsReducer';
import currentRoastReducer from './currentRoastReducer';

export default combineReducers({
  auth: authReducer,
  roasts: roastsReducer,
  currentRoast: currentRoastReducer
});
