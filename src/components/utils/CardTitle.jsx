import React from 'react';

class CardTitle extends React.Component {
  render() {
    return (
      <div className={ `mdl-card__title ${ this.props.customClass }` }>
        { this.props.children }
      </div>
    );
  }
}

export default CardTitle;
