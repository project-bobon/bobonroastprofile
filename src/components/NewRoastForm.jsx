import React, { PropTypes } from 'react';

require('../../scss/roast_form.scss');

class NewRoastForm extends React.Component {

  _submitButton() {
    if (this.props.disabled === true) {
      return(
        <input className="mdl-button mdl-js-button mdl-button--raised
                          mdl-js-ripple-effect mdl-color--grey-400 mdl-color-text--grey-100"
          type="submit"
          value="Create and start roasting"
          disabled
        />
      );
    } else {
      return(
        <input className="mdl-button mdl-js-button mdl-button--raised
                          mdl-js-ripple-effect mdl-color--pink-500 mdl-color-text--grey-100"
          type="submit"
          value="Create and start roasting"
        />
      );
    }
  }

  render() {
    return (
      <div className="demo-card-wide mdl-card mdl-shadow--2dp bobon-main-content">
        <div className="mdl-card__title mdl-color--pink-500 mdl-color-text--grey-100">
          <i className="material-icons">timer</i>
          <h2 className="mdl-card__title-text">
            Start a roast
          </h2>
        </div>

        <form className="bobon-form__new-roast"
          onSubmit={ this.props.onSubmit }
          onChange={ this.props.onChange }
        >
          <div className="bobon-textfield-wrapper">
            <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
              <input className="mdl-textfield__input" type="text" id="roastDate" name="roastDate" value={ this.props.roastDate }/>
              <label className="mdl-textfield__label" htmlFor="roastDate">Roast Date</label>
            </div>
          </div>

          <div className="bobon-textfield-wrapper bobon-util__full-width">
            <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
              <input className="mdl-textfield__input" type="text" id="roastTitle" name="roastTitle" value={ this.props.roastTitle }/>
              <label className="mdl-textfield__label" htmlFor="roastTitle">Roast Title</label>
            </div>
          </div>

          <div className="bobon-textfield-wrapper bobon-util__half-width">
            <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
              <input className="mdl-textfield__input" type="text" id="beansName" name="beansName" value={ this.props.beansName }/>
              <label className="mdl-textfield__label" htmlFor="beansName">Bean's Name</label>
            </div>
          </div>

          <div className="bobon-textfield-wrapper bobon-util__half-width">
            <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
              <input className="mdl-textfield__input" type="number" id="beansMoisture" name="beansMoisture" value={ this.props.beansMoisture }/>
              <label className="mdl-textfield__label" htmlFor="beansMoisture">Bean's Moisture / %</label>
            </div>
          </div>

          <div className="bobon-textfield-wrapper bobon-util__half-width">
            <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
              <input className="mdl-textfield__input" type="number" id="batchSize" name="batchSize" value={ this.props.batchSize }/>
              <label className="mdl-textfield__label" htmlFor="batchSize">Batch Size / g</label>
            </div>
          </div>

          <div className="bobon-textfield-wrapper bobon-util__full-width">
            { this._submitButton() }
          </div>

        </form>
      </div>
    );
  }
}

export default NewRoastForm;
