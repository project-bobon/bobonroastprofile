import React from 'react';
import moment from 'moment';
import C from '../constants';

require('../../scss/stopwatch.scss');

class StopWatch extends React.Component {

  startButton() {
    let content = null;

    if (this.props.status === C.ROAST_PENDING) {
      content = (
        <button className="bobon-stopwatch-button mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect mdl-color--red-600 mdl-color-text--white"
          onClick={ () => {
              let roastStart = Date.now();
              this.props.startStopWatch(
                this.props.roastId,
                roastStart,
                setInterval(() => {
                  this.props.tickStopWatch(roastStart);
                }, 100)
              );
            } }
        >
          START
        </button>
      );
    }

    return content;
  }

  stopButton() {
    let content = null;

    if (this.props.status === C.ROAST_IN_PROGRESS) {
      content = (
        <button className="bobon-stopwatch-button mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect mdl-color--red-600 mdl-color-text--white"
          onClick={ () => {
              this.props.stopStopWatch(this.props.roastId);
            } }
        >
          STOP
        </button>
      );
    }

    return content;
  }

  render() {
    let content = null;

    if (this.props.status === C.ROAST_PENDING || this.props.status === C.ROAST_IN_PROGRESS) {
      let t = this.props.elapsed;
      let fsec = (t / 100) % 10 << 0;
      let min = (t / 1000 / 60) << 0;
      let sec = (t / 1000) % 60 << 0;

      if (min < 10) {
        min = '0' + min;
      }

      if (sec < 10) {
        sec = '0' + sec;
      }

      content = (
        <div className="mdl-cell mdl-cell--12-col bobon-stopwatch">
          <div className="bobon-stopwatch-time">
            { `${min} : ${sec} : ${fsec}0` }
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
