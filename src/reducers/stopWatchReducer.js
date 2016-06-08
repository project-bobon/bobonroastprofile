import C from '../constants';

const initialState = {
  elapsed: 0,
  tick: null
};

const stopWatchReducer = (currentState = initialState, action) => {
  switch(action.type) {

    case C.STOPWATCH_START:
      return {
        elapsed: 0,
        tick: action.tick
      }
      break;

    case C.STOPWATCH_TICK:
      return {
        ...currentState,
        elapsed: Date.now() - action.roastStart
      }
      break;

    case C.STOPWATCH_STOP:
      clearInterval(currentState.tick);
      return currentState;
      break;

    default:
      return currentState;
  }
}

export default stopWatchReducer;
