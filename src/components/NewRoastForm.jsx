import React, { PropTypes } from 'react';
import Spinner from './Spinner';
import history from '../history';

import Card from './utils/Card';
import CardTitle from './utils/CardTitle';
import Button from './utils/Button';

require('../../scss/roast_form.scss');

class NewRoastForm extends React.Component {
  cancelButton() {
    return(
      <Button
        customClass="mdl-color--teal-500 mdl-color-text--grey-100"
        onClick={ (e) => {
            e.preventDefault();
            history.goBack();
          } }
        style={ {
            marginLeft: '20px'
          } }
      >
        Cancel
      </Button>
    );
  }

  submitButton() {
    if (this.props.disabled === true) {
      return(
        <input
          className="mdl-button mdl-js-button mdl-js-ripple-effect
                     mdl-color--grey-400 mdl-color-text--grey-100"
          type="submit"
          value="Create and start roasting"
          disabled
        />
      );
    } else {
      return(
        <input
          className="mdl-button mdl-js-button mdl-js-ripple-effect
                     mdl-color--red-500 mdl-color-text--grey-100"
          type="submit"
          value="Create and start roasting"
        />
      );
    }
  }

  render() {
    if (this.props.processing) {
      return <Spinner/>;
    } else {
      return (
        <div className="mdl-grid">
          <Card customClass="mdl-cell mdl-cell--12-col">

            <CardTitle>
              <div className="bobon-text-with-icon">
                <i className="material-icons">timer</i>
                Create new roast
              </div>
            </CardTitle>

            <form className="bobon-form__new-roast" onSubmit={ this.props.onSubmit } onChange={ this.props.onChange } >

              <div className="bobon-textfield-wrapper bobon-util__full-width">
                <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                  <input className="mdl-textfield__input" type="text" id="beansName" name="beansName" value={ this.props.beansName }/>
                  <label className="mdl-textfield__label" htmlFor="beansName">Bean's Name</label>
                </div>
              </div>

              <div className="bobon-textfield-wrapper bobon-util__half-width">
                <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                  <input className="mdl-textfield__input" type="number" step="any" id="beansMoisture" name="beansMoisture" value={ this.props.beansMoisture }/>
                  <label className="mdl-textfield__label" htmlFor="beansMoisture">Bean's Moisture (%)</label>
                </div>
              </div>

              <div className="bobon-textfield-wrapper bobon-util__half-width">
                <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                  <input className="mdl-textfield__input" type="number" step="any" id="batchSize" name="batchSize" value={ this.props.batchSize }/>
                  <label className="mdl-textfield__label" htmlFor="batchSize">Batch Size (kg)</label>
                </div>
              </div>

              <div className="bobon-textfield-wrapper bobon-util__half-width">
                <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                  <input className="mdl-textfield__input" type="number" step="any" id="initialTemp" name="initialTemp" value={ this.props.initialTemp }/>
                  <label className="mdl-textfield__label" htmlFor="batchSize">Initial Temperature (°C)</label>
                </div>
              </div>

              <div className="bobon-textfield-wrapper bobon-util__full-width">
                <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                  <textarea className="mdl-textfield__input" type="text" id="roastNote" name="roastNote" rows="5" value={ this.props.roastNote }></textarea>
                  <label className="mdl-textfield__label" htmlFor="roastNote">Roasting Notes</label>
                </div>
              </div>

              <input type="hidden" name="uid" id="uid" defaultValue={ this.props.uid } />

              <div className="bobon-textfield-wrapper bobon-util__full-width">
                { this.submitButton() }
                { this.cancelButton() }
              </div>
            </form>
          </Card>
        </div>
      );
    }
  }
}

export default NewRoastForm;
