import C from '../constants';
import history from '../history';

const initialState = []

const roastsReducer = (currentState = initialState, action) => {
  switch(action.type) {

    case C.FETCHED_ROASTS:
      return action.roasts;
      break;

    default:
      return currentState;
  }
};

export default roastsReducer;
