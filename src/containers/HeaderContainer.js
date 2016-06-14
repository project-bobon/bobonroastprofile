import { connect } from 'react-redux';
import Header from '../components/Header';

const mapStateToProps = (state, ownProps) => {
  return {
    location: ownProps.location,
    authStatus: state.auth.authStatus,
    userName: state.auth.userName,
    photoURL: state.auth.photoURL,
    roastInProgress: state.roastInProgress
  };
};

const HeaderContainer = connect(mapStateToProps)(Header);

export default HeaderContainer;
