// Interfaces

import Model from "@interfaces/Model.interface";
import Payload from "@interfaces/Payload.interface";

// Elements

import div from "@elements/div";
import base from "@elements/base";
import handle from "@elements/handle";

const empty = (node: JQuery<HTMLElement>): void => {
  node.children().remove();
};

export default (signal: (action: string, payload?: Payload, rerender?: boolean) => void, model: Model, root: JQuery<HTMLElement>): void => {
  empty(root);

  root.append(
    div(
      { className: "range" },
      base(
        {
          className: "range__base",
          colors: model.colors,

          percent: model.percent
        },
        handle({
          className: "range__handle range__handle--lower",
          signal: signal,

          min: model.min,
          max: model.max,
          pos: model.value,

          handleWidth: model.handleWidth,
          baseWidth: model.baseWidth,

          colors: model.colors,
        })
      )
    )
  );
};
