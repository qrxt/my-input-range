import Payload from "@interfaces/Payload.interface";

export default interface Props {
  signal?: (action: string, payload: Payload, rerender?: boolean) => void

  className?: string

  percent?: number,

  step?: number,

  colors?: Array<string>
}
