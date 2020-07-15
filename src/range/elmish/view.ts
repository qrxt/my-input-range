// Interfaces

import Model from "@interfaces/Model.interface";

// Elements

import range from "@elements/range";
import base from "@elements/base";
import Handle from "@elements/handle";

// Types

import Signal from "@type/Signal.type";

const empty = (node: JQuery<HTMLElement>): void => {
  node.children().remove();
};

export default (signal: Signal, model: Model, root: JQuery<HTMLElement>): void => {
  empty(root);

  const handle = new Handle({
    name: model.name,

    className: "range__handle range__handle--lower",
    signal: signal,

    min: model.min,
    max: model.max,
    pos: model.value,
    step: model.step,

    vertical: model.vertical,

    onChange: model.onChange,
    onSlide: model.onSlide,
    onLoad: model.onLoad,

    handleWidth: model.handleWidth,
    baseWidth: model.baseWidth,

    colors: model.colors,
  });

  root.append(
    range(
      {
        className: "range",
        width: model.baseWidth,
        signal: signal,
        vertical: model.vertical
      },
      base(
        {
          className: "range__base",
          colors: model.colors,

          vertical: model.vertical,

          percent: model.percent
        },
        handle.init()
      )
    )
  );
};
