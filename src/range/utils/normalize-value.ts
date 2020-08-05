export default (min: number, max: number, val: number): number => {
  if (val < min) {
    return min;
  } else if (val > max) {
    return max;
  }

  return val;
};
