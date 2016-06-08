import { connect } from 'react-redux';
import C from '../constants';
import RoastPointInput from '../components/RoastPointInput';

const mapStateToProps = (state, ownProps) => {
  return {
    roastId: ownProps.roastId,
    roastStart: ownProps.roastStart,
    status: ownProps.status
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSubmit: e => {
      let temp = parseFloat(e.target.roastTemp.value);
      let roastId = e.target.roastId.value;
      let elapsed = Date.now() - parseFloat(e.target.roastStart.value);
      let uid = C.FIREBASE.auth().currentUser.uid;
      let ref = C.FIREBASE.app().database().ref(`roasts/${uid}/${roastId}/roastPoints`);

      e.preventDefault();

      ref.push({
        temperature: temp,
        elapsed
      });

      e.target.roastTemp.value = '';
    }
  };
};

const RoastPointInputContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(RoastPointInput);

export default RoastPointInputContainer;
