import React from 'react';

class Button extends React.Component {
  render() {
    return (
      <button
        className={ `mdl-button mdl-js-button mdl-js-ripple-efffect mdl-button--colored ${ this.props.customClass }` }
        onClick={ this.props.onClick }
      >
        { this.props.children }
      </button>
    );
  }
}

export default Button;
