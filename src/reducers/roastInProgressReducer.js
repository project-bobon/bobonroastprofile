import C from '../constants';

const initialState = {
  roastId: null
};

const roastInProgressReducer = (currentState = initialState, action) => {
  switch(action.type) {

    case C.CHECK_ROAST_IN_PROGRESS:
      if (action.roasts) {
        let roastId = currentState.roastId;
        let roastInProgress = Object.keys(action.roasts).find(key => {
          return action.roasts[key].status === C.ROAST_IN_PROGRESS;
        });

        if (roastInProgress) {
          roastId = roastInProgress;
        }
        return {
          roastId: roastId
        };
      } else {
        return currentState;
      }
      break;

    default:
      return currentState;
  }
};

export default roastInProgressReducer;
