// Interfaces

import BaseProps from "@interfaces/BaseProps.interface";

// Elements

import div from "@elements/div";

export default (props: BaseProps, children: JQuery<HTMLElement>): JQuery<HTMLElement> => {
  const {
    className,
    percent
  } = props;

  const base = div({
    className
  }, children);

  base.css({
    background: `-webkit-gradient(linear, left top, right top,
      color-stop(${ percent }%, #ff0000),
      color-stop(${ percent }%, transparent)
      )`,
  });

  return base;
}
