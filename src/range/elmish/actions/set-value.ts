// Interfaces

import Model from "@interfaces/Model.interface";
import Payload from "@interfaces/Payload.interface";

// Utils

import calcPercentage from "@utils/calc-percentage";
import getStepIndexes from "@utils/get-step-indexes"
import getStepPositions from "@utils/get-step-positions";
import getStepsPosMap from "@utils/get-steps-pos-map";
import invertPercentage from "@utils/invert-percentages";

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
  const isTo = typeof to === "number";

  const valueToSet = isFrom ? from : to;
  const updatedFrom = isFrom ? valueToSet : model.from;
  const updatedTo = isTo ? valueToSet : model.to;

  const isRange = typeof updatedTo === "number";

  const stepIndexes = getStepIndexes(min, max, step);
  const stepPositions = getStepPositions(baseWidth, handleWidth, stepIndexes);
  const steps = getStepsPosMap(stepIndexes, stepPositions, vertical);

  const fromPercentage = calcPercentage(
    steps[updatedFrom] + handleWidth / 2,
    baseWidth
  );

  // Event on change
  if (onChange) {
    onChange([ updatedFrom, updatedTo ]);
  }

  if (isRange) {
    const toPercentage = calcPercentage(
      steps[updatedTo] + handleWidth / 2,
      baseWidth
    );

    return {
      ...model,

      percentages: [
        invertPercentage(fromPercentage, vertical),
        invertPercentage(toPercentage, vertical)
      ],
      from: updatedFrom,
      to: updatedTo
    };
  } else {
    return {
      ...model,

      percentages: [
        invertPercentage(fromPercentage, vertical),
        null
      ],
      from: valueToSet,
    }
  }
};
