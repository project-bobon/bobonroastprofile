import React from 'react';
import { Line } from 'react-chartjs';
import C from '../constants';

require('../../scss/chart.scss');

class RoastChart extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      redraw: false,
      compare: null
    };
  }

  componentWillReceiveProps(nextProps) {
    // Persistent comparing state.
    if (this.props.compare) {
      this.setState({
        compare: this.props.compare,
        redraw: false
      });
    }

    if (this.props && this.props.roastPoints && nextProps.roastPoints) {
      if (Object.keys(nextProps.roastPoints).length < Object.keys(this.props.roastPoints).length) {
        this.setState({ redraw: true });
      } else {
        this.setState({ redraw: false });
      }
    } else {
      this.setState({ redraw: false });
    }

    if (
      this.props.compare && nextProps.compare &&
      this.props.compare.created !== nextProps.compare.created
    ) {
      this.setState({ redraw: true });
    }
  }

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
          x: roastPoints[key].elapsed / 60000,
          y: roastPoints[key].temperature
        };
      }
    ).sort((a,b) => {
      return a.x - b.x;
    });
  }

  createRateOfRoastDataset(dataSet) {
    let ror = [];
    for (var i = 0; i < dataSet.length; i++) {
      if (i === 0) {
        ror.push({
          x: dataSet[0].x,
          y: 0
        });
      } else {
        let tangent = (dataSet[i].y - dataSet[i - 1].y) / (dataSet[i].x - dataSet[i - 1].x);
        ror.push({
          x: dataSet[i].x,
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
            yAxisID: 'temp'
          },
          // Rate of roast.
          {
            label: 'rate 1',
            data: ror,
            fill: false,
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
            yAxisID: 'temp'
          }
        ]
      };

      if (this.props.firstCrack) {
        chartData.datasets[2].data = [
          { x: this.props.firstCrack / 60000, y: 50 },
          { x: this.props.firstCrack / 60000, y: 1000 }
        ];
      }

      let compare = this.props.compare;
      if (compare === null) {
        compare = this.state.compare;
      }

      if (compare !== null) {
        let comparePoints = compare.roastPoints;
        let compareData = this.createRoastPointsDataset(comparePoints);
        let compareRor = this.createRateOfRoastDataset(compareData);

        chartData.datasets.push({
          label: 'temp 2',
          data: compareData,
          fill: false,
          yAxisID: 'temp'
        });

        chartData.datasets.push({
          label: 'rate 2',
          data: compareRor,
          fill: false,
          yAxisID: 'rate'
        });

        if (compare.firstCrack) {
          let compareFirstCrack = compare.firstCrack / 60000;
          chartData.datasets.push(
          {
            label: 'first crack 2',
            data: [
              { x: compareFirstCrack, y: 50 },
              { x: compareFirstCrack, y: 1000 }
            ],
            fill: false,
            yAxisID: 'temp'
          }
          );
        }

        if (this.state.compare === null && this.state.redraw === false) {
          redraw = true;
        }
      }

      // Assign colors to each dataset.
      chartData.datasets.forEach((v, i) => {
        let color = C.CHART_COLORS[i % C.CHART_COLORS.length];
        chartData.datasets[i].borderColor = color;
        chartData.datasets[i].backgroundColor = color;
        chartData.datasets[i].borderWidth = 1;
      });

      let chartOptions = {
        defaultFontFamily: 'Roboto',
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

      if (redraw || this.state.redraw) {
        return <Line
                 data={ chartData }
                 options={ chartOptions }
                 width="400"
                 height="280"
                 redraw
               />;
      } else {
        return <Line
                 data={ chartData }
                 options={ chartOptions }
                 width="400"
                 height="280"
               />;
      }

    } else {
      return null;
    }
  }
}

export default RoastChart;
