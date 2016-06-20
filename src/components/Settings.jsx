import React from 'react';

import C from '../constants';
import Card from './utils/Card';
import CardTitle from './utils/CardTitle';
import CardAction from './utils/CardAction';
import CardContent from './utils/CardContent';
import Radio from './utils/Radio';

class Settings extends React.Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.unitSystem !== this.props.unitSystem;
  }

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

          <form onChange={ e => {
              this.props.onChangeUnitSystem(e, this.props.unitSystem);
            } }
          >
            <Radio
              htmlFor="unit-system-metric"
              name="unitSystem"
              value={ C.METRIC }
              label="°C - kg"
              checked={ this.props.unitSystem === C.METRIC }
            />

            <Radio
              htmlFor="unit-system-imperial"
              name="unitSystem"
              value={ C.IMPERIAL }
              label="°F - kg"
              checked={ this.props.unitSystem === C.IMPERIAL }
            />
          </form>

        </CardContent>
      </Card>
    );
  }
}

export default Settings;
