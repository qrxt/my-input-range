export default (stepIndexes: Array<number>, stepPositions: Array<number>, vertical: boolean, posToIdx = false): { [key: number]: number } => {
  const currentStepPosMap = vertical
    ? stepPositions.slice().reverse()
    : stepPositions;

  return posToIdx
    ? currentStepPosMap.reduce((acc, stepPos, idx) => ({
      ...acc, [ stepPos ]: stepIndexes[idx]
    }), {})
    : currentStepPosMap.reduce((acc, stepPos, idx) => ({
      ...acc, [ stepIndexes[idx] ]: stepPos
    }), {});
}
