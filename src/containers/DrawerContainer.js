import { connect } from 'react-redux';
import Drawer from '../components/Drawer';

const mapStateToProps = state => {
  return {
    photoURL: state.auth.photoURL,
    userName: state.auth.userName,
    authStatus: state.auth.authStatus
  };
};

const DrawerContainer = connect(mapStateToProps)(Drawer);

export default DrawerContainer;
