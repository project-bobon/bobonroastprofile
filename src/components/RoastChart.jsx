import React from 'react';
import ChartistGraph from 'react-chartist';
import { FixedScaleAxis } from 'chartist';
import { Line } from 'react-chartjs';

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
      let chartData = {};
      let maxX = 14;
      let data = Object.keys(this.props.roastPoints).map(
        key => {
          return {
            x: this.props.roastPoints[key].elapsed / 60000,
            y: this.props.roastPoints[key].temperature
          };
        }
      ).sort((a,b) => {
        return a.x - b.x;
      });

      if (data.length > 0) {
        let lastMin = data[data.length - 1].x;
        if (lastMin + 1 > maxX) {
          maxX = lastMin + 1;
        }
      }

      chartData = {
        labels: [],
        datasets: [
          {
            label: 'temp',
            data,
            fill: false,
            borderColor: 'green',
            borderWidth: 1,
            backgroundColor: 'green'
          }
        ]
      };

      let chartOptions = {
        scales: {
          xAxes: [{
            type: 'linear',
            position: 'bottom',
            ticks: {
              max: maxX,
              min: 0,
              stepSize: 1
            }
          }]
        },
        maintainAspectRatio: true,
        responsive: true,
        tooltips: {
          titleFontFamily: 'Roboto',
          titleFontStyle: 'normal',
          callbacks: {
            title: (item, data) => {
              let xLabel = item[0].xLabel;
              let min = xLabel / 1 << 0;
              let sec = xLabel % 1 * 60 << 0;
              if (sec < 10) {
                sec = '0' + sec;
              }
              if (min < 10) {
                min = '0' + min;
              }
              return 'elapsed: ' + min + ':' + sec;
            }
          }
        }
      };

      return (
        <Line data={ chartData } options={ chartOptions } width="400" height="200"/>
      );
    } else {
      return null;
    }
  }
}

export default RoastChart;

/* class RoastChart extends React.Component {
 *   beautifyTime(value) {
 *     let m = Math.floor(value / 60);
 *     let s = value % 60;
 * 
 *     if (s === 0) {
 *       return m;
 *     } else {
 *       // Add empty label, but show line on 30 sec intervals.
 *       return '';
 *     }
 *   }
 * 
 *   render() {
 *     if (this.props.roastPoints) {
 *       let maxX = 855;
 *       let lastPointId = Object.keys(this.props.roastPoints).pop();
 *       let chartData = {};
 *       let type = 'Line';
 *       let ticks = [];
 *       let lastSec = this.props.roastPoints[lastPointId].elapsed / 1000 << 0;
 * 
 *       if (lastSec > maxX) {
 *         maxX = lastSec + 30;
 *       }
 * 
 *       for (var i = 1; i * 30 <= maxX; i++) {
 *         ticks.push(i * 30);
 *       }
 * 
 *       let series = Object.keys(this.props.roastPoints).map(key => {
 *         return {
 *           x: this.props.roastPoints[key].elapsed / 1000 << 0,
 *           y: this.props.roastPoints[key].temperature
 *         };
 *       });
 * 
 *       chartData = { series: [series] };
 * 
 *       let options = {
 *         high: 300,
 *         low: 30,
 *         fullWidth: true,
 *         chartPadding: {
 *           right: 20
 *         },
 * 
 *         axisX: {
 *           high: maxX,
 *           ticks,
 *           type: FixedScaleAxis,
 *           onlyInteger: true,
 *           labelInterpolationFnc: value => {
 *             return this.beautifyTime(value);
 *           }
 *         }
 *       };
 * 
 *       return (
 *         <ChartistGraph
 *           data={ chartData }
 *           options={ options }
 *           type={ type }
 *           className="ct-major-eleventh"
 *         />
 *       );
 *     } else {
 *       return null;
 *     }
 *   }
 * }
 * 
 * 
 * */
