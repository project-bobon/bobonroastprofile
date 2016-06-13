import React from 'react';
import { Line } from 'react-chartjs';
import C from '../constants';

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

  createRoastPointsDataset(roastPoints) {
    return Object.keys(roastPoints).map(
      key => {
        return {
          x: this.props.roastPoints[key].elapsed / 60000,
          y: this.props.roastPoints[key].temperature
        };
      }
    ).sort((a,b) => {
      return a.x - b.x;
    });
  }

  createRateOfRoastDataset(roastPointsData) {
    let ror = [];
    for (var i = 0; i < roastPointsData.length; i++) {
      if (i === 0) {
        ror.push({
          x: roastPointsData[0].x,
          y: roastPointsData[0].y
        });
      } else {
        let tangent = (roastPointsData[i].y - roastPointsData[i - 1].y) / (roastPointsData[i].x - roastPointsData[i - 1].x);
        ror.push({
          x: roastPointsData[i].x,
          y: tangent.toFixed(2)
        });
      }
    }
    return ror;
  }

  render() {
    let redraw = false;

    if (this.props.roastPoints) {
      let chartData = {};
      let maxX = 14;
      let data = this.createRoastPointsDataset(this.props.roastPoints);
      let ror = this.createRateOfRoastDataset(data);

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
          // Temperature points.
          {
            label: 'temp 1',
            data,
            fill: false,
            borderWidth: 1,
            yAxisID: 'temp'
          },
          // Rate of roast.
          {
            label: 'rate 1',
            data: ror,
            fill: false,
            borderWidth: 1,
            yAxisID: 'rate'
          },
          // First crack - basically adding 2 points vertically on
          // top of each other.
          {
            label: 'first crack 1',
            data: [
              { x: 0, y: 0 },
              { x: 0, y: 1000 }
            ],
            fill: false,
            borderWidth: 1,
            yAxisID: 'temp'
          }
        ]
      };

      if (this.props.firstCrack) {
        chartData.datasets[2].data = [
          { x: this.props.firstCrack / 60000, y: 0 },
          { x: this.props.firstCrack / 60000, y: 1000 }
        ];
      }

      if (this.props.compare) {
        let comparePoints = this.props.compare.roastPoints;
        let compareData = this.createRateOfRoastDataset(comparePoints);
        let compareRor = this.createRateOfRoastDataset(compareData);

        chartData.datasets.push({
          label: 'temp 2',
          data: compareData,
          fill: false,
          borderWidth: 1,
          yAxisID: 'temp'
        });

        chartData.datasets.push({
          label: 'rate 2',
          data: compareRor,
          fill: false,
          borderWidth: 1,
          yAxisID: 'rate'
        });

        if (this.props.compare.firstCrack) {
          let compareFirstCrack = this.props.compare.firstCrack / 60000;
          chartData.datasets.push(
          {
            label: 'first crack 2',
            data: [
              { x: compareFirstCrack, y: 0 },
              { x: compareFirstCrack, y: 1000 }
            ],
            fill: false,
            borderWidth: 1,
            yAxisID: 'temp'
          }
          );
        }

        redraw = true;
      }

      // Assign colors to each dataset.
      chartData.datasets.forEach((v, i) => {
        let color = C.CHART_COLORS[i % C.CHART_COLORS.length];
        chartData.datasets[i].borderColor = color;
        chartData.datasets[i].backgroundColor = color;
      });

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
                max: 170,
                min: -50,
                stepSize: 10
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

      if (redraw) {
        return <Line
                 data={ chartData }
                 options={ chartOptions }
                 width="400"
                 height="150"
                 redraw
               />;
      } else {
        return <Line
                 data={ chartData }
                 options={ chartOptions }
                 width="400"
                 height="150"
               />;
      }

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
