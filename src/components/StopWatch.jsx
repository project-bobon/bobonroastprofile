import React from 'react';
import C from '../constants';

import Button from './utils/Button';

require('../../scss/stopwatch.scss');

class StopWatch extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      elapsed: 0
    };
  }

  componentWillMount() {
    // If already in progress, continue stopwatch.
    if (this.props.status === C.ROAST_IN_PROGRESS && !this.props.tick) {
      this.props.resumeStopWatch(
        this.props.roastId,
        this.props.roastStart,
        setInterval(() => {
          this.setState({
            elapsed: Date.now() - this.props.roastStart
          });
        }, 100)
      );
    }
  }

  startButton() {
    let content = null;

    if (this.props.status === C.ROAST_PENDING) {
      content = (
        <Button customClass="bobon-stopwatch-button mdl-button-with-icon"
          onClick={ () => {
              let roastStart = Date.now();
              this.props.startStopWatch(
                this.props.roastId,
                roastStart,
                setInterval(() => {
                  this.setState({
                    elapsed: Date.now() - this.props.roastStart
                  });
                }, 100)
              );
            } }
        >
          <i className="material-icons">fiber_manual_record</i>
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
        <Button customClass="bobon-stopwatch-button mdl-button-width-icon"
          onClick={ () => {
              this.props.stopStopWatch(
                this.props.roastId,
                this.props.tick
              );
            } }
        >
          <i className="material-icons">stop</i>
          STOP
        </Button>
      );
    }

    return content;
  }

  currentElapsedTime() {
    let t = this.state.elapsed;
    let min = (t / 1000 / 60) << 0;
    let sec = (t / 1000) % 60 << 0;
    let fsec = (t % 1000) / 100  << 0;

    if (min < 10) {
      min = '0' + min;
    }

    if (sec < 10) {
      sec = '0' + sec;
    }

    return `${ min } : ${ sec } : ${ fsec }`;
  }

  render() {
    let content = null;

    if (this.props.status === C.ROAST_PENDING || this.props.status === C.ROAST_IN_PROGRESS) {
      content = (
        <div className="mdl-cell mdl-cell--12-col bobon-stopwatch-container">
          <div className="bobon-stopwatch">
            <div className="bobon-stopwatch-time">
              { this.currentElapsedTime() }
            </div>

            { this.startButton() }
            { this.stopButton() }
          </div>
        </div>
      );
    }

    return content;
  }
}

export default StopWatch;
