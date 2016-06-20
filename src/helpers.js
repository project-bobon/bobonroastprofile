import C from './constants';

export const metricWeight = (weight, unitSystem) => {
  if (unitSystem === C.IMPERIAL) {
    return weight * 0.453592;
  } else {
    return weight;
  }
};

export const metricTemp = (temp, unitSystem) => {
  if (unitSystem === C.IMPERIAL) {
    return (temp - 32) / 1.8;
  } else {
    return temp;
  }
};
