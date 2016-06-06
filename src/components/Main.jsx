import React, { PropTypes } from 'react';
import C from '../constants';
import DashBoard from './Dashboard';
import Home from './Home';

class Main extends React.Component {
  static propTypes() {
    return {
      authStatus: PropTypes.string.isRequired
    };
  }

  _getContent() {
    if (this.props.authStatus === C.LOGGED_IN) {
      return <DashBoard/>;
    } else {
      return <Home/>;
    }
  }

  render() {
    return this._getContent();
  }
}

export default Main;
