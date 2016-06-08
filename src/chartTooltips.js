import Chartist from 'chartist';

const formatTime = seconds => {
  let min = seconds / 60 << 0;
  let sec = seconds % 60;
  if (sec < 10) {
    sec = '0' + sec;
  }
  if (min < 10) {
    min = '0' + min;
  }
  return min + ':' + sec;
};

const chartTooltips = options => {
  return function chartTooltips(chart) {
    let defaultOptions = {
      labelClass: 'ct-label',
      labelOffset: {
        x: 0,
        y: -5
      },
      textAnchor: 'middle'
    };

    options = Chartist.extend({}, defaultOptions, options);

    if(chart instanceof Chartist.Line) {
      chart.on('draw', function(data) {
        console.log(data);
        if(data.type === 'point') {
          data.group.elem('text', {
            x: data.x + options.labelOffset.x,
            y: data.y + options.labelOffset.y,
            style: `text-anchor: ${options.textAnchor}; display: block; width: 10px; overflow:hidden`
          }, options.labelClass, false).text(formatTime(data.value.x) + ', ' + data.value.y);
        }
      });
    }
  };
};

export default chartTooltips;
