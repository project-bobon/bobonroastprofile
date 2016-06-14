import React from 'react';
import NavigationLink from '../components/utils/NavigationLink';
import moment from 'moment';

class RoastList extends React.Component {

  _roastCard(roast, key) {
    return (
      <div className="mdl-cell mdl-cell--4-col mdl-card mdl-shadow--2dp" key={ key }>
        <div className="mdl-card__title mdl-color--pink-500 mdl-color-text--grey-100">
          { roast.beansName }
        </div>
        <div class="mdl-card__supporting-text">
          <div className="mdl-grid">
            <div className="mdl-cell mdl-cell--12-col">
              { moment(roast.roastStart).format('DD/MM/YY HH:mm') }
            </div>
            <div className="mdl-cell mdl-cell--6-col">
              <i className="material-icons">shopping_basket</i>
              { roast.batchSize } kg
            </div>
            <div className="mdl-cell mdl-cell--6-col">
              <i className="material-icons">opacity</i>
              { roast.beansMoisture } %
            </div>
          </div>
        </div>
        <NavigationLink path={ `roasts/${key}` }>
          View Roast
        </NavigationLink>
        <div onClick={ () => { this.props.removeRoast(key); } }>
          Remove Roast
        </div>
      </div>
    );
  }

  render() {
    if (this.props.roasts) {
      return (
        <div className="mdl-grid">
          { Object.keys(this.props.roasts).map(k => {
              let roast = this.props.roasts[k];
              return this._roastCard(this.props.roasts[k], k);
            })
          }
        </div>
      );
    } else {
      return (
        <div className="mdl-card mdl-shadow--2dp bobon-util__half-width">
          <div className="mdl-card__title">
            <h2 className="mdl-card__title-text">Welcome to Bobon Roast Profiles</h2>
          </div>
          <div className="mdl-card__supporting-text">
            Seems like you have not had any roast profile yet! Get some grean beans, start roasting and record your profiles!
          </div>
          <div className="mdl-card__actions mdl-card--border">
            <NavigationLink className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect"
              path="new"
            >
              Start recording!
            </NavigationLink>
          </div>
          <div className="mdl-card__menu">
            <button className="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect">
              <i className="material-icons">share</i>
            </button>
          </div>
        </div>
      );
    }
  }
}

export default RoastList;
