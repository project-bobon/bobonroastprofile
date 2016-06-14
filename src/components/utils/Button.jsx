import React from 'react';

class Button extends React.Component {

  render() {
    if (this.props.disabled === true) {

      return (
        <button
          className={ `mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--colored ${ this.props.customClass }` }
          id={ this.props.id ? this.props.id : '' }
          disabled
        >
          { this.props.children }
        </button>
      );

    } else {

      return (
        <button
          className={ `mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--colored ${ this.props.customClass }` }
          onClick={ this.props.onClick }
          id={ this.props.id ? this.props.id : '' }
        >
          { this.props.children }
        </button>
      );

    }
  }
}

export default Button;
