import React, { PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import Button from './utils/Button';
import C from '../constants';
import history from '../history';
import UnitSwitcherContainer from '../containers/UnitSwitcherContainer';

class Header extends React.Component {

  static propTypes() {
    return {
      authStatus: PropTypes.string.isRequired,
      photoURL: PropTypes.string,
      userName: PropTypes.string
    };
  }

  userMenu() {
    let content = null;

    if (this.props.authStatus === C.LOGGED_IN) {
      content = (
        <ul
          className="mdl-menu mdl-menu--bottom-right mdl-js-menu
                     mdl-js-ripple-effect bobon-menu-user-menu"
          htmlFor="bobon-user-menu"
        >

          <li
            className="mdl-menu__item mdl-button mdl-button-with-icon"
            disabled
          >
            <i className="material-icons">account_circle</i>
            { this.props.userName ? this.props.userName : this.props.email  }
          </li>

          <li
            className="mdl-menu__item mdl-button mdl-button-with-icon"
            onClick={ () => {
                history.push('/')
              } }
          >
            <i className="material-icons">timeline</i>
            My roasts
          </li>

          <li
            className="mdl-menu__item mdl-menu__item--full-bleed-divider
                       mdl-button mdl-button-with-icon"
            onClick={ () => {
                history.push('/settings');
              } }
          >
            <i className="material-icons">settings</i>
            Settings
          </li>

          <li
            className="mdl-menu__item mdl-button mdl-button-with-icon"
            onClick={ this.props.logout }
          >
            <i className="material-icons">exit_to_app</i>
            Logout
          </li>

        </ul>
      );
    }

    return content;
  }

  profilePhoto() {
    let photo = null;

    if (this.props.authStatus === C.LOGGED_IN) {
      if (this.props.photoURL && this.props.photoURL !== '') {
        photo = (
          <button
            id="bobon-user-menu"
            className="mdl-navigation__link bobon-user-avatar"
          >
            <img src={ this.props.photoURL }
              style={ { width: '100%' } }
              title={ this.props.userName }
            />
          </button>
        );
      } else {
        photo = (
          <button
            id="bobon-user-menu"
            className="mdl-navigation__link bobon-user-avatar mdl-button
                       mdl-button-with-icon"
          >
            <i className="material-icons">account_circle</i>
          </button>
        );
      }
    } else {
      photo = (
        <a className="bobon-logo"
          onClick={ (e) => {
              e.preventDefault();
              history.push('/')
            } }
        >
          Bobon Profiles
        </a>
      );
    }

    return photo;
  }

  actionButton() {
    let actionButton = null;

    if (this.props.authStatus === C.LOGGED_IN) {
      actionButton = (
        <div>

          { this.newRoastBtnNav() }

          <Button customClass="mdl-button-with-icon mdl-color-text--grey-100"
            onClick={ (e) => {
                e.preventDefault();
                history.push('/');
              } }
            id="bobon-button--nav-action-my-roasts"
          >
            <i className="material-icons">timeline</i>
            <span className="bobon-button-text--nav-action">My roasts</span>
          </Button>

          <div className="mdl-tooltip"
            htmlFor="bobon-button--nav-action-my-roasts"
          >
            My roasts
          </div>
        </div>
      );
    }

    return actionButton;
  }

  roastInProgress() {
    let content = null;

    if (this.props.roastInProgress) {
      content = (
        <Button customClass="bobon-roast-status--roast_in_progress"
          onClick={ e => {
              e.preventDefault();
              history.push(`/roasts/${this.props.roastInProgress}`);
            } }
        >
          <i className="material-icons">fiber_manual_record</i>
          Roast in-progress!
        </Button>
      );
    }

    return content;
  }

  newRoastBtnNav() {
    let content = null;
    let location = this.props.location;

    if (
      this.props.authStatus === C.LOGGED_IN &&
      this.props.roastInProgress === null
    ) {
      content = (
        <Button customClass="mdl-button-with-icon mdl-color-text--grey-100
                             mdl-button-nav-start-roast"
          onClick={ (e) => {
              e.preventDefault();
              history.push('/new');
            } }
        >
          <i className="material-icons">add</i>
          Start a roast
        </Button>
      );
    }

    return content;
  }

  newRoastBtn() {
    let content = null;
    let location = this.props.location;

    if (
      this.props.authStatus === C.LOGGED_IN &&
      this.props.roastInProgress === null
    ) {
      content = (
        <div>
          <Button customClass="mdl-button--fab mdl-button--colored
                               bobon-header-button bobon-header-button-add-new"
            id="add-new-button"
            onClick={ () => {
                history.push('/new');
              } }
          >
            <i className="material-icons">add</i>
          </Button>
          <div className="mdl-tooltip" htmlFor="add-new-button">
            Start a new roast!
          </div>
        </div>
      );
    }

    return content;
  }

  unitSwitcher() {
    let content = null;
    if (this.props.authStatus === C.LOGGED_IN) {
      content = <UnitSwitcherContainer/>;
    }

    return content;
  }

  render() {
    return (
      <ReactCSSTransitionGroup
        transitionName="bobon-header"
        transitionEnterTimeout={500}
        transitionLeaveTimeout={500}
        transitionAppear={true}
      >
        <header className="mdl-layout__header">
          <div className="mdl-layout__header-row">
            <span className="mdl-layout-title">
            </span>
            <div className="mdl-layout-spacer"></div>
            <nav className="mdl-navigation">
              { this.roastInProgress() }
              { this.actionButton() }
              { this.unitSwitcher() }
              { this.profilePhoto() }
            </nav>
          </div>
          { this.newRoastBtn() }
        </header>
        { this.userMenu() }
      </ReactCSSTransitionGroup>
    );
  }

}

export default Header;
