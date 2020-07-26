// Interfaces

import BaseProps from "@interfaces/BaseProps.interface";

// Elements

import div from "@elements/div";

// Utils

import setBgGradient from "@utils/setBgGradient";

export default (props: BaseProps, children: JQuery<HTMLElement>): JQuery<HTMLElement> => {
  const {
    className,
    percentages,
    colors,
    vertical
  } = props;

  const modifiedClassName = vertical
    ? `${ className } range__base--vertical`
    : className;

  // console.log(modifiedClassName);

  const base = div({
    className: modifiedClassName
  }, children);

  // Gradient on load
  if (percentages && percentages.length) {
    setBgGradient(
      base,
      colors,
      percentages,
      vertical
    );
  }

  return base;
}
