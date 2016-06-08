import { connect } from 'react-redux';
import { startStopWatch, tickStopWatch, stopStopWatch } from '../actions';
import StopWatch from '../components/StopWatch';

const mapStateToProps = (state, ownProps) => {
  return {
    elapsed: state.stopWatch.elapsed,
    status: ownProps.status,
    roastId: ownProps.roastId,
    roastStart: ownProps.roastStart
  };
};

const mapDispatchToProps = dispatch => {
  return {
    startStopWatch: (roastId, roastStart, tick) => {
      dispatch(startStopWatch(roastId, roastStart, tick));
    },

    tickStopWatch: (roastStart) => {
      dispatch(tickStopWatch(roastStart));
    },

    stopStopWatch: (roastId) => {
      dispatch(stopStopWatch(roastId));
    }
  };
};

const StopWatchContainer = connect(mapStateToProps, mapDispatchToProps)(StopWatch);

export default StopWatchContainer;
