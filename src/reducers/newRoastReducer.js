import C from '../constants';
import history from '../history';

const initialState = {
  // New roast details.
  roastNote: null,
  beansName: null,
  batchSize: null,
  moisture: null,

  // Roast monitor.
  status: C.ROAST_UNSAVED
};

const newRoastReducer = (currentState = initialState, action) => {
  switch(action.type) {

    case C.CREATING_NEW_ROAST:
      return {
        ...currentState,
        status: C.ROAST_PENDING
      };
      break;

    case C.CREATE_NEW_ROAST_SUCCESS:
      return initialState;
      break;

    case C.CREATE_NEW_ROAST_FAILED:
      return {
        ...currentState,
        status: C.ROAST_UNSAVED
      };
      break;

    case C.UPDATE_CURRENT_ROAST_VALUE:
      return {
        ...currentState,
        [action.field]: action.value
      };
      break;

    default:
      return currentState;
  }
};

export default newRoastReducer;
