import { connect } from 'react-redux';

import C from '../constants';
import RoastPointInput from '../components/RoastPointInput';
import { metricTemp } from '../helpers';

const mapStateToProps = (state, ownProps) => {
  let unitSystem = state.settings.unitSystem;
  return {
    roastId: ownProps.roastId,
    roastStart: ownProps.roastStart,
    status: ownProps.status,
    unitSystem,
    tempUnit: unitSystem === C.IMPERIAL ? C.IMPERIAL_TEMP_SYMBOL : C.METRIC_TEMP_SYMBOL
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSubmit: (e, unitSystem) => {
      e.preventDefault();

      const temp = metricTemp(parseFloat(e.target.roastTemp.value), unitSystem);
      const roastId = e.target.roastId.value;
      const elapsed = Date.now() - parseFloat(e.target.roastStart.value);
      const uid = C.FIREBASE.auth().currentUser.uid;
      const ref = C.FIREBASE.app().database().ref(`roasts/${uid}/${roastId}/roastPoints`);

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
