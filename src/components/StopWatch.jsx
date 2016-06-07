import React from 'react';
import moment from 'moment';

class StopWatch extends React.Component {
  render() {
    let t = this.props.elapsed;
    let fsec = (t / 100) % 10 << 0;
    let min = (t / 1000 / 60) << 0;
    let sec = (t / 1000) % 60 << 0;

    let roastStart = Date.now();

    return (
      <div>
        <div>{ `${min} : ${sec} : ${fsec}` }</div>
        <div onClick={ () => {
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
        </div>

        <div
          onClick={ () => {
              this.props.stopStopWatch(this.props.roastId);
            } }
        >
          STOP
        </div>
      </div>
    );
  }
}

export default StopWatch;
