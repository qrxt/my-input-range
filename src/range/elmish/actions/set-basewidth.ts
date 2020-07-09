import Model from "@interfaces/Model.interface";
import Payload from "@interfaces/Payload.interface";

export default (model: Model, payload: Payload): Model => {
  const { baseWidth }: {
    baseWidth?: number
  } = payload;

  return {
    ...model,
    baseWidth
  };
};
