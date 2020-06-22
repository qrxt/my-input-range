import setValue from "./set-value";

import Action from  "@type/Action.type";

import ActionsEnum from "@enums/ActionsEnum.enums";

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
