// Interfaces

import Model from "@interfaces/Model.interface";

// Elements

import range from "@elements/range";
import btnArrowLeft from "@elements/btn-arrow-left";
import btnArrowRight from "@elements/btn-arrow-right";
import Handle from "@elements/handle";
import Base from "@elements/base";

// Types

import Signal from "@type/Signal.type";

const empty = (node: JQuery<HTMLElement>): void => {
  node.children().remove();
};

export default (signal: Signal, model: Model, root: JQuery<HTMLElement>): void => {
  const base = new Base({
    className: "range__base",
    colors: model.colors,

    vertical: model.vertical,

    percentages: model.percentages
  }).init();

  const handleTemplate = {
    name: model.name,

    base: base,

    signal: signal,

    min: model.min,
    max: model.max,
    step: model.step,

    vertical: model.vertical,

    percentages: model.percentages,

    onChange: model.onChange,
    onSlide: model.onSlide,
    onDraw: model.onDraw,
    onLoad: model.onLoad,
    onPress: model.onPress,

    handleWidth: model.handleWidth,
    baseWidth: model.baseWidth,

    colors: model.colors,
    stepsMap: model.steps,
    stepsMapReversed: model.stepsReversed,
    stepPositions: model.stepPositions
  };

  const handleLower = new Handle({
    ...handleTemplate,
    name: model.name,

    base: base,

    className: "range__handle range__handle--lower",
    pos: model.from,

    allowedMax: typeof model.to === "number"
      ? model.to
      : model.max,
  });

  const handleUpper = new Handle({
    ...handleTemplate,

    className: "range__handle range__handle--upper",

    pos: model.to,

    allowedMin: typeof model.from === "number"
      ? model.from
      : model.min,
  })

  const arrowBtnLeft = btnArrowLeft(model, signal);
  const arrowBtnRight = btnArrowRight(model, signal);

  const rangeComponent = range(
    {
      name: model.name,

      signal: signal,
      className: `range ${ model.className }`,

      width: model.baseWidth,
      handleWidth: model.handleWidth, //
      vertical: model.vertical,

      onResize: model.onResize,
    },
    base.elem.append([
      handleLower.init(),

      model.to && model.baseWidth
        ? handleUpper.init()
        : null
    ])
  );

  // draw
  empty(root);
  root.append(
    arrowBtnLeft,
    rangeComponent,
    arrowBtnRight
  );
};
