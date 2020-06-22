import Model from "@interfaces/Model.interface";

export default (model: Model, root: JQuery<HTMLElement>): void => {
  const range = root.find("input[type='range']");

  range.val(model.value);
};
