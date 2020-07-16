// Interfaces

import Payload from "@interfaces/Payload.interface";

type Signal = (action: string, payload?: Payload) => void

export default Signal;
