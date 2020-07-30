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
  const { handleWidth, baseWidth }: {
    handleWidth?: number,
    baseWidth?: number
  } = payload;
  const { from, to, min, max, step, vertical } = model;

  const stepIndexes = getStepIndexes(min, max, step);
  const stepPositions = getStepPositions(baseWidth, handleWidth, stepIndexes);
  const steps = getStepsPosMap(stepIndexes, stepPositions, vertical);
  const stepsReversed = getStepsPosMap(stepIndexes, stepPositions, vertical, true);

  const fromPercentage = calcPercentage(
    steps[from] + handleWidth / 2,
    baseWidth
  );

  const modelTemplate = {
    ...model,

    handleWidth,
    baseWidth,

    steps: steps,
    stepsReversed: stepsReversed,
    stepPositions: stepPositions
  };

  if (typeof to === "number") {
    const toPercentage = calcPercentage(
      steps[to] + handleWidth / 2,
      baseWidth
    );

    return {
      ...modelTemplate,

      percentages: [
        invertPercentage(fromPercentage, vertical),
        invertPercentage(toPercentage, vertical)
      ],
    };
  } else return {
    ...modelTemplate,

    percentages: [
      invertPercentage(fromPercentage, vertical),
      null
    ]
  };
};
