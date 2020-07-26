// Interfaces

import Model from "@interfaces/Model.interface";
import Payload from "@interfaces/Payload.interface";

// Utils

import calcPercentage from "@utils/calcPercentage";
import getStepIndexes from "@utils/getStepIndexes"
import getStepPositions from "@utils/getStepPositions";
import getStepsPosMap from "@utils/getStepsPosMap";
import invertPercentage from "@utils/invertPercentage";

export default (model: Model, payload: Payload): Model => {
  const { handleWidth, baseWidth }: {
    handleWidth?: number,
    baseWidth?: number
  } = payload;
  const { from, to, min, max, step, vertical } = model;

  const stepIndexes = getStepIndexes(min, max, step);
  const stepPositions = getStepPositions(baseWidth, handleWidth, stepIndexes);
  const steps = getStepsPosMap(stepIndexes, stepPositions, vertical);

  const fromPercentage = calcPercentage(
    steps[from] + handleWidth / 2,
    baseWidth
  );

  if (typeof to === "number") {
    const toPercentage = calcPercentage(
      steps[to] + handleWidth / 2,
      baseWidth
    );

    return {
      ...model,

      percentages: [
        invertPercentage(fromPercentage, vertical),
        invertPercentage(toPercentage, vertical)
      ],
      handleWidth,
      baseWidth
    }
  } else {
    return {
      ...model,

      percentages: [
        invertPercentage(fromPercentage, vertical),
        null
      ],
      handleWidth,
      baseWidth
    };
  }
};
