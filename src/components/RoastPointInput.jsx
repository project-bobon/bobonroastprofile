import React from 'react';
import C from '../constants';

import Button from './utils/Button';

class RoastPointInput extends React.Component {

  componentDidUpdate() {
    // Upgrades all upgradable components (i.e. with 'mdl-js-*' class).
    componentHandler.upgradeDom();
  }

  disabled() {
    if (this.props.status === C.ROAST_IN_PROGRESS) {
      return false;
    } else {
      return true;
    }
  }

  render() {
    if (this.props.status === C.ROAST_PENDING ||
        this.props.status === C.ROAST_IN_PROGRESS) {
      return (
        <form
          action="#"
          onSubmit={ this.props.onSubmit }
          className="bobon-util__full-width"
          disabled={ this.disabled() }
        >
          <input
            type="hidden"
            id="roastId"
            name="roastId"
            value={ this.props.roastId }
          />

          <input
            type="hidden"
            id="roastStart"
            name="roastStart"
            value={ this.props.roastStart }
          />

          <input
            className="bobon-roast-temp-input"
            type="number"
            id="roastTemp"
            name="roastTemp"
            disabled={ this.disabled() }
            autoFocus={ !this.disabled() }
          />

          <input
            type="submit"
            value="Add temperature"
            className="mdl-button mdl-button--colored mdl-js-button
                       mdl-js-ripple-effect"
            disabled={ this.disabled() }
          />
        </form>
      );
    } else {
      return null;
    }
  }
}

export default RoastPointInput;
