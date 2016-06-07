import React from 'react';
import StopWatchContainer from '../containers/StopWatchContainer';

class RoastProfile extends React.Component {
  render() {
    return (
      <div className="mdl-grid">
        <div className="mdl-cell mdl-cell--12-col mdl-card mdl-shadow--2dp">
          <div className="mdl-card__title mdl-color--pink-500 mdl-color-text--grey-100">
            <i className="material-icons">timer</i>
            <h2 className="mdl-card__title-text">
              { this.props.beansName }
            </h2>
          </div>
          <div class="mdl-card__supporting-text mdl-color--grey-900"
            style={ {
                height: '400px',
                width: '100%',
                background: '#000'
              } }
          >
          </div>
        </div>

        <div className="mdl-cell mdl-cell--4-col mdl-grid mdl-shadow--2dp">
          <div className="mdl-cell mdl-cell--12-col">
            <h3>{ this.props.beansName }</h3>
            { this.props.roastNote }
          </div>
          <div className="mdl-cell mdl-cell--6-col mdl-color-text--green-500">
            <i className="material-icons">shopping_basket</i>
            { this.props.batchSize } kg
          </div>

          <div className="mdl-cell mdl-cell--6-col mdl-color-text--blue-500">
            <i className="material-icons">opacity</i>
            { this.props.beansMoisture } %
          </div>
        </div>


        <div className="mdl-cell mdl-cell--8-col mdl-shadow--2dp">
          <StopWatchContainer
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
