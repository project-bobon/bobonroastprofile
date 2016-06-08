import React from 'react';
import StopWatchContainer from '../containers/StopWatchContainer';
import RoastPointInputContainer from '../containers/RoastPointInputContainer';
import RoastChart from './RoastChart';
import moment from 'moment';

class RoastProfile extends React.Component {
  render() {
    return (
      <div className="mdl-grid">
        <div className="mdl-cell mdl-cell--12-col mdl-card mdl-shadow--2dp">
          <div className="mdl-grid mdl-card__title mdl-color--red-900 mdl-color-text--grey-100 bobon-util__full-width">
            <div className="mdl-cell mdl-cell--4-col mdl-color-text--grey-100">
              <i className="material-icons">event</i>
              { moment(this.props.roastStart).format('MMMM Do YYYY, h:mm:ss a') }
            </div>
            <div className="mdl-cell mdl-cell--4-col mdl-color-text--grey-100">
              <i className="material-icons">shopping_basket</i>
              { this.props.batchSize } kg
            </div>
            <div className="mdl-cell mdl-cell--4-col mdl-color-text--grey-100">
              <i className="material-icons">opacity</i>
              { this.props.beansMoisture } %
            </div>
          </div>
          <div class="mdl-card__supporting-text mdl-color--grey-900">
            <RoastChart roastPoints={ this.props.roastPoints }/>
          </div>
        </div>


        <div className="mdl-cell mdl-cell--6-col mdl-shadow--2dp mdl-color--white mdl-grid">
          <StopWatchContainer
            roastId={ this.props.roastId }
            roastStart={ this.props.roastStart }
            status={ this.props.status }
          />
        </div>

        <div className="mdl-cell mdl-cell--6-col mdl-shadow--2dp mdl-color--white mdl-grid">
          <RoastPointInputContainer
            roastId={ this.props.roastId }
            roastStart={ this.props.roastStart }
            status={ this.props.status }
          />
        </div>

      </div>
    );
  }
}

export default RoastProfile;
