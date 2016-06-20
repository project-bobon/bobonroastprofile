import { connect } from 'react-redux';

import C from '../constants';
import UnitSwitcher from '../components/UnitSwitcher';

const mapStateToProps = (state, ownProps) => {
  let unitSystem = state.settings.unitSystem;
  return {
    unitSystem,
    altUnitSystem: unitSystem === C.IMPERIAL ? C.METRIC : C.IMPERIAL,
    tempUnit: unitSystem === C.IMPERIAL ? C.IMPERIAL_TEMP_SYMBOL : C.METRIC_TEMP_SYMBOL,
    weightUnit: unitSystem === C.IMPERIAL ? C.IMPERIAL_WEIGHT_SYMBOL : C.METRIC_WEIGHT_SYMBOL,
    altTempUnit: unitSystem === C.IMPERIAL ? C.METRIC_TEMP_SYMBOL : C.IMPERIAL_TEMP_SYMBOL,
    altWeightUnit: unitSystem === C.IMPERIAL ? C.METRIC_WEIGHT_SYMBOL : C.IMPERIAL_WEIGHT_SYMBOL,
    customClass: ownProps.customClass
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateUnitSystem: (unitSystem, currentUnitSystem) => {
      if (unitSystem !== currentUnitSystem) {
        const uid = C.FIREBASE.auth().currentUser.uid;
        const ref = C.FIREBASE.app().database().ref(`/settings/${ uid }/unitSystem`);
        ref.set(unitSystem, err => {
          if (err) {
            console.error(err);
          }
        });
      }
    }
  };
};

const UnitSwitcherContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(UnitSwitcher);

export default UnitSwitcherContainer;
