import { connect } from 'react-redux';
import RoastProfile from '../components/RoastProfile';
import { compareRoasts, addFirstCrack } from '../actions';
import C from '../constants';

const mapStateToProps = (state, ownProps) => {
  if (typeof state.roasts[ownProps.params.roastId] !== 'undefined') {
    const unitSystem = state.settings.unitSystem;
    let compare = null;

    if (state.roasts[ownProps.params.roastId].hasOwnProperty('compare') &&
        state.roasts[ownProps.params.roastId].compare
    ) {
      compare = state.roasts[state.roasts[ownProps.params.roastId].compare];
    }

    return {
      ...state.roasts[ownProps.params.roastId],
      roastId: ownProps.params.roastId,
      roastInProgress: state.roastInProgress,
      compare,
      unitSystem,
      tempUnit: unitSystem === C.IMPERIAL ? C.IMPERIAL_TEMP_SYMBOL : C.METRIC_TEMP_SYMBOL,
      weightUnit: unitSystem === C.IMPERIAL ? C.IMPERIAL_WEIGHT_SYMBOL : C.METRIC_WEIGHT_SYMBOL,
      roastIds: Object.keys(state.roasts).map(roastId => {
        return {
          id: roastId,
          value: state.roasts[roastId].beansName,
          roastStart: state.roasts[roastId].roastStart
        };
      }).filter(v => {
        return v.id !== ownProps.params.roastId;
      })
    };
  } else {
    return {};
  }
};

const getLastRoastPointId = roastPoints => {
  if (roastPoints) {
    return Object.keys(roastPoints).pop();
  } else {
    return null;
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onChangeCompare: (e, roastId) => {
      dispatch(compareRoasts(roastId, e.target.value));
    },
    compareRoasts: (roastId, compareId) => {
      dispatch(compareRoasts(roastId, compareId));
    },
    undoLastTemperature: (roastId, roastPoints) => {
      // Only remove points if there are more than 1 roast points.
      // The initial temperature point should never be removed.
      if (roastPoints && Object.keys(roastPoints).length > 1) {
        let lastRoastPointId = getLastRoastPointId(roastPoints);
        let uid = C.FIREBASE.auth().currentUser.uid;
        let ref = C.FIREBASE.app().database().ref(`/roasts/${uid}/${roastId}/roastPoints/${lastRoastPointId}`);
        ref.remove();
      }
    },
    addFirstCrack: (roastId, roastStart) => {
      let uid = C.FIREBASE.auth().currentUser.uid;
      let ref = C.FIREBASE.app().database().ref(`/roasts/${uid}/${roastId}/firstCrack`);
      let firstCrackTime = Date.now() - roastStart;
      dispatch(addFirstCrack(roastId, firstCrackTime));
      ref.set(firstCrackTime);
    }
  };
};

const RoastProfileContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(RoastProfile);

export default RoastProfileContainer;
