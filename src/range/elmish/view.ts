export default (model, root) => {
  const range = root.find("input[type='range']");

  range.val(model.value);
};
