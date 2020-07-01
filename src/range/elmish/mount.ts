// Interfaces
import Model from "@interfaces/Model.interface";
import Payload from "@interfaces/Payload.interface";

// Elmish
import update from "./update";
import view from "./view";

import MyRange from "../range";

export default (model: Model, range: MyRange): void => {
  const signal = (action: string, payload?: Payload) => {

    model = update(model, action, payload); // mut

    range.value = model.value;

    view(signal, model, range.node);
  };

  view(signal, model, range.node);
};
