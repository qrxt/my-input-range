// Interfaces

import Props from "@interfaces/Props.interface";

export default interface HandleProps extends Props {
  pos?: number
  min?: number,
  max?: number,

  allowedMin?: number,
  allowedMax?: number,

  handleWidth: number | null,
  baseWidth: number | null
}
