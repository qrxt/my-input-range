// Interfaces

import BaseProps from "@interfaces/BaseProps.interface";

// Elements

import div from "@elements/div";

// Utils

import setBgGradient from "@utils/setBgGradient";

export default (props: BaseProps, children: JQuery<HTMLElement>): JQuery<HTMLElement> => {
  const {
    className,
    percent,
    colors
  } = props;

  const base = div({
    className
  }, children);

  setBgGradient(
    base,
    colors,
    percent
  )

  return base;
}
