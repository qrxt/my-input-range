// Types

import Model from "@interfaces/Model.interface";
import Signal from "@type/Signal.type";

// Elements

import btnArrow from "./btn-arrow";

export default (model: Model, signal: Signal): JQuery<HTMLElement> =>
  model.arrowBtns && model.arrowBtns.left
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


