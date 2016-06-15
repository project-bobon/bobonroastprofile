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
          <h2 className="mdl-card__title-text">Bobon Roast Profiles Beta</h2>
        </CardTitle>
        <CardContent>
          To continue, please login as a user
        </CardContent>
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
