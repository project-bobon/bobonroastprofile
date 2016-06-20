import { connect } from 'react-redux';

import Settings from '../components/Settings';

const mapStateToProps = (state, ownProps) => {
  return {
    unitSystem: state.settings.unitSystem
  };
};

const mapDispatchToProps = dispatch => {
  return {
  };
};

const SettingsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings);

export default SettingsContainer;
