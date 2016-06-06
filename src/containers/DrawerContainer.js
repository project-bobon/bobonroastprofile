import { connect } from 'react-redux';
import Drawer from '../components/Drawer';

const mapStateToProps = state => {
  return {
    authStatus: state.authStatus,
    userName: state.userName,
    photoURL: state.photoURL
  };
};

const DrawerContainer = connect(mapStateToProps)(Drawer);

export default DrawerContainer;
