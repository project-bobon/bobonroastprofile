import React from 'react';
import moment from 'moment';
import C from '../constants';

class StopWatch extends React.Component {
 
  startButton() {
    return(
      <button className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect"
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

  stopButton() {
    return(
      <button className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect"
        onClick={ () => {
            this.props.stopStopWatch(this.props.roastId);
          } }
      >
        STOP
      </button>
    );
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
        <div className="mdl-card mdl-cell mdl-cell--12-col">
            <div className="mdl-card__title bobon-stopwatch-time">
              { `${min} : ${sec} : ${fsec}0` }
            </div>

            <div className="mdl-card__actions mdl-card--border">
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
