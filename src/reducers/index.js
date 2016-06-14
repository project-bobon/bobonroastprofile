import { combineReducers } from 'redux';
import authReducer from './authReducer';
import roastsReducer from './roastsReducer';
import newRoastReducer from './newRoastReducer';
import stopWatchReducer from './stopWatchReducer';
import roastInProgressReducer from './roastInProgressReducer';
import editingFieldReducer from './editingFieldReducer';
import dialogReducer from './dialogReducer';
import dataLoadingReducer from './dataLoadingReducer';

export default combineReducers({
  auth: authReducer,
  roasts: roastsReducer,
  newRoast: newRoastReducer,
  stopWatch: stopWatchReducer,
  roastInProgress: roastInProgressReducer,
  editingFields: editingFieldReducer,
  dialog: dialogReducer,
  dataLoading: dataLoadingReducer
});
