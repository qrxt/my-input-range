import Payload from "@interfaces/Payload.interface";

export default interface Props {
  className?: string

  signal?: (action: string, payload: Payload) => void
}
