import { connect } from 'react-redux';

import Settings from '../components/Settings';
import { updateSetting } from '../actions';
import C from '../constants';

const mapStateToProps = (state, ownProps) => {
  return {
    unitSystem: state.settings.unitSystem
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onChangeUnitSystem: (e, currentUnitSystem) => {
      // Only update if the value changes.
      if (e.target.value !== currentUnitSystem) {
        let uid = C.FIREBASE.auth().currentUser.uid;
        let ref = C.FIREBASE.app().database().ref(`settings/${uid}/unitSystem`);
        let value = e.target.value;

        ref.set(value, err => {
          if (err) {
            console.error(err);
          }
        });
      }
    }
  };
};

const SettingsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings);

export default SettingsContainer;
