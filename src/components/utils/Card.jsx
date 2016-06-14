import React from 'react';

class Card extends React.Component {
  render() {
    return (
      <div className={ `mdl-card ${ this.props.customClass }` }>
        { this.props.children }
      </div>
    );
  }
}

export default Card;
