import React from 'react';

import C from '../constants';
import Card from './utils/Card';
import CardTitle from './utils/CardTitle';
import CardAction from './utils/CardAction';
import CardContent from './utils/CardContent';

class Settings extends React.Component {
  render() {
    return (
      <Card customClass="mdl-cell mdl-cell--12-col">
        <CardTitle>
          <div className="bobon-text-with-icon">
            <i className="material-icons">settings</i>
            Settings
          </div>
        </CardTitle>
        <CardTitle>
          <div className="bobon-text-with-icon">
            <i className="material-icons">straighten</i>
            Unit System
          </div>
        </CardTitle>
        <CardContent>
          <label
            className="mdl-radio bobon-radio mdl-js-radio mdl-js-ripple-effect"
            htmlFor="unit-system-metric"
          >
            <input
              className="mdl-radio__button"
              id="unit-system-metric"
              name="unit-system"
              type="radio"
              value={ C.METRIC }
            />
            <span className="mdl-radio__label">
              °C - kg
            </span>
          </label>


          <label
            className="mdl-radio bobon-radio mdl-js-radio mdl-js-ripple-effect"
            htmlFor="unit-system-imperial"
          >
            <input
              className="mdl-radio__button"
              id="unit-system-imperial"
              name="unit-system"
              type="radio"
              value={ C.IMPERIAL }
            />
            <span className="mdl-radio__label">
              °F - lbs
            </span>
          </label>

        </CardContent>
      </Card>
    );
  }
}

export default Settings;
