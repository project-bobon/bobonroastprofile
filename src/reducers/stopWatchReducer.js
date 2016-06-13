import C from '../constants';

const initialState = {
  roastStart: null,
  tick: null
};

const stopWatchReducer = (currentState = initialState, action) => {
  switch(action.type) {

    case C.STOPWATCH_START:
    case C.STOPWATCH_RESUME:
      return {
        roastStart: action.roastStart,
        tick: action.tick
      };
      break;

    case C.STOPWATCH_STOP:
      return initialState;
      break;

    default:
      return currentState;
  }
};

export default stopWatchReducer;
