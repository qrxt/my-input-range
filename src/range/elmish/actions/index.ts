import setValue from "./set-value";

import Action from  "../../ts/types/Action.type";

import ActionsEnum from "../../ts/enums/ActionsEnum.enums";

const {
  SetValue
} = ActionsEnum;

interface Actions {
  [key: string]: Action
}

const actions: Actions = {
  [ SetValue ]: setValue
};

export default actions;
