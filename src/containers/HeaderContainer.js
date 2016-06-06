import { connect } from 'react-redux';
import Header from '../components/Header';

const mapStateToProps = state => {
  return {
    authStatus: state.authStatus,
    userName: state.userName,
    photoURL: state.photoURL
  };
};

const HeaderContainer = connect(mapStateToProps)(Header);

export default HeaderContainer;
