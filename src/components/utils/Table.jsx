import React from 'react';

class Table extends React.Component {
  render() {
    return (
      <table className={ `mdl-data-table mdl-js-data-table ${ this.props.customClass }` }>
        { this.props.children }
      </table>
    );
  }
}

export default Table;
