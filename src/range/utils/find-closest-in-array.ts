export default (arr: Array<number>, needle: number): number =>
  arr.reduce((a, b) =>
    Math.abs(b - needle) < Math.abs(a - needle) ? b : a
  );
