import C from '../constants';

const initialState = null;

const roastInProgressReducer = (currentState = initialState, action) => {
  switch(action.type) {

    case C.CHECK_ROAST_IN_PROGRESS:
      if (action.roasts) {
        let roastId = currentState;
        let roastInProgress = Object.keys(action.roasts).find(key => {
          return action.roasts[key].status === C.ROAST_IN_PROGRESS;
        });

        if (roastInProgress) {
          roastId = roastInProgress;
        } else {
          roastId = initialState;
        }

        return roastId;
      } else {
        return null;
      }
    break;

  case C.CLEAR_ROAST_IN_PROGRESS:
    return initialState;
    break;

    default:
      return currentState;
  }
};

export default roastInProgressReducer;
