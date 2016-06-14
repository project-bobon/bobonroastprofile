import { connect } from 'react-redux';
import Dialog from '../components/Dialog';
import { clearDialog } from '../actions';

const mapStateToProps = state => {
  return {
    text: state.dialog.text,
    yesAction: state.dialog.yesAction,
    noAction: state.dialog.noAction,
    yesText: state.dialog.yesText,
    noText: state.dialog.noText
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
