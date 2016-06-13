import { connect } from 'react-redux';
import { startStopWatch, resumeStopWatch, tickStopWatch, stopStopWatch, clearRoastInProgress } from '../actions';
import StopWatch from '../components/StopWatch';

const mapStateToProps = (state, ownProps) => {
  return {
    elapsed: state.stopWatch.elapsed,
    status: ownProps.status,
    roastId: ownProps.roastId,
    roastStart: ownProps.roastStart,
    tick: state.stopWatch.tick
  };
};

const mapDispatchToProps = dispatch => {
  return {
    startStopWatch: (roastId, roastStart, tick) => {
      dispatch(startStopWatch(roastId, roastStart, tick));
    },

    resumeStopWatch: (roastId, roastStart, tick) => {
      dispatch(resumeStopWatch(roastId, roastStart, tick));
    },

    stopStopWatch: (roastId, tick) => {
      clearInterval(tick);
      dispatch(stopStopWatch(roastId));
    }
  };
};

const StopWatchContainer = connect(mapStateToProps, mapDispatchToProps)(StopWatch);

export default StopWatchContainer;
