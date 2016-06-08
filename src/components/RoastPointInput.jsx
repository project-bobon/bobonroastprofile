import React from 'react';
import C from '../constants';

class RoastPointInput extends React.Component {

  componentDidUpdate() {
    // Upgrades all upgradable components (i.e. with 'mdl-js-*' class).
    componentHandler.upgradeDom();
  }

  render() {
    if (this.props.status === C.ROAST_PENDING || this.props.status === C.ROAST_IN_PROGRESS) {
      return (
        <form action="#" onSubmit={ this.props.onSubmit } className="bobon-roast-temp-form mdl-cell mdl-cel--12-col">
          <input type="hidden" id="roastId" name="roastId" value={ this.props.roastId }/>
          <input type="hidden" id="roastStart" name="roastStart" value={ this.props.roastStart }/>
            <input className="bobon-roast-temp-input" type="number" id="roastTemp" name="roastTemp"/>

          <input type="submit" value="add"
            className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect mdl-color--red-600 mdl-color-text--white"
          />
        </form>
      );
    } else {
      return null;
    }
  }
}

export default RoastPointInput;
