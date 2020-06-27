// Interfaces

import Model from "@interfaces/Model.interface";
import Payload from "@interfaces/Payload.interface";

// Enums

import ActionsEnum from "@enums/ActionsEnum.enums";

// Elements

import div from "./elements/div";
import handle from "./elements/handle";

const empty = (node: JQuery<HTMLElement>): void => {
  node.children().remove();
};

export default (signal: (action: string, payload: Payload) => void, model: Model, root: JQuery<HTMLElement>): void => {
  empty(root);

  root.append(
    div(
      { className: "range" },
      div(
        { className: "range__base" },
        handle({
          className: "range__handle range__handle--lower",
          signal: signal
        })
      )
    )
  );
};
