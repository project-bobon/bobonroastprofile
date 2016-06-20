import React from 'react';

class Radio extends React.Component {

  shouldComponentUpdate(nextProps) {
    return nextProps.checked !== this.props.checked;
  }

  radioInput() {
    let content = null;

    if (this.props.checked === true) {
      content = <input
                  className="mdl-radio__button"
                  id={ this.props.htmlFor }
                  name={ this.props.name }
                  type="radio"
                  value={ this.props.value }
                  checked
                />
    } else {
      content = <input
                  className="mdl-radio__button"
                  id={ this.props.htmlFor }
                  name={ this.props.name }
                  type="radio"
                  value={ this.props.value }
                />
    }

    return content;
  }

  render() {
    return (
      <label
        className={ `mdl-radio bobon-radio mdl-js-radio mdl-js-ripple-effect ${ this.props.customClass ? this.props.customClass : '' }` }
        htmlFor={ this.props.htmlFor }
      >
        { this.radioInput() }
        <span className="mdl-radio__label">
          { this.props.label }
        </span>
      </label>
    );
  }
}

export default Radio ;
