import React, { PropTypes } from 'react';
import C from '../constants';
import RoastListContainer from '../containers/RoastListContainer';
import { Line } from 'react-chartjs';
import Home from './Home';
import { demoDataset, demoChartOptions } from '../demoData';
import Instructions from './Instruction';


class Main extends React.Component {
  static propTypes() {
    return {
      authStatus: PropTypes.string.isRequired
    };
  }

  render() {
    let content = null;
    if (this.props.authStatus === C.LOGGED_IN) {
      content = (<RoastListContainer/>);
    } else {
      content = (
        <div className="bobon-home-anonymous">
          <Line options={ demoChartOptions } data={ demoDataset } width="2400" height="1200" />
          <Home/>
        </div>
      );
    }

    return content;
  }
}

export default Main;
