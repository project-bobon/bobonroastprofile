import React, { PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Link, browserHistory } from 'react-router';

import C from '../constants';
import DialogContainer from '../containers/DialogContainer';
import HeaderContainer from '../containers/HeaderContainer';
import Spinner from './Spinner';

require('../../scss/app.scss');

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

  pageContent() {
    let content = <Spinner/>;
    if (!this.props.dataLoading) {
      content = (
        <ReactCSSTransitionGroup
          component="div"
          transitionName="bobon-transition"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
          transitionAppear={true}
        >
          { React.cloneElement(this.props.children, {
              key: this.props.location.pathname
            }) }
        </ReactCSSTransitionGroup>
      );
    }
    return content;
  }

  render() {
    let extraClass = '';
    let content = null;

    if (this.props.authStatus !== C.LOGGED_IN) {
      extraClass = "bobon-anon";
    }

    if (this.props.authStatus === C.LOGGING_IN) {
      content = <Spinner/>;
    } else {
      content = (
        <div className={ `mdl-layout mdl-js-layout layout--fixed-header ${ extraClass }` }>
          <HeaderContainer location={ this.props.location }/>

          <main className="mdl-layout__content">
            <div className="bobon-page-content page-content">
              { this.pageContent() }
            </div>

          </main>

          <footer className="bobon-footer">
            © Bobon Profiles 2016. Support: <a href="mailto:roast@bobon.coffee">roast@bobon.coffee</a>.
          </footer>

          <DialogContainer/>
        </div>
      );
    }

    return content;
  }
};

export default App;
