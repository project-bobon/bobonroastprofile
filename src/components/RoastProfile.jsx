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
        <div className="mdl-cell mdl-cell--6-col mdl-shadow--2dp
                        mdl-color--white mdl-grid"
        >
          <StopWatchContainer
            roastId={ this.props.roastId }
            roastStart={ this.props.roastStart }
            status={ this.props.status }
          />
          <Button onClick={() => {
              this.props.addFirstCrack(this.props.roastId, this.props.roastStart);
            } }>
            FIRST CRACK!!!!
          </Button>
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
    } else if (this.props.status === C.ROAST_PENDING ||
               this.props.status === C.ROAST_IN_PROGRESS
    ) {
      content = (
        <div className="mdl-cell mdl-cell--6-col mdl-shadow--2dp
                        mdl-color--white mdl-grid"
        >
          <RoastPointInputContainer
            roastId={ this.props.roastId }
            roastStart={ this.props.roastStart }
            status={ this.props.status }
          />
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

  roastDetails() {
    return(
      <Card customClassName="mdl-cell mdl-cell--6-col">
        <CardTitle>
          <h2 className="mdl-card__title-text">Roast details</h2>
        </CardTitle>
        <CardContent>
          <ul>
            <li>
              <strong>Bean's name:</strong> { this.props.beansName }
            </li>
            <li>
              <strong>Batch size:</strong> { this.props.batchSize } kg
            </li>
            <li>
              <strong>Bean's moisture:</strong> { this.props.beansMoisture } %
            </li>
            <li>
              <strong>Roasting Notes: </strong> <br/>
              <plaintext>
                { this.props.roastNote }
              </plaintext>
            </li>
          </ul>
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
        <div className="mdl-cell mdl-cell--3-col">
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
        <div className="mdl-cell mdl-cell--3-col">
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
          { roast.value + ' - ' + moment(roast.roastStart).format('DD/MM/YY hh:mm') }
        </li>
      );
    });

    let buttonText = "Select a roast";

    if (this.props.compare) {
      buttonText = this.props.compare.beansName + ' - ' + moment(this.props.compare.roastStart).format('DD/MM/YYYY hh:mm');
    }

    return (
      <div>
        Compare:
        <button id="select-compare"
          className="mdl-button mdl-js-button"
        >
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

  render() {
    return (
      <div className="mdl-grid">
        <div className="mdl-cell mdl-cell--12-col mdl-card">
          <div className="mdl-grid mdl-card__title bobon-util__full-width">
            { this.status() }
            { this.roastTime() }
            <div className="mdl-cell mdl-cell--3-col">
              <div className="bobon-text-with-icon">
                <i className="material-icons">shopping_basket</i>
                { this.props.batchSize } kg
              </div>
            </div>

            <div className="mdl-cell mdl-cell--3-col">
              <div className="bobon-text-with-icon">
                <i className="material-icons">opacity</i>
                { this.props.beansMoisture } %
              </div>
            </div>

            <div className="mdl-cell mdl-cell--12-col">
                { this.selectCompare() }
            </div>

          </div>

          <RoastChart
            roastPoints={ this.props.roastPoints }
            beansName={ this.props.beansName }
            roastStart={ this.props.roastStart }
            compare={ this.props.compare }
            firstCrack={ this.props.firstCrack }
          />
        </div>

        { this.stopWatch() }
        { this.tempInput() }
        { this.roastDetails() }
        { this.postRoastNote() }

      </div>
    );
  }
}

export default RoastProfile;
