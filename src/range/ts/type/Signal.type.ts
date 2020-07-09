// Interfaces

import Payload from "@interfaces/Payload.interface";

type Signal = (action: string, payload?: Payload, rerender?: boolean) => void

export default Signal;
