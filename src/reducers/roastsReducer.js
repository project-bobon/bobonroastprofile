import C from '../constants';
import history from '../history';

const initialState = {
  roasts: [],
  elapsed: 0,
  startTime: null,
  elapsed: 0,
  diff: 0,
  timerOn: false,
  currentRoast: null
};

const roastsReducer = (currentState = initialState, action) => {
  switch(action.type) {
    default:
      return intialState;
  }
};

export default roastsReducer;
