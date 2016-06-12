import { connect } from 'react-redux';
import C from '../constants';
import { updateRoastValue, toggleEditing } from '../actions';
import PostRoastNoteForm from '../components/PostRoastNoteForm';

const mapStateToProps = (state, ownProps) => {
  let postRoastNote = '';
  let editings = state.editingFields[ownProps.roastId] || {};
  let editing = C.FIELD_STATUS_LOADING;

  if (state.roasts[ownProps.roastId]) {
    postRoastNote = state.roasts[ownProps.roastId].postRoastNote;
  }

  return {
    roastId: ownProps.roastId,
    postRoastNote,
    editing: editings[C.FIELD_POST_ROAST_NOTE] || C.FIELD_STATUS_NOT_EDITING
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSubmit: e => {

      e.preventDefault();

      let roastId = e.target.roastId.value;
      let postRoastNote = e.target.postRoastNote.value;
      let uid = C.FIREBASE.auth().currentUser.uid;
      let ref = C.FIREBASE.database().ref(`roasts/${uid}/${roastId}/postRoastNote`);

      ref.set(postRoastNote, () => {
        dispatch(updateRoastValue(
          roastId,
          C.FIELD_POST_ROAST_NOTE,
          postRoastNote
        ));


        dispatch(toggleEditing(roastId, C.FIELD_POST_ROAST_NOTE));
      });
    },

    toggleEditing: (roastId, field) => {
      dispatch(toggleEditing(roastId, field));
    }
  };
};

const PostRoastNoteFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PostRoastNoteForm);

export default PostRoastNoteFormContainer;
