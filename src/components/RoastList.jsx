import React from 'react';
import NavigationLink from '../components/utils/NavigationLink';
import moment from 'moment';

import history from '../history';
import C from '../constants';
import Card from './utils/Card';
import CardTitle from './utils/CardTitle';
import CardContent from './utils/CardContent';

class RoastList extends React.Component {

  _roastCard(roast, key) {
    return (
      <div className="mdl-cell mdl-cell--4-col mdl-card mdl-shadow--2dp" key={ key }>
        <div className="mdl-card__title mdl-color--pink-500 mdl-color-text--grey-100">
          { roast.beansName }
        </div>
        <div className="mdl-card__supporting-text">
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

  roastStatus(statusText) {
    switch(statusText) {
      case C.ROAST_PENDING:
        return 'pending';
        break;

      case C.ROAST_COMPLETED:
        return 'completed';
        break;

      case C.ROAST_IN_PROGRESS:
        return 'in progress';
        break;

      default:
        return statusText;
        break;
    }
  }

  lastRoastPointDuration(roastPoints) {
    let duration = null
    if (roastPoints) {
      let roastKey = Object.keys(roastPoints).pop();
      duration = moment(roastPoints[roastKey].elapsed).format('mm:ss');
    }

    return duration;
  }

  roastRows() {
    let content = null;

    if (this.props.roasts) {
      content = Object.keys(this.props.roasts).map(key => {
        let roast = this.props.roasts[key];
        let roastDate = '';

        if (roast.roastStart) {
          roastDate = moment(roast.roastStart).format('DD-MM-YY HH:mm');
        }

        return (
          <tr key={ key }
            onClick={(e) => {
                e.preventDefault();
                history.push(`/roasts/${key}`);
              }}
          >
            <td className="mdl-data-table__cell--non-numeric">{ roast.beansName }</td>
            <td className="mdl-data-table__cell--non-numeric">{ roastDate } </td>
            <td>{ roast.beansMoisture } % </td>
            <td>{ roast.batchSize } kg</td>
            <td>
              <span className="bobon-roast-list-status bobon-roast-list-status-{ roast.status.toLowerCase() }">
                { this.roastStatus(roast.status) }
              </span>
            </td>
            <td>
              { this.lastRoastPointDuration(roast.roastPoints) }
            </td>
            <td>
              { roast.firstCrack ? moment(roast.firstCrack).format('mm:ss') : '-' }
            </td>
            <td><i className="material-icons">favorite_border</i></td>
            <td><i className="material-icons">delete</i></td>
          </tr>
        );
      });
    }

    return content;
  }

  render() {
    if (this.props.roasts) {
      return (
        <div className="mdl-grid">
          <Card customClass="mdl-cell mdl-cell--12-col">

            <CardTitle>
              <div className="bobon-text-with-icon">
                <i className="material-icons">timeline</i>
              My roasts
              </div>
            </CardTitle>

            <table className="mdl-data-table mdl-js-data-table bobon-util__full-width">
              <thead>
                <tr>
                  <th className="mdl-data-table__cell--non-numeric">Bean's name</th>
                  <th className="mdl-data-table__cell--non-numeric">Roast date</th>
                  <th>Moisture</th>
                  <th>Batch Size</th>
                  <th>Status</th>
                  <th>Roast duration</th>
                  <th>First crack</th>
                  <th><i className="material-icons">favorite</i></th>
                  <th><i className="material-icons">delete</i></th>
                </tr>
              </thead>

              <tbody>
                { this.roastRows() }
              </tbody>
            </table>
          </Card>
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
