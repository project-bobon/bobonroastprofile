import React, { PropTypes } from 'react';
import history from '../../history';

class NavigationLink extends React.Component {

  static propTypes() {
    return {
      path: PropTypes.string.isRequired
    };
  }

  render() {
    return(
      <a onClick={ (e) => {
            e.preventDefault();
            history.push(this.props.path);
          } }
      >
        { this.props.children }
      </a>
    );
  }
}

export default NavigationLink;
