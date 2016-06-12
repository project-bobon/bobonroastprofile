import React from 'react';
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

      // Initial rate of roast.
      let ror = [
        { x: 0, y: 0 }
      ];

      for (var i = 1; i < data.length; i++) {
        let tangent = (data[i].y - data[i - 1].y) / (data[i].x - data[i - 1].x);
        ror.push({
          x: data[i].x,
          y: tangent.toFixed(2)
        });
      }

      // Set max x scale.
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
            borderColor: 'red',
            borderWidth: 1,
            backgroundColor: 'red',
            yAxisID: 'temp'
          },
          {
            label: 'rate',
            data: ror,
            fill: false,
            borderColor: 'green',
            borderWidth: 1,
            backgroundColor: 'green',
            yAxisID: 'rate'
          },
          {
            label: 'temp2',
            data: [],
            fill: false,
            borderColor: 'blue',
            borderWidth: 1,
            backgroundColor: 'blue',
            yAxisID: 'temp'
          },
          {
            label: 'firstCrack',
            data: [
              { x: 0, y: 0 },
              { x: 0, y: 1000 }
            ],
            fill: false,
            borderColor: 'red',
            borderWidth: 1,
            backgroundColor: 'red',
            yAxisID: 'temp'
          }
        ]
      };

      if (this.props.firstCrack) {
        chartData.datasets[3].data = [
          { x: this.props.firstCrack / 60000, y: 0 },
          { x: this.props.firstCrack / 60000, y: 1000 }
        ];
      }

      if (this.props.compare) {
        let comparePoints = this.props.compare.roastPoints;

        let compareData = Object.keys(comparePoints).map(
          key => {
            return {
              x: comparePoints[key].elapsed / 60000,
              y: comparePoints[key].temperature
            };
          }
        ).sort((a,b) => {
          return a.x - b.x;
        });

        chartData.datasets[2] = {
          label: 'temp2',
          data: compareData,
          fill: false,
          borderColor: 'blue',
          borderWidth: 1,
          backgroundColor: 'blue',
          yAxisID: 'temp'
        };
      }

      let chartOptions = {
        scales: {
          xAxes: [{
            type: 'linear',
            position: 'bottom',
            id: 'time',
            ticks: {
              max: maxX,
              min: 0,
              stepSize: 1
            }
          }],
          yAxes: [
            {
              id: 'temp',
              type: 'linear',
              position: 'left',
              ticks: {
                max: 270,
                min: 50,
                stepSize: 10
              }
            },
            {
              id: 'rate',
              position: 'right',
              type: 'linear',
              ticks: {
                max: 55,
                min: 0,
                stepSize: 5
              }
            },
          ]
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
        <Line data={ chartData } options={ chartOptions } width="400" height="150" redraw={true} />
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
