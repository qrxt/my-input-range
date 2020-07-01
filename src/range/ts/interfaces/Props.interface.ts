import Payload from "@interfaces/Payload.interface";

export default interface Props {
  signal?: (action: string, payload: Payload) => void

  className?: string

  percent?: number,

  colors?: Array<string>
}
