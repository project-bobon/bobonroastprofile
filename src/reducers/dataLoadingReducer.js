import C from '../constants';
import history from '../history';

const initialState = false;

const dataLoadingReducer = (currentState = initialState, action) => {

  switch(action.type) {

    case C.LOADING_DATA:
      return true;
      break;

    case C.LOADED_DATA:
    default:
      return false;
      break;
  }
};

export default dataLoadingReducer;
