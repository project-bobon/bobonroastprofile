import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';
import C from '../constants';

import Button from './utils/Button';
import Card from './utils/Card';
import CardTitle from './utils/CardTitle';
import CardContent from './utils/CardContent';
import CardAction from './utils/CardAction';

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
            A profile platform for home coffee roasting
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
