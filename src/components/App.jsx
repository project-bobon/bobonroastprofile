import React, { PropTypes } from 'react';
import { Link, browserHistory } from 'react-router';
import HeaderContainer from '../containers/HeaderContainer';
import C from '../constants';
import Spinner from './Spinner';

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
    if (this.props.authStatus === C.LOGGED_IN) {
      componentHandler.upgradeDom();
    }
  }

  pageContent() {
    let content = <Spinner/>;
    if (!this.props.dataLoading) {
      content = this.props.children;
    }
    return content;
  }

  render() {
    if (this.props.authStatus === C.LOGGING_IN) {
      return <Spinner/>;
    } else {
    var path = this.props.location.pathname;
    var segment = path.split('/')[1] || 'root';
    return (
      <div className="mdl-layout mdl-js-layout layout--fixed-header">
        <HeaderContainer location={ this.props.location }/>
        <main className="mdl-layout__content">
          <div className="bobon-page-content page-content">
            { this.pageContent() }
          </div>
        </main>
      </div>
    );
      }
  }
};

export default App;
