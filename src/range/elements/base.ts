// Interfaces

import BaseProps from "@interfaces/BaseProps.interface";

// Elements

import div from "@elements/div";

// Utils

import getStripedGradientString from "@utils/get-striped-gradient";

export default class Base {
  props: BaseProps;
  elem: JQuery<HTMLElement>;
  children: JQuery<HTMLElement>

  constructor (props: BaseProps, children?: JQuery<HTMLElement>) {
    this.props = props;
    this.children = children;

    const {
      className,
      vertical
    } = this.props;

    const modifiedClassName = vertical
      ? `${ className } range__base--vertical`
      : className;

    this.elem = div({
      className: modifiedClassName
    }, this.children);
  }

  public setGradient (colors: Array<string>, percentages: Array<number>): void {
    const { vertical } = this.props;

    const direction = vertical
      ? "to top"
      : "to right";

    const gradient = getStripedGradientString(
      direction,
      colors,
      percentages
    );

    this.elem.css({
      background: gradient
    });
  }

  init (): Base {
    const {
      percentages,
      colors
    } = this.props;

    // Gradient on load
    if (percentages && percentages.length) {
      this.setGradient(colors, percentages);
    }

    return this;
  }
}
