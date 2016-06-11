import { connect } from 'react-redux';
import RoastProfile from '../components/RoastProfile';

const mapStateToProps = (state, ownProps) => {
  if (typeof state.roasts[ownProps.params.roastId] !== 'undefined') {
    return {
      ...state.roasts[ownProps.params.roastId],
      roastId: ownProps.params.roastId,
      roastInProgress: state.roastInProgress
    };
  } else {
    return {};
  }
};

const RoastProfileContainer = connect(mapStateToProps)(RoastProfile);

export default RoastProfileContainer;
