import React, { PropTypes } from 'react';
import C from '../constants';
import history from '../history';

class Header extends React.Component {

  static propTypes() {
    return {
      authStatus: PropTypes.string.isRequired,
      photoURL: PropTypes.string,
      userName: PropTypes.string
    };
  }

  _profilePhoto() {
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

  _actionButton() {
    let actionButton = null;

    if (this.props.authStatus === C.LOGGED_IN) {
      actionButton = (
        <button className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-color--grey-100"
          onClick={ (e) => {
              e.preventDefault();
              C.FIREBASE.auth().signOut();
            } }
        >
          Logout
        </button>
      );
    }

    return actionButton;
  }

  render() {
    return (
      <header className="mdl-layout__header">
        <div className="mdl-layout__header-row">
          <span className="mdl-layout-title">
          </span>
          <div className="mdl-layout-spacer"></div>
          <nav className="mdl-navigation">
            { this._actionButton() }
            { this._profilePhoto() }
          </nav>
        </div>
      </header>
    );
  }

}

export default Header;
