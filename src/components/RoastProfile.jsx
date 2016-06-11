import React from 'react';
import StopWatchContainer from '../containers/StopWatchContainer';
import RoastPointInputContainer from '../containers/RoastPointInputContainer';
import PostRoastNoteFormContainer from '../containers/PostRoastNoteFormContainer';
import RoastChart from './RoastChart';
import C from '../constants';

class RoastProfile extends React.Component {
  stopWatch() {
    let content = null;

    if (this.props.status === C.ROAST_PENDING || this.props.status === C.ROAST_IN_PROGRESS) {
      content = (
        <div className="mdl-cell mdl-cell--6-col mdl-shadow--2dp mdl-color--white mdl-grid">
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

    if (this.props.status === C.ROAST_PENDING || this.props.status === C.ROAST_IN_PROGRESS) {
      content = (
        <div className="mdl-cell mdl-cell--6-col mdl-shadow--2dp mdl-color--white mdl-grid">
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

  render() {
    return (
      <div className="mdl-grid">
        <div className="mdl-cell mdl-cell--12-col mdl-card mdl-shadow--2dp">

          <div className="mdl-grid mdl-card__title mdl-color--red-900 mdl-color-text--grey-100 bobon-util__full-width">
            <div className="mdl-cell mdl-cell--3-col mdl-color-text--grey-100">
              <div className="bobon-text-with-icon">
                <i className="material-icons">event</i>
                { this.props.roastStart }
              </div>
            </div>
            <div className="mdl-cell mdl-cell--3-col mdl-color-text--grey-100">
              <div className="bobon-text-with-icon">
                <i className="material-icons">shopping_basket</i>
                { this.props.batchSize } kg
              </div>
            </div>
            <div className="mdl-cell mdl-cell--3-col mdl-color-text--grey-100">
              <div className="bobon-text-with-icon">
                <i className="material-icons">opacity</i>
                { this.props.beansMoisture } %
              </div>
            </div>
          </div>
          <div class="mdl-card__supporting-text mdl-color--grey-900">
            <RoastChart roastPoints={ this.props.roastPoints }/>
          </div>
        </div>

        { this.stopWatch() }
        { this.tempInput() }

        <div className="mdl-card mdl-grid mdl-cell mdl-cell--12-col mdl-shadow--2dp">
          <PostRoastNoteFormContainer roastId={ this.props.roastId }/>
        </div>

      </div>
    );
  }
}

export default RoastProfile;
