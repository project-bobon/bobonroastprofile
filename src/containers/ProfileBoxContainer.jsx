import { connect } from 'react-redux';
import ProfileBox from '../components/ProfileBox';

const mapStateToProps = state => {
  return {
    userName: state.auth.userName,
    uid: state.auth.uid,
    authStatus: state.auth.authStatus,
    photoURL: state.auth.photoURL
  };
};

const ProfileBoxContainer = connect(mapStateToProps)(ProfileBox);

export default ProfileBoxContainer;
