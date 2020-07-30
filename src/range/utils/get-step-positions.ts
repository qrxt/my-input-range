export default (baseWidth: number, handleWidth: number, stepIndexes: Array<number>): Array<number> => {
  const stepsQuantity = stepIndexes.length - 1;
  const distanceBetweenSteps = (baseWidth - handleWidth) / stepsQuantity;

  return stepIndexes
    .map((_, idx) => idx * distanceBetweenSteps);
}
