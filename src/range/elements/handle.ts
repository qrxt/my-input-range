// Interfaces

import HandleProps from "@interfaces/HandleProps.interface";

// Enums

import ActionsEnum from "@enums/ActionsEnum.enums";

const { SetModel } = ActionsEnum;

// Elements

import div from "@elements/div";

// Utils

import moveHandleAt from "@utils/moveHandleAt";
import calcPercentage from "@utils/calcPercentage";
import setBgGradient from "@utils/setBgGradient";
import getPageX from "@utils/getPageX";

export default (props: HandleProps): JQuery<HTMLElement> => {
  const {
    signal,

    pos,
    min,
    max,

    colors,

    handleWidth,
    baseWidth
  } = props;

  const handle = div(
    props,
    null
  );

  const onHandleMove = (evt: JQuery.Event) => {
    if (evt.type === "mousemove") {
      evt.preventDefault();
      evt.stopPropagation();
    }

    // Gradient on move
    setBgGradient(
      handle.parent(),
      colors,
      calcPercentage(
        handle.position().left + handle.width() / 2,
        handle.parent().width()
      )
    );

    moveHandleAt(handle, evt);


  };

  // !move
  const normalizePos = (unitWidth: number, value: number): number =>
    Math.ceil(value / unitWidth);
  //

  const onHandleStop = (evt: JQuery.Event, target: JQuery<HTMLElement>) => {
    const isHandleOnRightBoundary = () =>
      Math.ceil(target.position().left + target.width()) === Math.ceil(target.parent().width())

    const isHandleOnLeftBoundary = () =>
      target.position().left <= 0;

    if (isHandleOnLeftBoundary()) {
      signal(SetModel, {
        value: min,
        percent: 0
      });
    } else if (isHandleOnRightBoundary()) {
      signal(SetModel, {
        value: max,
        percent: 100
      });
    } else {
      signal(SetModel, {
        value: normalizePos(
          target.parent().width() / max,
          target.position().left
        ),
        percent: (
          (target.position().left + target.width() / 2) / target.parent().width()
        ) * 100
      });
    }

    $(document).off("mousemove.range.handle touchmove.range.handle");
    $(document).off("mouseup.range.handle touchend.range.handle");
  };

  // Attach Listeners

  handle.on("mousedown.range.handle touchstart.range.handle", (evt: JQuery.Event) => {
    evt.stopPropagation();

    $(document).on(
      "mousemove.range.handle touchmove.range.handle",
      onHandleMove
    );

    $(document).on(
      "mouseup.range.handle touchend.range.handle",
      evt => onHandleStop(evt, handle)
    );

    // Gradient on press
    setBgGradient(
      handle.parent(),
      colors,
      calcPercentage(
        (pos * handle.parent().width() / max) + handle.width() / 2,
        handle.parent().width()
      )
    );
  });

  handle.on("dragstart.range.handle", () => {
    return false;
  });

  $(document).ready(() => {
    const unitWidth = handle.parent().width() / max;

    // Gradient on page load
    setBgGradient(
      handle.parent(),
      colors,
      calcPercentage(
        pos * unitWidth + handle.width() / 2,
        handle.parent().width()
      )
    );

    if (!baseWidth) {
      handle.css({
        left: pos * unitWidth
      });

      signal(SetModel, {
        handleWidth: handle.width(),
        baseWidth: handle.parent().width(),
      }, false);
    }
  })

  // Preinit

  if (pos === max) {
    handle.css({
      left: (pos * (baseWidth / max)) - handleWidth
    });
  } else {
    handle.css({
      left: pos * (baseWidth / max)
    });
  }

  handle.attr("tabindex", 0);

  return handle;
}
