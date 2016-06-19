import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';

import Button from './utils/Button';
import C from '../constants';
import Card from './utils/Card';
import CardAction from './utils/CardAction';
import CardContent from './utils/CardContent';
import CardTitle from './utils/CardTitle';

const LoginForm = ({ authStatus, onLoginBtnClick }) => {
  let content = null;

  if (authStatus !== C.LOGGED_IN) {
    content = (
      <Card customClass="bobon-login-form mdl-shadow--2dp">
        <CardTitle>
          <div className="mdl-typography--display-2 mdl-typography--font-thin bobon-util__full-width">
            Bobon Profiles
          </div>
        </CardTitle>
        <CardTitle>
          <div className="mdl-typography--headline mdl-typography--font-thin bobon-util__full-width">
            A real-time profile platform for home roasting coffee
          </div>
        </CardTitle>
        <CardAction>
          <Button onClick={ (e) => onLoginBtnClick(e, 'google') }>
            Login with Google
          </Button>
          <Button onClick={ (e) => onLoginBtnClick(e, 'facebook') }>
            Or Facebook
          </Button>
        </CardAction>
      </Card>
    );
  }

  return content;
};

LoginForm.propTypes = {
  authStatus: PropTypes.string.isRequired,
  onLoginBtnClick: PropTypes.func.isRequired
};

export default LoginForm;
