import { connect } from 'react-redux';
import Header from '../components/Header';

const mapStateToProps = state => {
  return {
    authStatus: state.auth.authStatus,
    userName: state.auth.userName,
    photoURL: state.auth.photoURL
  };
};

const HeaderContainer = connect(mapStateToProps)(Header);

export default HeaderContainer;
