// Types

import Signal from "@type/Signal.type";

export default interface Props {
  signal?: Signal

  className?: string

  percent?: number,

  step?: number,

  colors?: Array<string>
}
