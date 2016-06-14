import { connect } from 'react-redux';
import LoginForm from '../components/LoginForm';
import { loginRequest, loginSuccess } from '../actions';
import auth from '../auth';
import firebase from 'firebase';
import C from '../constants';

const mapStateToProps = state => {
  return {
    authStatus: state.auth.authStatus
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLoginBtnClick: (e, method) => {
      e.preventDefault();
      dispatch(loginRequest());

      let authProvider = null;

      switch (method) {
      case 'facebook':
        authProvider = new firebase.auth.FacebookAuthProvider();
        break;

      case 'google':
        authProvider = new firebase.auth.GoogleAuthProvider();
        break;

      default:
        break;
      }

      if (window.location.protocol === 'http') {
        C.FIREBASE.auth().signInWithPopup(authProvider);
      } else {
        C.FIREBASE.auth().signInWithRedirect(authProvider).then(v => {
          console.log(v);
        });
      }
    }
  };
};

const LoginFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);

export default LoginFormContainer;
