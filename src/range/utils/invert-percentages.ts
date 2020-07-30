export default (percentage: number, vertical: boolean): number =>
  vertical
    ? 100 - percentage
    : percentage;
