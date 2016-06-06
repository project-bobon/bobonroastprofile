import { connect } from 'react-redux';
import Main from '../components/Main';

const mapStateToProps = state => {
  return {
    authStatus: state.auth.authStatus
  };
};

const MainContainer = connect(mapStateToProps)(Main);

export default MainContainer;
