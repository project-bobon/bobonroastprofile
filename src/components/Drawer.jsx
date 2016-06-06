import React, { PropTypes } from 'react';
import C from '../constants';

class Drawer extends React.Component {
  static propTypes() {
    return {
      authStatus: PropTypes.string.isRequired,
      userName: PropTypes.string,
      photoURL: PropTypes.string
    };
  }

  _title() {
    let title = 'Bobon Profiles';

    if (this.props.authStatus === C.LOGGED_IN) {
      title = this.props.userName;
    }

    return title;
  }

  render() {
    return (
      <div className="mdl-layout__drawer">
        <span className="mdl-layout-title">{ this._title() }</span>
        <nav className="mdl-navigation">
          <a className="mdl-navigation__link" href="">Link</a>
          <a className="mdl-navigation__link" href="">Link</a>
          <a className="mdl-navigation__link" href="">Link</a>
          <a className="mdl-navigation__link" href="">Link</a>
        </nav>
      </div>
    );
  }
};

export default Drawer;
