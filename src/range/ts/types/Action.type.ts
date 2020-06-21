import Model from "../interfaces/Model.interface";
import Payload from "../interfaces/Payload.interface";

type Action = (model: Model, payload: Payload) => Model

export default Action;
