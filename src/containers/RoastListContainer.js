import { connect } from 'react-redux';
import RoastList from '../components/RoastList';
import { removeRoast } from '../actions';
import C from '../constants';

const mapStateToProps = state => {
  return {
    roasts: state.roasts
  };
};

const mapDispatchToProps = dispatch => {
  return {
    removeRoast: roastId => {
      let uid = C.FIREBASE.auth().currentUser.uid;
      let ref = C.FIREBASE.app().database().ref(`roasts/${uid}/${roastId}`);

      ref.remove(() => {
        dispatch(removeRoast(roastId));
      });
    }
  };
};

const RoastListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(RoastList);

export default RoastListContainer;
