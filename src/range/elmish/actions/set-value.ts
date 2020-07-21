// Interfaces

import Model from "@interfaces/Model.interface";
import Payload from "@interfaces/Payload.interface";

// Utils

import calcPercentage from "@utils/calcPercentage";
import getStepIndexes from "@utils/getStepIndexes"
import getStepPositions from "@utils/getStepPositions";
import getStepsPosMap from "@utils/getStepsPosMap";

export default (model: Model, payload: Payload): Model => {
  const { value } = payload;
  const {
    handleWidth,
    baseWidth,
    min,
    max,
    step,
    vertical,
    onChange
  } = model;

  const stepIndexes = getStepIndexes(min, max, step);
  const stepPositions = getStepPositions(baseWidth, handleWidth, stepIndexes);
  const steps = getStepsPosMap(stepIndexes, stepPositions, vertical);

  const percentage = calcPercentage(
    steps[value] + handleWidth / 2,
    baseWidth
  );

  // Event on change
  if (onChange) {
    onChange([ value ]);
  }

  return {
    ...model,

    percent: vertical
      ? 100 - percentage
      : percentage,
    value
  };
};
