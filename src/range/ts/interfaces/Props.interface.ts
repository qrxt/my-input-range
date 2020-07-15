// Types

import Signal from "@type/Signal.type";
import OnChange from "@type/OnChange.type";
import OnSlide from "@type/OnSlide.type";
import OnLoad from "@type/OnLoad.type";

export default interface Props {
  name?: string,

  signal?: Signal

  width?: number,
  vertical?: boolean,

  className?: string

  percent?: number,

  step?: number,

  onChange?: OnChange,
  onSlide?: OnSlide,
  onLoad?: OnLoad,

  colors?: Array<string>
}
