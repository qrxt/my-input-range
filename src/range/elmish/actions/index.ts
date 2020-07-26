import setValue from "./set-value";
import setModel from "./set-model";
import init from "./init";
import setBaseWidth from "./set-basewidth";
import redraw from "./redraw";

import Action from  "@type/Action.type";

import ActionsEnum from "@enums/ActionsEnum.enums";

const {
  SetValue,
  SetModel,
  Init,
  Redraw,
  SetBaseWidth
} = ActionsEnum;

interface Actions {
  [key: string]: Action
}

const actions: Actions = {
  [ SetValue ]: setValue,
  [ SetModel ]: setModel,
  [ Init ]: init,
  [ Redraw ]: redraw,
  [ SetBaseWidth ]: setBaseWidth,
};

export default actions;
