import React from 'react';
import C from '../constants';

class RoastPointInput extends React.Component {
  render() {
    if (this.props.status === C.ROAST_PENDING || this.props.status === C.ROAST_IN_PROGRESS) {
      return (
        <form onSubmit={ this.props.onSubmit }>
          <input type="number" id="roastTemp" name="roastTemp"/>
          <input type="hidden" id="roastId" name="roastId" value={ this.props.roastId }/>
          <input type="hidden" id="roastStart" name="roastStart" value={ this.props.roastStart }/>
        </form>
      );
    } else {
      return null;
    }
  }
}

export default RoastPointInput;
