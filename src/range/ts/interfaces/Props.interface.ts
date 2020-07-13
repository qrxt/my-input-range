// Types

import Signal from "@type/Signal.type";

export default interface Props {
  signal?: Signal

  width?: number,

  className?: string

  percent?: number,

  step?: number,

  colors?: Array<string>
}
