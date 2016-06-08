import C from '../constants';

const initialState = {
  elapsed: 0,
  tick: null
};

const stopWatchReducer = (currentState = initialState, action) => {
  switch(action.type) {

    case C.STOPWATCH_START:
    case C.STOPWATCH_RESUME:
      return {
        elapsed: Date.now() - action.roastStart,
        tick: action.tick
      };
      break;

    case C.STOPWATCH_TICK:
      return {
        ...currentState,
        elapsed: Date.now() - action.roastStart
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
