import C from './constants';

// Data is stored in database in metric form.
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

// When displaying data, convert from metric to imperial when needed.
export const displayTemp = (temp, unitSystem) => {
  if (unitSystem === C.IMPERIAL) {
    return (temp * 1.8 + 32).toFixed(2);
  } else {
    return temp.toFixed(2);
  }
};

export const displayWeight = (weight, unitSystem) => {
  if (unitSystem === C.IMPERIAL) {
    return (weight / 0.454592).toFixed(2);
  } else {
    return weight.toFixed(2);
  }
};
