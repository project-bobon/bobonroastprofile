import React from 'react';
import Table from './utils/Table';

class RoastPointsList extends React.Component {
  roastPoints() {
    return Object.keys(this.props.roastPoints).map(
      key => {
        return (
          <tr key={ key }>
            <td className="mdl-data-table__cell--non-numeric">
              { this.props.roastPoints[key].elapsed }
            </td>
            <td>
              { this.props.roastPoints[key].temperature }
            </td>
          </tr>
        );
      }
    );
  }

  render() {
    return (
      <Table>
        <thead>
          <tr>
            <th className="mdl-data-table__cell--non-numeric">Time Stamp</th>
            <th>Temperature</th>
          </tr>
        </thead>

        <tbody>
          { this.roastPoints() }
        </tbody>
      </Table>
    );
  }
}

export default RoastPointsList;
