import update from "./update";
import view from "./view";

import Model from "../ts/interfaces/Model.interface";
import Payload from "../ts/interfaces/Payload.interface";
import MyRange from "../range";

export default (model: Model, range: MyRange): void => {
  const signal = (action: string, payload?: Payload) => {
    model = update(model, action, payload); // mut
    range.value = model.value;

    view(model, range.node);
  };

  range.range.on("change", () => {
    const nextRangeValue = Number(range.range.val());

    signal("SET_VALUE", {
      value: nextRangeValue
    });
  });

  view(model, range.node);
};
