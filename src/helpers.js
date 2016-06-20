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
export const displayTemp = (temp, unitSystem, fixed = true) => {
  let result = temp;
  if (unitSystem === C.IMPERIAL) {
    result = temp * 1.8 + 32;
  }
  return fixed ? result.toFixed(2) : result;
};

export const displayWeight = (weight, unitSystem, fixed = true) => {
  let result = weight;
  if (unitSystem === C.IMPERIAL) {
    result = weight / 0.454592;
  }
  return fixed ? result.toFixed(2) : result;
};
