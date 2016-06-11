import C from '../constants';

const initialState = {};

const editingFieldReducer = (currentState = initialState, action) => {
  switch(action.type) {

    case C.TOGGLE_EDITING_FIELD:
      let editing = C.FIELD_STATUS_EDITING;
      let roastFields = {};
      let editingFields = currentState;

      if (editingFields.hasOwnProperty(action.roastId)) {
        roastFields = editingFields[action.roastId];
        if (roastFields.hasOwnProperty(action.field)) {
          if (roastFields[action.field] === C.FIELD_STATUS_EDITING) {
            editing = C.FIELD_STATUS_NOT_EDITING;
          } else if (roastFields[action.field] === C.FIELD_STATUS_NOT_EDITING) {
            editing = C.FIELD_STATUS_EDITING;
          }
        }
      }

      return {
        ...currentState,
        [action.roastId]: {
          ...roastFields,
          [action.field]: editing
        }
      };
      break;

    default:
      return currentState;
      break;
  }
};

export default editingFieldReducer;
