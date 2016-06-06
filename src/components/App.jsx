import React, { PropTypes } from 'react';
import { Link, browserHistory } from 'react-router';

import HeaderContainer from '../containers/HeaderContainer';
import DrawerContainer from '../containers/DrawerContainer';
import C from '../constants';

class App extends React.Component {

  static propTypes() {
    return {
      uid: PropTypes.string,
      authStatus: PropTypes.string.isRequired,
      userName: PropTypes.string
    };
  }

  _containerClass() {
    let className = "mdl-layout mdl-js-layout mdl-layout--fixed-header";
    if (this.props.authStatus === C.LOGGED_IN) {
      className = className + " mdl-layout--fixed-drawer";
    }
    return className;
  }

  render() {
    return (
      <div className={ this._containerClass() }>
        <HeaderContainer/>
        <DrawerContainer/>
        <main className="mdl-layout__content">
          <div className="page-content">
            { this.props.children }
          </div>
        </main>
      </div>
    );
  }
};

export default App;
