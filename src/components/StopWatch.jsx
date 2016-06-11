import React from 'react';
import C from '../constants';

import Button from './utils/Button';

require('../../scss/stopwatch.scss');

class StopWatch extends React.Component {

  componentWillMount() {
    // If already in progress, continue stopwatch.
    if (this.props.status === C.ROAST_IN_PROGRESS && !this.props.tick) {
      this.props.resumeStopWatch(
        this.props.roastId,
        this.props.roastStart,
        setInterval(() => {
          this.props.tickStopWatch(this.props.roastStart);
        }, 1000)
      );
    }
  }

  startButton() {
    let content = null;

    if (this.props.status === C.ROAST_PENDING) {
      content = (
        <Button customClass="bobon-stopwatch-button"
          onClick={ () => {
              let roastStart = Date.now();
              this.props.startStopWatch(
                this.props.roastId,
                roastStart,
                setInterval(() => {
                  this.props.tickStopWatch(roastStart);
                }, 1000)
              );
            } }
        >
          START
        </Button>
      );
    }

    return content;
  }

  stopButton() {
    let content = null;

    if (this.props.status === C.ROAST_IN_PROGRESS) {
      content = (
        <button className="bobon-stopwatch-button mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect "
          onClick={ () => {
              this.props.stopStopWatch(
                this.props.roastId,
                this.props.tick
              );
            } }
        >
          STOP
        </button>
      );
    }

    return content;
  }

  currentElapsedTime() {
    let t = this.props.elapsed;
    let min = (t / 1000 / 60) << 0;
    let sec = (t / 1000) % 60 << 0;

    if (min < 10) {
      min = '0' + min;
    }

    if (sec < 10) {
      sec = '0' + sec;
    }

    return `${ min } : ${ sec }`;
  }

  render() {
    let content = null;

    if (this.props.status === C.ROAST_PENDING || this.props.status === C.ROAST_IN_PROGRESS) {
      content = (
        <div className="mdl-cell mdl-cell--12-col bobon-stopwatch">
          <div className="bobon-stopwatch-time">
            { this.currentElapsedTime() }
          </div>

          { this.startButton() }
          { this.stopButton() }
        </div>
      );
    }

    return content;
  }
}

export default StopWatch;
