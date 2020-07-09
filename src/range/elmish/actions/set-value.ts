import Model from "@interfaces/Model.interface";
import Payload from "@interfaces/Payload.interface";

export default (model: Model, payload: Payload): Model => {
  const { value, percent }: { value?: number, percent?: number } = payload;

  return {
    ...model,
    value,
    percent
  };
};
