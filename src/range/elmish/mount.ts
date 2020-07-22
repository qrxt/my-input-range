// Types
import Signal from "@type/Signal.type";

// Interfaces
import Model from "@interfaces/Model.interface";
import Payload from "@interfaces/Payload.interface";

// Elmish
import update from "./update";
import view from "./view";

import MyRange from "../range";

export default (model: Model, range: MyRange): Signal => {
  const signal: Signal = (action: string, payload?: Payload): void => {
    model = update(model, action, payload); // mut

    range.value = model.from;

    view(signal, model, range.node);
  };

  view(signal, model, range.node);

  return signal;
};
