import C from '../constants';

const initialState = {};

const roastCompareReducer = (currentState = initialState, action) => {
  switch(action.type) {

    case C.COMPARE_REDUCERS:
      return {
        ...currentState,
        [action.roastId]: action.compareId
      }
      break;

    default:
      return currentState;
      break;
  }
}

export default roastCompareReducer;
