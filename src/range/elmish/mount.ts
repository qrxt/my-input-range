// Interfaces
import Model from "@interfaces/Model.interface";
import Payload from "@interfaces/Payload.interface";

// Elmish
import update from "./update";
import view from "./view";

import MyRange from "../range";

export default (model: Model, range: MyRange): void => {
  const signal = (action: string, payload?: Payload, rerender = true): void => {
    model = update(model, action, payload); // mut

    console.log(model);

    range.value = model.value;

    if (rerender) {
      view(signal, model, range.node);
    }
  };

  view(signal, model, range.node);
};
