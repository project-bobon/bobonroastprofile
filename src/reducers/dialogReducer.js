import C from '../constants';
import history from '../history';

const initialState = {
  text: null,
  yesAction: null,
  noAction: null,
  yesText: null,
  noText: null,
  dialogType: null
};

const dialogReducer = (currentState = initialState, action) => {

  switch(action.type) {
    case C.SHOW_DIALOG:
      return {
        dialogType: action.dialogType,
        noAction: action.noAction,
        noText: action.noText || 'No',
        text: action.text,
        yesAction: action.yesAction,
        yesText: action.yesText || 'Yes'
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
