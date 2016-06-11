import React from 'react';
import ChartistGraph from 'react-chartist';
import { FixedScaleAxis } from 'chartist';

require('../../scss/chart.scss');

class RoastChart extends React.Component {
  beautifyTime(value) {
    let m = Math.floor(value / 60);
    let s = value % 60;

    if (s === 0) {
      return m;
    } else {
      // Add empty label, but show line on 30 sec intervals.
      return '';
    }
  }

  render() {
    if (this.props.roastPoints) {
      let maxX = 855;
      let lastPointId = Object.keys(this.props.roastPoints).pop();
      let chartData = {};
      let type = 'Line';
      let ticks = [];
      let lastSec = this.props.roastPoints[lastPointId].elapsed / 1000 << 0;

      if (lastSec > maxX) {
        maxX = lastSec + 30;
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
        high: 300,
        low: 30,
        fullWidth: true,
        chartPadding: {
          right: 20
        },

        axisX: {
          high: maxX,
          ticks,
          type: FixedScaleAxis,
          onlyInteger: true,
          labelInterpolationFnc: value => {
            return this.beautifyTime(value);
          }
        }
      };

      return (
        <ChartistGraph
          data={ chartData }
          options={ options }
          type={ type }
          className="ct-major-eleventh"
        />
      );
    } else {
      return null;
    }
  }
}

export default RoastChart;
