// Types
import Signal from "@type/Signal.type";

// Interfaces
import Model from "@interfaces/Model.interface";
import Payload from "@interfaces/Payload.interface";

// Elmish
import update from "./update";
import view from "./view";

import MyRange from "../range";

export default (model: Model, range: MyRange, rerender = true): Signal => {
  const signal: Signal = (action: string, payload?: Payload): void => {
    model = update(model, action, payload); // mut

    view(signal, model, range.node);
  };

  if (rerender) {
    view(signal, model, range.node);
  }

  return signal;
};
