import C from '../constants';
import history from '../history';

const initialState = {
  text: null,
  yesAction: null,
  noAction: null,
  yesText: null,
  noText: null
};

const dialogReducer = (currentState = initialState, action) => {

  switch(action.type) {
    case C.SHOW_DIALOG:
      return {
        text: action.text,
        yesAction: action.yesAction,
        noAction: action.noAction,
        yesText: action.yesText || 'Yes',
        noText: action.noText || 'No'
      };
      break;

    case C.CLEAR_DIALOG:
      return initialState;
      break;

    default:
      return initialState;
      break;
  }
}

export default dialogReducer;
