import React, { PropTypes } from 'react';
import { Link, browserHistory } from 'react-router';
import HeaderContainer from '../containers/HeaderContainer';
import C from '../constants';
import Spinner from './Spinner';
import EasyTransition from 'react-easy-transition';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import DialogContainer from '../containers/DialogContainer';

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
          <ReactCSSTransitionGroup
            transitionName="bobon-header"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={500}
            transitionAppear={true}
          >
            <HeaderContainer location={ this.props.location }/>
          </ReactCSSTransitionGroup>

          <main className="mdl-layout__content">
            <div className="bobon-page-content page-content">
              { this.pageContent() }
            </div>
          </main>

          <DialogContainer/>
        </div>
      );
    }

    return content;
  }
};

export default App;
