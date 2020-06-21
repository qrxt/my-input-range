import actions from "./actions";

import Model from "../ts/interfaces/Model.interface";
import Payload from "../ts/interfaces/Payload.interface";

import Action from "../ts/types/Action.type";

export default (model: Model, action: string, payload?: Payload): Model => {
  const fittingAction: Action | undefined = actions[action];

  if (fittingAction) {
    return fittingAction(model, payload);
  } else {
    console.warn("Trying to invoke undefined action")
  }

  return model;
};
