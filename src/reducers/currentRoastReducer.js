import C from '../constants';
import history from '../history';

const initialState = {
  // New roast details.
  roastId: null,
  roastTitle: null,
  roastDate: null,
  beansName: null,
  batchSize: null,
  moisture: null,

  // Roast monitor.
  elapsed: 0,
  startTime: null,
  elapsed: 0,
  diff: 0,
  timerOn: false,
  currentRoast: null,
  roastPoints: []
};

const currentRoastReducer = (currentState = initialState, action) => {
  switch(action.type) {

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

export default currentRoastReducer;
