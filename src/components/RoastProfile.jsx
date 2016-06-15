import React from 'react';
import moment from 'moment';

import Button from './utils/Button';
import C from '../constants';
import Card from './utils/Card';
import CardAction from './utils/CardAction';
import CardContent from './utils/CardContent';
import CardTitle from './utils/CardTitle';
import PostRoastNoteFormContainer from '../containers/PostRoastNoteFormContainer';
import RoastChart from './RoastChart';
import RoastPointInputContainer from '../containers/RoastPointInputContainer';
import StopWatchContainer from '../containers/StopWatchContainer';
import RoastPointsListContainer from '../containers/RoastPointsListContainer';

class RoastProfile extends React.Component {

  componentDidUpdate() {
    componentHandler.upgradeDom();
  }

  stopWatch() {
    let content = null;

    if (this.props.roastInProgress &&
        this.props.roastInProgress !== this.props.roastId
    ) {
      content = null;
    } else if (this.props.status === C.ROAST_PENDING ||
               this.props.status === C.ROAST_IN_PROGRESS
    ) {
      content = (
        <div className="mdl-cell mdl-cell--12-col">
          <StopWatchContainer
            roastId={ this.props.roastId }
            roastStart={ this.props.roastStart }
            status={ this.props.status }
          />
        </div>
      );
    }

    return content;
  }

  tempInput() {
    let content = null;
    if (this.props.roastInProgress &&
        this.props.roastInProgress !== this.props.roastId
    ) {
      content = null;
    } else if (
      this.props.status === C.ROAST_PENDING ||
      this.props.status === C.ROAST_IN_PROGRESS
    ) {
      content = (
        <div className="mdl-cell mdl-cell--12-col">
          <Card customClass="bobon-util__full-width">
            <CardTitle>
              <div className="bobon-text-with-icon">
                <i className="material-icons">add_circle</i>
                Temperature input
              </div>
            </CardTitle>

            <RoastPointInputContainer
              roastId={ this.props.roastId }
              roastStart={ this.props.roastStart }
              status={ this.props.status }
              addFirstCrack={ this.props.addFirstCrack }
              undoTemperature={ this.props.undoTemperature }
            />

            <CardAction>
              <Button customClass="mdl-button-with-icon"
                onClick={() => {
                    this.props.undoLastTemperature(this.props.roastId, this.props.roastPoints);
                  } }
                disabled={ this.props.status === C.ROAST_IN_PROGRESS && Object.keys(this.props.roastPoints).length > 1 ? false : true }
              >
                <i className="material-icons">replay</i>
                Undo
              </Button>

              <Button customClass="mdl-button-with-icon mdl-color-text--red-500"
                onClick={() => {
                    this.props.addFirstCrack(this.props.roastId, this.props.roastStart);
                  } }
                disabled={ this.props.status === C.ROAST_IN_PROGRESS ? false : true }
              >
                <i className="material-icons">whatshot</i>
                First Crack!
              </Button>
            </CardAction>
          </Card>
        </div>
      );
    }

    return content;
  }

  postRoastNote() {
    let content = null;

    if (this.props.status === C.ROAST_COMPLETED) {
      content = (
        <PostRoastNoteFormContainer
          roastId={ this.props.roastId }
          status={ this.props.status }
        />
      );
    }

    return content;
  }

  roastNote() {
    return(
      <Card customClass="mdl-cell mdl-cell--6-col mdl-cell--12-col-tablet">
        <CardTitle>
          <div className="bobon-text-with-icon">
            <i className="material-icons">description</i>
            Roasting Notes
          </div>
        </CardTitle>
        <CardContent>
          <plaintext>
            { this.props.roastNote }
          </plaintext>
        </CardContent>
      </Card>
    );
  }

  roastPointsList() {
    return (
      <Card customClassName="mdl-cell mdl-cell--6-col">
        <CardTitle>
          <h2 className="mdl-card__title-text">Temperature points</h2>
        </CardTitle>
        <CardContent>
          <RoastPointsListContainer roastId={ this.props.roastId }/>
        </CardContent>
      </Card>
    );
  }

  magicButton() {
    return (
      <button onClick={ () => {
          let uid = C.FIREBASE.auth().currentUser.uid;
          let ref = C.FIREBASE.database().ref(`roasts/${uid}/${this.props.roastId}/status`);

          ref.set(C.ROAST_PENDING);
        } }
      >
        Magic button (PENDING)
      </button>
    );
  }

  roastTime() {
    if (this.props.status === C.ROAST_PENDING) {
      return null;
    } else {
      return (
        <div className="mdl-cell mdl-cell--6-col">
          <div className="bobon-text-with-icon">
            <i className="material-icons">event</i>
            { moment(this.props.roastStart).format('DD/MM/YYYY - h:mm') }
          </div>
        </div>
      );
    }
  }

