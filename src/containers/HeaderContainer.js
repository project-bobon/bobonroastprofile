import { connect } from 'react-redux';
import Header from '../components/Header';
import { logout } from '../actions';
import history from '../history';

import C from '../constants';

const mapStateToProps = (state, ownProps) => {
  return {
    location: ownProps.location,
    authStatus: state.auth.authStatus,
    userName: state.auth.userName,
    photoURL: state.auth.photoURL,
    roastInProgress: state.roastInProgress
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: e => {
      e.preventDefault();
      dispatch(logout());
      C.FIREBASE.auth().signOut().then(() => {
        history.push('/');
      });
    }
  };
}

const HeaderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);

export default HeaderContainer;
