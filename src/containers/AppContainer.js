import { connect } from 'react-redux';
import App from '../components/App';

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    authStatus: state.authStatus
  };
};

const AppContainer = connect(mapStateToProps)(App);

export default AppContainer;
