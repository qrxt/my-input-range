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
    width,
    vertical,
    onResize,
    name
  } = props;

  const verticalClassname = vertical ? "range--vertical" : null;
  const modifiedClassname = `${ className } ${ verticalClassname }`;

  const range = div({
    className: modifiedClassname
  }, children);

  const observer: ResizeObserver = new ResizeObserver((entries) => {
    for (const entry of entries) {
      const afterResizeWidth = vertical
        ? entry.contentRect.height
        : entry.contentRect.width
      const isRendered = afterResizeWidth !== 0;
      const threshold = 3;
      const widthsSub = Math.abs(width - afterResizeWidth);
      if (width && isRendered && widthsSub > threshold) {
        // Event on resize
        if (onResize) {
          onResize(entry.contentRect, name);
        }

        signal(SetBaseWidth, { baseWidth: afterResizeWidth })
      }
    }
  });

  observer.observe(range.get(0));

  return range;
}
