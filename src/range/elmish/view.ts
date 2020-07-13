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
    className: "range__handle range__handle--lower",
    signal: signal,

    min: model.min,
    max: model.max,
    pos: model.value,
    step: model.step,

    handleWidth: model.handleWidth,
    baseWidth: model.baseWidth,

    colors: model.colors,
  });

  root.append(
    range(
      {
        className: "range",
        width: model.baseWidth,
        signal: signal
      },
      base(
        {
          className: "range__base",
          colors: model.colors,

          percent: model.percent
        },
        handle.init()
      )
    )
  );
};
