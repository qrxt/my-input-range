import setValue from "./set-value";
import setModel from "./set-model";
import init from "./init";

import Action from  "@type/Action.type";

import ActionsEnum from "@enums/ActionsEnum.enums";

const {
  SetValue,
  SetModel,
  Init,
} = ActionsEnum;

interface Actions {
  [key: string]: Action
}

const actions: Actions = {
  [ SetValue ]: setValue,
  [ SetModel ]: setModel,
  [ Init ]: init
};

export default actions;
