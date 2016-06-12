import React, { PropTypes } from 'react';
import { Link, browserHistory } from 'react-router';
import HeaderContainer from '../containers/HeaderContainer';
import DrawerContainer from '../containers/DrawerContainer';
import C from '../constants';

require('../../scss/app.scss');
require('../../scss/utils.scss');

class App extends React.Component {

  static propTypes() {
    return {
      uid: PropTypes.string,
      authStatus: PropTypes.string.isRequired,
      userName: PropTypes.string
    };
  }

  componentDidUpdate() {
    componentHandler.upgradeDom();
  }

  containerClass() {
    let className = "mdl-layout mdl-js-layout mdl-layout--fixed-header";
    /* if (this.props.authStatus === C.LOGGED_IN) {
     *   className = className + " mdl-layout--fixed-drawer";
     * }*/
    return className;
  }

  render() {
    var path = this.props.location.pathname;
    var segment = path.split('/')[1] || 'root';
    return (
      <div className={ this.containerClass() }>
        <HeaderContainer/>
        <DrawerContainer/>
        <main className="mdl-layout__content">
          <div className="bobon-page-content page-content">
            { this.props.children }
          </div>
        </main>
      </div>
    );
  }
};

export default App;
