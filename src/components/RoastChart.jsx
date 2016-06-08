import React from 'react';
import Chartist from 'chartist';
import ChartistGraph from 'react-chartist';

class RoastChart extends React.Component {
  beautifyTime(value) {
    let m = Math.floor(value / 60);
    let s = value % 60;
    if (s < 10) {
      s = '0' + s;
    }
    return m + ':' + s;
  }

  render() {
    if (this.props.roastPoints) {
      let maxX = 855;
      let lastPointId = Object.keys(this.props.roastPoints).pop();
      let chartData = {};
      let type = 'Line';
      let ticks = [];

      if (this.props.roastPoints[lastPointId].temperature > maxX) {
        maxX = Math.floor(this.props.roastPoints[lastPointId].temperature) + 15;
      }
      for (var i = 1; i * 30 <= maxX; i++) {
        ticks.push(i * 30);
      }

      let series = Object.keys(this.props.roastPoints).map(key => {
        return {
          x: this.props.roastPoints[key].elapsed / 1000 << 0,
          y: this.props.roastPoints[key].temperature
        };
      });

      chartData = { series: [series] };

      let options = {
        high: 275,
        low: 0,
        fullWidth: true,
        chartPadding: {
          right: 20
        },

        axisX: {
          high: maxX,
          ticks,
          type: Chartist.FixedScaleAxis,
          onlyInteger: true,
          labelInterpolationFnc: value => {
            return this.beautifyTime(value);
          }
        }
      };

      return <ChartistGraph data={ chartData } options={options} type={type} style={ {height: '400px'}} className='bobon-roast-chart'/>;
    } else {
      return null;
    }
  }
}

export default RoastChart;
