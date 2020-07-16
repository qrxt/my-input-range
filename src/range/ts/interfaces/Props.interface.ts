// Types

import Signal from "@type/Signal.type";
import OnChange from "@type/OnChange.type";
import OnSlide from "@type/OnSlide.type";
import OnDraw from "@type/OnDraw.type";
import OnLoad from "@type/OnLoad.type";
import OnPress from "@type/OnPress.type";
import OnResize from "@type/OnResize.type";

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
  onDraw?: OnDraw,
  onLoad?: OnLoad,
  onPress?: OnPress,
  onResize?: OnResize,

  colors?: Array<string>
}
