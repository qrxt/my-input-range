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
    colors,
    vertical
  } = props;

  const modifiedClassName = vertical
    ? `${ className } range__base--vertical`
    : className;

  const base = div({
    className: modifiedClassName
  }, children);

  setBgGradient(
    base,
    colors,
    percent,
    vertical
  )

  return base;
}
