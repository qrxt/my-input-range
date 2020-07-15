// Types

import OnChange from "@type/OnChange.type";
import OnSlide from "@type/OnSlide.type";

export default interface Options {
  name?: string,

  min?: number,
  max?: number,
  step?: number,
  value?: number,

  vertical?: boolean,

  onChange?: OnChange,
  onSlide?: OnSlide,

  colors?: Array<string>
}
