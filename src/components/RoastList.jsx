import React from 'react';
import NavigationLink from '../components/utils/NavigationLink';
import moment from 'moment';

import history from '../history';
import C from '../constants';
import Card from './utils/Card';
import CardTitle from './utils/CardTitle';
import CardContent from './utils/CardContent';
import CardAction from './utils/CardAction';
import Button from './utils/Button';

class RoastList extends React.Component {

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
    let duration = null;
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
            <td className="bobon-table-cell--beans-name mdl-data-table__cell--non-numeric">
              <strong>{ roast.beansName }</strong>
            </td>

            <td className="bobon-table-cell--hidden-mobile mdl-data-table__cell--non-numeric">
              <div className={ `bobon-text-with-icon bobon-roast-status--${ roast.status.toLowerCase() }` }>
                <i className="material-icons">fiber_manual_record</i>
                { this.roastStatus(roast.status) }
              </div>
            </td>

            <td className="mdl-data-table__cell--non-numeric">{ roastDate } </td>

            <td className="bobon-table-cell--hidden-mobile ">{ roast.beansMoisture } % </td>

            <td className="bobon-table-cell--hidden-mobile">{ roast.batchSize } kg</td>

            <td className="bobon-table-cell--hidden-mobile ">
              { this.lastRoastPointDuration(roast.roastPoints) }
            </td>

            <td className="bobon-table-cell--hidden-mobile ">
              { roast.firstCrack ? moment(roast.firstCrack).format('mm:ss') : '-' }
            </td>

            <td className="mdl-color-text--amber-500 mdl-data-table__cell--non-numeric">
              <button className="mdl-button mdl-js-button mdl-button--icon mdl-js-ripple-effect"
                onClick={ (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    this.props.removeRoast(key, roast.beansName, roast.roastStart);
                  } }
              >
                <i className="material-icons">delete</i>
              </button>
            </td>
          </tr>
        );
      });
    }

    return content;
  }

  render() {
    let content = null;
    if (this.props.roasts && Object.keys(this.props.roasts).length > 0) {
      content = (
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
                  <th className="bobon-table-cell--beans-name mdl-data-table__cell--non-numeric">Bean's name</th>
                  <th className="bobon-table-cell--hidden-mobile mdl-data-table__cell--non-numeric">Status</th>
                  <th className="mdl-data-table__cell--non-numeric">Roast date</th>
                  <th className="bobon-table-cell--hidden-mobile ">Moisture</th>
                  <th className="bobon-table-cell--hidden-mobile">Batch Size</th>
                  <th className="bobon-table-cell--hidden-mobile">Duration</th>
                  <th className="bobon-table-cell--hidden-mobile">1st crack</th>
                  <th className="mdl-data-table__cell--non-numeric">Del</th>
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
      content = (
        <div className="mdl-grid">
          <Card customClass="mdl-cell mdl-cell--12-col">

            <CardTitle>
              <div className="bobon-text-with-icon">
                <i className="material-icons">timeline</i>
                You have not recorded any roast profile, yet.
              </div>
            </CardTitle>

            <CardContent>
              <p></p>
              <p>Scale some green beans, start roasting and record your first profile!</p>
            </CardContent>

            <CardAction>
              <Button customClass="mdl-button-with-icon mdl-color-text--red-500"
                onClick={ () => {
                    history.push('/new');
                  } }
              >
                <i className="material-icons">whatshot</i>
                Create a new roast
              </Button>
            </CardAction>
          </Card>

        </div>
      );
    }

    return content;
  }
}

export default RoastList;
