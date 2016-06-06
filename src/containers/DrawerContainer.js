import { connect } from 'react-redux';
import Drawer from '../components/Drawer';

const mapStateToProps = state => {
  return {
    authStatus: state.auth.authStatus,
    userName: state.auth.userName,
    photoURL: state.auth.photoURL
  };
};

const DrawerContainer = connect(mapStateToProps)(Drawer);

export default DrawerContainer;
