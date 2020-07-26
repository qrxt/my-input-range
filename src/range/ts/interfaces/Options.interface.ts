// Interfaces

import ArrowBtns from "@interfaces/ArrowBtns.interface";

// Types

import OnChange from "@type/OnChange.type";
import OnSlide from "@type/OnSlide.type";
import onDraw from "@type/onDraw.type";
import OnLoad from "@type/OnLoad.type";
import OnPress from "@type/OnPress.type";
import OnResize from "@type/OnResize.type";

export default interface Options {
  className?: string,
  name?: string,

  min?: number,
  max?: number,
  step?: number,

  from?: number,
  to?: number | null,
  percentages?: Array<number>,

  vertical?: boolean,

  onChange?: OnChange,
  onSlide?: OnSlide,
  onDraw?: onDraw,
  onLoad?: OnLoad,
  onPress?: OnPress,
  onResize?: OnResize,

  arrowBtns?: null | ArrowBtns,

  colors?: Array<string>
}
