// Interfaces

import Model from "@interfaces/Model.interface";

// Elements

import range from "@elements/range";
import base from "@elements/base";
import btnArrow from "@elements/btn-arrow";
import Handle from "@elements/handle";

// Types

import Signal from "@type/Signal.type";

const empty = (node: JQuery<HTMLElement>): void => {
  node.children().remove();
};

export default (signal: Signal, model: Model, root: JQuery<HTMLElement>): void => {
  const handleLower = new Handle({
    name: model.name,

    className: "range__handle range__handle--lower",
    signal: signal,

    min: model.min,
    max: model.max,
    pos: model.from,
    step: model.step,

    allowedMax: typeof model.to === "number"
      ? model.to
      : model.max,

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
  });

  const handleUpper = new Handle({
    name: model.name,

    className: "range__handle range__handle--upper",
    signal: signal,

    min: model.min,
    max: model.max,
    pos: model.to,
    step: model.step,

    allowedMin: typeof model.from === "number"
      ? model.from
      : model.min,

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
  })

  const arrowBtnLeft = model.arrowBtns && model.arrowBtns.left
    ? btnArrow(
      "left",
      {
        className: model.arrowBtns.left.className,
        signal: signal,

        min: model.min,
        max: model.max,
        pos: model.from,
        step: model.step,
      },
      model.arrowBtns.left.children
    )
    : null;

  const arrowBtnRight = model.arrowBtns && model.arrowBtns.right
    ? btnArrow(
      "right",
      {
        className: model.arrowBtns.right.className,
        signal: signal,

        min: model.min,
        max: model.max,
        pos: model.from,
        step: model.step,
      },
      model.arrowBtns.right.children
    )
    : null;

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
    base(
      {
        className: "range__base",
        colors: model.colors,

        vertical: model.vertical,

        percentages: model.percentages
      },
      handleLower.init()
    ).append(
      model.to && model.baseWidth
        ? handleUpper.init()
        : null
    )
  );

  empty(root);
  root.append(
    arrowBtnLeft,
    rangeComponent,
    arrowBtnRight
  );
};
