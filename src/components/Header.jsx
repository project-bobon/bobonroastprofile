import React, { PropTypes } from 'react';
import C from '../constants';
import history from '../history';

import Button from './utils/Button';
import DialogContainer from '../containers/DialogContainer';

class Header extends React.Component {

  static propTypes() {
    return {
      authStatus: PropTypes.string.isRequired,
      photoURL: PropTypes.string,
      userName: PropTypes.string
    };
  }

  profilePhoto() {
    let profilePhoto = null;

    if (this.props.authStatus === C.LOGGED_IN) {
      profilePhoto = (
        <a class="mdl-navigation__link"
          onClick={ (e) => {
              e.preventDefault();
              history.push('/');
            } }
          style={ {
              display: 'inline-block',
              width: '50px',
              height: '50px',
              overflow: 'hidden',
              borderRadius: '50%',
              marginLeft: '15px'
            } }
        >
          <img src={this.props.photoURL} style={ {width: '100%'} } title={ this.props.userName }/>
        </a>
      );
    } else {
      profilePhoto = (
        <a class="mdl-navigation__link"
          onClick={ (e) => {
              e.preventDefault();
              history.push('/');
            } }
          style={ {
              display: 'inline-block',
              width: '50px',
              height: '50px',
              overflow: 'hidden',
              marginLeft: '15px'
            } }
        >
          <img src={ require('../../images/logo_white_small.png') }
            style={ {width: '100%'} }
            title={ this.props.userName }
          />
        </a>
      );
    }

    return profilePhoto;
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
          >
            <i className="material-icons">timeline</i>
            My roasts
          </Button>

          <Button customClass="mdl-button-with-icon mdl-color-text--grey-100"
            onClick={ (e) => { this.props.logout(e); } }
          >
            <i className="material-icons">exit_to_app</i>
            Logout
          </Button>

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
        <Button customClass="mdl-button-with-icon mdl-color-text--grey-100"
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

  render() {
    return (
      <header className="mdl-layout__header">
        <div className="mdl-layout__header-row">
          <span className="mdl-layout-title">
          </span>
          <div className="mdl-layout-spacer"></div>
          <nav className="mdl-navigation">
            { this.roastInProgress() }
            { this.actionButton() }
            { this.profilePhoto() }
          </nav>
        </div>

        { this.newRoastBtn() }

        <DialogContainer/>

      </header>
    );
  }

}

export default Header;
