import React from 'react';

class CardAction extends React.Component {
  render() {
    return(
      <div className="mdl-card__action">
        { this.props.children }
      </div>
    );
  }
}

export default CardAction;