  status() {
    let content = null;
    let statusText = '';

    if (this.props.status) {

      switch (this.props.status) {
        case C.ROAST_PENDING:
          statusText = 'Pending';
          break;

        case C.ROAST_IN_PROGRESS:
          statusText = 'In progress';
          break;

        default:
          statusText = 'Completed';
          break;
      }

      content = (
        <div className="mdl-cell mdl-cell--6-col">
          <div className={ `bobon-text-with-icon bobon-roast-status--${ this.props.status.toLowerCase() }` }>
            <i className="material-icons">fiber_manual_record</i>
            { statusText }
          </div>
        </div>
      );
    }

    return content;
  }

  selectCompare() {
    if (typeof this.props.roastIds === 'undefined') {
      return null;
    }

    let roastIdList = this.props.roastIds.map(roast => {
      return (
        <li className="mdl-menu__item"
          onClick={ () => {
              this.props.compareRoasts(this.props.roastId, roast.id);
            } }
        >
          { '[' + moment(roast.roastStart).format('DD/MM/YYYY HH:mm') + '] ' + roast.value }
        </li>
      );
    });

    let buttonText = "Compare with a previous roast profile";

    if (this.props.compare) {
      buttonText = '[' + moment(this.props.compare.roastStart).format('DD/MM/YYYY HH:mm') + '] ' + this.props.compare.beansName;
    }

    return (
      <div className="mdl-cell mdl-cell--12-col mdl-cell--12-col-tablet">
        <button id="select-compare"
          className="mdl-button mdl-js-button mdl-button-colored mdl-color--indigo-500 mdl-color-text--white mdl-button-with-icon"
        >
          <i className="material-icons">assessment</i>
          { buttonText }
        </button>
        <ul className="mdl-menu mdl-js-menu mdl-js-ripple-effect"
          htmlFor="select-compare"
        >
          { roastIdList }
        </ul>
      </div>
    );
  }

  lastRoastPointId() {
    if (this.props.roastPoints) {
      return Object.keys(this.props.roastPoints).pop();
    } else {
      return null;
    }
  }

  roastDuration() {
    let min = '00';
    let sec = '00';

    if (this.props.hasOwnProperty('roastPoints')) {
      let duration = this.props.roastPoints[this.lastRoastPointId()].elapsed;
      min = duration / 60000 << 0;
      sec = duration / 1000 % 60 << 0;

      if (min < 10) {
        min = '0' + min;
      }

      if (sec < 10) {
        sec = '0' + sec;
      }
    }

    return `${min}:${sec}`;
  }

  render() {
    return (
      <div className="mdl-grid">

        <div className="bobon-chart-title mdl-cell mdl-cell--12-col">
          <div className="bobon-text-with-icon">
            <i className="material-icons">assessment</i>
            { this.props.beansName }
          </div>
        </div>


        <div className="mdl-cell mdl-cell--8-col mdl-cell--12-col-tablet">
          <RoastChart
            roastPoints={ this.props.roastPoints }
            beansName={ this.props.beansName }
            roastStart={ this.props.roastStart }
            compare={ this.props.compare }
            firstCrack={ this.props.firstCrack }
          />
        </div>

        <div className="mdl-cell mdl-cel--4-col mdl-grid mdl-cell--12-col-tablet
                        bobon-roast-profile-sidebar"
        >
          { this.selectCompare() }
          { this.stopWatch() }
          { this.tempInput() }

          <Card customClass="mdl-cell mdl-cell--12-col">
            <CardTitle>
              <div className="bobon-text-with-icon">
                <i className="material-icons">playlist_add_check</i>
                Roast details
              </div>
            </CardTitle>
            <CardContent customClass="mdl-grid bobon-util__full-width">
              <div className="mdl-cell mdl-cell--6-col">
                <div className="bobon-text-with-icon">
                  <i className="material-icons">label</i>
                  { this.props.beansName }
                </div>
              </div>

              { this.status() }
              { this.roastTime() }

              <div className="mdl-cell mdl-cell--6-col">
                <div className="bobon-text-with-icon">
                  <i className="material-icons">alarm</i>
                  { this.roastDuration() }
                </div>
              </div>

              <div className="mdl-cell mdl-cell--6-col">
                <div className="bobon-text-with-icon">
                  <i className="material-icons">shopping_basket</i>
                  { this.props.batchSize } kg
                </div>
              </div>

              <div className="mdl-cell mdl-cell--6-col">
                <div className="bobon-text-with-icon">
                  <i className="material-icons">opacity</i>
                  { this.props.beansMoisture } %
                </div>
              </div>
            </CardContent>
          </Card>

          { this.roastNote() }
          { this.postRoastNote() }

        </div>
      </div>
    );
  }
}

export default RoastProfile;
