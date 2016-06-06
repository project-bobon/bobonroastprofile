import { connect } from 'react-redux';
import LoginForm from '../components/LoginForm';
import { loginRequest, loginSuccess } from '../actions';
import auth from '../auth';

const mapStateToProps = state => {
  return {
    authStatus: state.authStatus
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLoginBtnClick: (e, method) => {
      e.preventDefault();
      dispatch(loginRequest());
      auth.login(method);
    }
  };
};

const LoginFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);

export default LoginFormContainer;
