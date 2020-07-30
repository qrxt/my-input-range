// Types

import Model from "@interfaces/Model.interface";
import Signal from "@type/Signal.type";

// Elements

import btnArrow from "./btn-arrow";

export default (model: Model, signal: Signal): JQuery<HTMLElement> =>
  model.arrowBtns && model.arrowBtns.right
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
