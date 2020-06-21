import Model from "../../ts/interfaces/Model.interface";
import Payload from "../../ts/interfaces/Payload.interface";

export default (model: Model, payload: Payload): Model => {
  const { value }: { value?: number } = payload;

  return {
    ...model,
    value
  };
};
