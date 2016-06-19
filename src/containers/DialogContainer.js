import { connect } from 'react-redux';
import Dialog from '../components/Dialog';
import { clearDialog } from '../actions';

const mapStateToProps = state => {
  return {
    dialogType: state.dialog.dialogType,
    noAction: state.dialog.noAction,
    noText: state.dialog.noText,
    text: state.dialog.text,
    yesAction: state.dialog.yesAction,
    yesText: state.dialog.yesText
  };
};

const mapDispatchToProps = dispatch => {
  return {
    clearDialog: () => {
      dispatch(clearDialog());
    }
  };
}

const DialogContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Dialog);

export default DialogContainer;
