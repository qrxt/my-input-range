export default (min: number, max: number, step: number): Array<number> => {
  const indexesLength = Math.ceil((max - min + 1) / step);

  return Array.from(
    Array(indexesLength),
    (_, current) => current * step + min
  );
}
