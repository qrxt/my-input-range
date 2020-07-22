// Interfaces

import Model from "@interfaces/Model.interface";
import Payload from "@interfaces/Payload.interface";

// Utils

import calcPercentage from "@utils/calcPercentage";
import getStepIndexes from "@utils/getStepIndexes"
import getStepPositions from "@utils/getStepPositions";
import getStepsPosMap from "@utils/getStepsPosMap";

export default (model: Model, payload: Payload): Model => {
  const { from, to } = payload;
  const {
    handleWidth,
    baseWidth,
    min,
    max,
    step,
    vertical,
    onChange
  } = model;

  const isFrom = typeof from === "number";
  const isToo = typeof to === "number";

  const valueToSet = isFrom ? from : to;
  const updatedFrom = isFrom ? valueToSet : model.from;
  const updatedTo = isToo ? valueToSet : model.to;

  const stepIndexes = getStepIndexes(min, max, step);
  const stepPositions = getStepPositions(baseWidth, handleWidth, stepIndexes);
  const steps = getStepsPosMap(stepIndexes, stepPositions, vertical);

  const percentage = from
    ? calcPercentage(
      steps[from] + handleWidth / 2,
      baseWidth
    )
    : calcPercentage(
      steps[to] + handleWidth / 2,
      baseWidth
    );

  // Event on change
  if (onChange) {
    onChange([ updatedFrom, updatedTo ]);
  }

  return {
    ...model,

    percent: vertical
      ? 100 - percentage
      : percentage,
    from: updatedFrom,
    to: updatedTo
  };
};
