import { connect } from 'react-redux';
import ProfileBox from '../components/ProfileBox';

const mapStateToProps = state => {
  return {
    userName: state.userName,
    uid: state.uid,
    authStatus: state.authStatus,
    photoURL: state.photoURL
  };
};

const ProfileBoxContainer = connect(mapStateToProps)(ProfileBox);

export default ProfileBoxContainer;
