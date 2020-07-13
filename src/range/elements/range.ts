import ResizeObserver from "resize-observer-polyfill";

// Interfaces

import Props from "@interfaces/Props.interface";

// Enums

import ActionsEnum from "@enums/ActionsEnum.enums";

const { SetBaseWidth } = ActionsEnum;

// Elements

import div from "@elements/div";

export default (props: Props, children: JQuery<HTMLElement>): JQuery<HTMLElement> => {
  const {
    className,
    signal,
    width
  } = props;

  const range = div({
    className
  }, children);

  const observer: ResizeObserver = new ResizeObserver((entries) => {
    for (const entry of entries) {
      const afterResizeWidth = entry.contentRect.width
      const isRendered = afterResizeWidth !== 0;
      const threshold = 3;
      const widthsSub = Math.abs(width - afterResizeWidth);
      if (width && isRendered && widthsSub > threshold) {
        signal(SetBaseWidth, { baseWidth: afterResizeWidth })
      }
    }
  });

  observer.observe(range.get(0));

  return range;
}
