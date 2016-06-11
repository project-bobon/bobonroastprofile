import { connect } from 'react-redux';
import RoastPointsList from '../components/RoastPointsList';

const mapStateToProps = (state, ownProps) => {
  let roastId = ownProps.roastId;
  let roastPoints = {};

  if (state.roasts.hasOwnProperty(roastId) &&
      state.roasts[roastId].hasOwnProperty('roastPoints')
  ) {
    roastPoints = state.roasts[roastId].roastPoints;
  }

  return {
    roastPoints
  };
};

const RoastPointsListContainer = connect(
  mapStateToProps
)(RoastPointsList);

export default RoastPointsListContainer;
