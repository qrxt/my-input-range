// Interfaces

import ArrowBtns from "@interfaces/ArrowBtns.interface";

// Types

import OnChange from "@type/OnChange.type";
import OnSlide from "@type/OnSlide.type";
import OnDraw from "@type/OnDraw.type";
import OnLoad from "@type/OnLoad.type";
import OnPress from "@type/OnPress.type";
import OnResize from "@type/OnResize.type";

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
  onDraw?: OnDraw,
  onLoad?: OnLoad,
  onPress?: OnPress,
  onResize?: OnResize,

  arrowBtns?: null | ArrowBtns,

  handleWidth: number | null,
  baseWidth: number | null,

  colors?: Array<string>
}
