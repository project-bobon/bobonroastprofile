import React from 'react';
import C from '../constants';

import Button from './utils/Button';
import Card from './utils/Card';
import CardTitle from './utils/CardTitle';
import CardAction from './utils/CardAction';
import CardContent from './utils/CardContent';

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
        <Button customClass="mdl-button-with-icon mdl-color-text--red-500"
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
        <Button customClass="mdl-button-width-icon mdl-colo--text-red-500"
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
    // <div className="mdl-cell mdl-cell--12-col bobon-stopwatch-container">
    if (this.props.status === C.ROAST_PENDING || this.props.status === C.ROAST_IN_PROGRESS) {
      content = (
        <Card customClass="bobon-util__full-width">
          <CardTitle>
            <div className="bobon-text-with-icon">
              <i className="material-icons">timer</i>
              Timer
            </div>
          </CardTitle>
          <CardContent customClass="bobon-stopwatch-time">
            { this.currentElapsedTime() }
          </CardContent>
          <CardAction>
            { this.startButton() }
            { this.stopButton() }
          </CardAction>
        </Card>
      );
    }

    return content;
  }
}

export default StopWatch;
