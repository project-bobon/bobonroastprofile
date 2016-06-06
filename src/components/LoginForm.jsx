import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';
import C from '../constants';

const style = {
  margin: '0 auto',
  marginTop: '80px',
  width: '512px'
};

const LoginForm = ({ authStatus, onLoginBtnClick }) => {
  let content = null;

  if (authStatus !== C.LOGGED_IN) {
    content = (
      <div className="demo-card-wide mdl-card mdl-shadow--2dp" style={ style }>
        <div className="mdl-card__title"
          style={{
            background: "url('https://getmdl.io/assets/demos/welcome_card.jpg') center / cover",
            height: "170px"
          }}
        >
          <h2 className="mdl-card__title-text">Welcome</h2>
        </div>
        <div className="mdl-card__supporting-text">
          To continue, please login as a user
        </div>
        <div className="mdl-card__actions mdl-card--border">
          <a className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect"
            onClick={ (e) => onLoginBtnClick(e, 'google') }
          >
            Login with Google
          </a>
          <a className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect"
            onClick={ (e) => onLoginBtnClick(e, 'facebook') }
          >
            Or Facebook
          </a>
        </div>
      </div>
    );
  }

  return content;
};

LoginForm.propTypes = {
  authStatus: PropTypes.string.isRequired,
  onLoginBtnClick: PropTypes.func.isRequired
};

export default LoginForm;
