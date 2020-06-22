// Interfaces
import Model from "@interfaces/Model.interface";
import Payload from "@interfaces/Payload.interface";

// Enums
import ActionsEnum from "@enums/ActionsEnum.enums";

const { SetValue } = ActionsEnum;

// Elmish
import update from "./update";
import view from "./view";

import MyRange from "../range";

export default (model: Model, range: MyRange): void => {
  const signal = (action: string, payload?: Payload) => {
    model = update(model, action, payload); // mut
    range.value = model.value;

    view(model, range.node);
  };

  range.range.on("change", () => {
    const nextRangeValue = Number(range.range.val());

    signal(SetValue, {
      value: nextRangeValue
    });
  });

  view(model, range.node);
};
