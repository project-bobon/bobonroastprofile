import { connect } from 'react-redux';
import RoastProfile from '../components/RoastProfile';
import { compareRoasts } from '../actions';

const mapStateToProps = (state, ownProps) => {
  if (typeof state.roasts[ownProps.params.roastId] !== 'undefined') {
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
      roastIds: Object.keys(state.roasts).map(roastId => {
        return { id: roastId, value: state.roasts[roastId].beansName }
      })
    };
  } else {
    return {};
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onChangeCompare: (e, roastId) => {
      dispatch(compareRoasts(roastId, e.target.value));
    }
  }
}

const RoastProfileContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(RoastProfile);

export default RoastProfileContainer;
