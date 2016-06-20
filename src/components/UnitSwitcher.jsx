import React from 'react';

class UnitSwitcher extends React.Component {
  render() {
    let switcherId = this.props.customId ? this.props.customId : "bobon-unit-switcher";

    return (
      <div className={
        "bobon-unit-switcher-menu" +
                (this.props.customClass ? ' ' + this.props.customClass : '') }
      >
        <button
          id={ switcherId }
          className="mdl-button mdl-js-ripple-effect mdl-js-button
                     mdl-button-with-icon"
        >
          <i className="material-icons">straighten</i>
          { this.props.tempUnit } - { this.props.weightUnit }
        </button>

        <ul
          className="mdl-menu mdl-menu--bottom-left
                       mdl-js-menu mdl-js-ripple-effect"
          htmlFor={ switcherId }
        >
          <li
            className="mdl-menu__item mdl-button mdl-button-with-icon"
            onClick={ () => {
                this.props.updateUnitSystem(this.props.altUnitSystem, this.props.unitSystem);
              } }
          >
            <i className="material-icons">straighten</i>
            { this.props.altTempUnit } - { this.props.altWeightUnit }
          </li>
        </ul>
      </div>
    );
  }
}

export default UnitSwitcher;
