import { connect } from 'react-redux';
import Header from '../components/Header';
import { logout } from '../actions';
import history from '../history';

import C from '../constants';

const mapStateToProps = (state, ownProps) => {
  return {
    authStatus: state.auth.authStatus,
    location: ownProps.location,
    photoURL: state.auth.photoURL,
    roastInProgress: state.roastInProgress,
    userName: state.auth.userName,
    email: state.auth.email
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: e => {
      console.log(e);
      e.preventDefault();
      C.FIREBASE.auth().signOut().then(() => {
        dispatch(logout());
        location.reload();
      });
    }
  };
}

const HeaderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);

export default HeaderContainer;
