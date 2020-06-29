import setValue from "./set-value";
import setModel from "./set-model";

import Action from  "@type/Action.type";

import ActionsEnum from "@enums/ActionsEnum.enums";

const {
  SetValue,
  SetModel
} = ActionsEnum;

interface Actions {
  [key: string]: Action
}

const actions: Actions = {
  [ SetValue ]: setValue,
  [ SetModel ]: setModel
};

export default actions;
