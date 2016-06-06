import React from 'react';
import C from '../constants';

class ProfileBox extends React.Component {
  render() {
    if (this.props.authStatus === C.LOGGED_IN) {
      return (
        <header style={ {
            width: '100%',
            height: '150px'
          } }
        >
        <div style={ {
            borderRadius: '50%',
            overflow: 'hidden',
            width: '70px',
            heigth: '70px',
            display: 'inline-block'
          } }
        >
          <img src={ this.props.photoURL } className="user-avatar"
            style={ {
                width: '70px',
                height: '70px'
              } }
          />
        </div>
        </header>
      );
    } else {
      return null;
    }
  }
}

export default ProfileBox;
