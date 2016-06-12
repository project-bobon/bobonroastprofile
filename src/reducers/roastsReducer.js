import C from '../constants';
import history from '../history';

const initialState = {};

const roastsReducer = (currentState = initialState, action) => {
  switch(action.type) {

    case C.FETCHED_ROASTS:
      return action.roasts;
      break;

    case C.COMPARE_ROASTS:
      return {
        ...currentState,
        [action.roastId]: {
          ...currentState[action.roastId],
          compare: action.compareId
        }
      };
    break;

    case C.ADD_FIRST_CRACK:
      return {
        ...currentState,
        [action.roastId]: {
          ...currentState[action.roastId],
          firstCrack: action.firstCrackTime
        }
      }
      break;

    default:
      return currentState;
  }
};

export default roastsReducer;
