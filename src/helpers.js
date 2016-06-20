import C from './constants';

const helpers = {
  metricWeight: (weight, unitSystem) => {
    if (unitSystem === C.IMPERIAL) {
      return weight * 0.453592;
    } else {
      return weight;
    }
  },

  metricTemp: (temp, unitSystem) => {
    if (unitSystem === C.IMPERIAL) {
      return (temp - 32) / 1.8;
    } else {
      return temp;
    }
  }
};

export default helpers;
