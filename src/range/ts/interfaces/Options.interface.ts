// Types

import OnChange from "@type/OnChange.type";
import OnSlide from "@type/OnSlide.type";
import onDraw from "@type/onDraw.type";
import OnLoad from "@type/OnLoad.type";
import OnPress from "@type/OnPress.type";
import OnResize from "@type/OnResize.type";

export default interface Options {
  name?: string,

  min?: number,
  max?: number,
  step?: number,
  value?: number,

  vertical?: boolean,

  onChange?: OnChange,
  onSlide?: OnSlide,
  onDraw?: onDraw,
  onLoad?: OnLoad,
  onPress?: OnPress,
  onResize?: OnResize,

  colors?: Array<string>
}
