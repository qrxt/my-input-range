import setValue from "./set-value";

import Action from  "../../ts/types/Action.type";

interface Actions {
  [key: string]: Action
}

const actions: Actions = {
  "SET_VALUE": setValue
};

export default actions;
