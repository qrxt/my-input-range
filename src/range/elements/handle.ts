// Interfaces

import HandleProps from "@interfaces/HandleProps.interface";

// Enums

import ActionsEnum from "@enums/ActionsEnum.enums";

const { SetValue, SetModel } = ActionsEnum;

// Elements

import div from "@elements/div";

// Utils

import moveHandleAt from "@utils/moveHandleAt";

const setBaseGradient = (handle: { elem: JQuery<HTMLElement>, pos: number }, parent: JQuery<HTMLElement>, color: string) => {
  const { elem: handleElem, pos } = handle;
  const value = (pos + handleElem.width() / 2) / parent.width();
  const percent = value * 100;

  // ! check if more than 1 handle
  handleElem
    .parent()
    .css({
      background: `-webkit-gradient(linear, left top, right top,
        color-stop(${ percent }%, ${ color }),
        color-stop(${ percent }%, transparent)
        )`,
    });
}

export default (props: HandleProps): JQuery<HTMLElement> => {
  const { signal, pos } = props;

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
    setBaseGradient(
      { elem: handle, pos: handle.position().left },
      handle.parent(),
      "#ff0000"
    );

    moveHandleAt(handle, evt)
  };

  const onHandleStop = (evt: JQuery.Event, target: JQuery<HTMLElement>) => {
    signal(SetModel, {
      value: target.position().left,
      percent: (
        (target.position().left + target.width() / 2) / target.parent().width()
      ) * 100
    });

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
    setBaseGradient(
      { elem: handle, pos: handle.position().left },
      handle.parent(),
      "#ff0000"
    );
  });

  handle.on("dragstart.range.handle", () => {
    return false;
  });

  $(document).ready(() => {
    setBaseGradient(
      { elem: handle, pos: handle.position().left },
      handle.parent(),
      "#ff0000"
    );
  })

  // Preinit
  handle.attr("tabindex", 0);

  handle.css({
    left: pos
  });

  return handle;
}
