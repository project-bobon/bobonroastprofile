import React from 'react';
import moment from 'moment';
import C from '../constants';

class StopWatch extends React.Component {
  render() {
    if (this.props.status === C.ROAST_PENDING || this.props.status === C.ROAST_IN_PROGRESS) {
      let t = this.props.elapsed;
      let fsec = (t / 100) % 10 << 0;
      let min = (t / 1000 / 60) << 0;
      let sec = (t / 1000) % 60 << 0;

      if (min < 10) {
        min = '0' + min;
      }
      if (min < 10) {
        sec = '0' + sec;
      }

      return (
        <div className="mdl-grid mdl-cell mdl-cell--12-col">
          <div className="mdl-card mdl-cell mdl-cell--6-col">
            <div className="mdl-card__title mdl-color--indigo-500 mdl-color-text--white bobon-stopwatch-time">
              { `${min} : ${sec} : ${fsec}0` }
            </div>
          </div>
          <div className="mdl-cell mdl-cell--2-col">
            <button className="mdl-button mdl-js-button mdl-button--fab mdl-button--colored bobon-start-stop-button"
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

            <button className="mdl-button mdl-js-button mdl-button--fab mdl-button--colored bobon-start-stop-button"
              onClick={ () => {
                  this.props.stopStopWatch(this.props.roastId);
                } }
            >
              STOP
            </button>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default StopWatch;
