import { connect } from 'react-redux';
import RoastList from '../components/RoastList';
import { removeRoast } from '../actions';
import C from '../constants';
import { showDialog } from '../actions';
import moment from 'moment';

const mapStateToProps = state => {
  let unitSystem = state.settings.unitSystem;
  return {
    roasts: state.roasts,
    unitSystem,
    tempUnit: unitSystem === C.IMPERIAL ? '°F' : '°C',
    weightUnit: unitSystem === C.IMPERIAL ? 'lbs' : 'kg'
  };
};

const mapDispatchToProps = dispatch => {
  return {
    removeRoast: (roastId, beansName) => {
      dispatch(showDialog({
        yesAction: () => {
          let uid = C.FIREBASE.auth().currentUser.uid;
          let ref = C.FIREBASE.app().database().ref(`roasts/${uid}/${roastId}`);

          ref.remove(() => {
            dispatch(removeRoast(roastId));
          });
        },
        text: `Are you sure to delete "${ beansName }"? This cannot be undone.`
      }));
    }
  };
};

const RoastListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(RoastList);

export default RoastListContainer;
