import { connect } from 'react-redux';
import App from '../components/App';

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    authStatus: state.auth.authStatus,
    dataLoading: state.dataLoading
  };
};

const AppContainer = connect(mapStateToProps)(App);

export default AppContainer;
