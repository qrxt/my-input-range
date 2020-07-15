// Types

import OnChange from "@type/OnChange.type";
import OnSlide from "@type/OnSlide.type";
import OnLoad from "@type/OnLoad.type";

export default interface Model {
  name?: string,

  value?: number
  percent?: number,

  min?: number,
  max?: number,
  step?: number,

  vertical?: boolean,

  onChange?: OnChange,
  onSlide?: OnSlide,
  onLoad?: OnLoad,

  handleWidth: number | null,
  baseWidth: number | null,

  colors?: Array<string>
}
