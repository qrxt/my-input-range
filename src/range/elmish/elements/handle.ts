// Interfaces

import Props from "@interfaces/Props.interface";
import Payload from "@interfaces/Payload.interface";

// Enums

import ActionsEnum from "@enums/ActionsEnum.enums";

const { SetValue } = ActionsEnum;

// Elements

import div from "./div";

const getPageX = (evt: JQuery.Event): number => {
  const isMouseEvt = evt.type === "mousemove";
  const isTouchEvt = evt.type === "touchmove";

  if (isMouseEvt) {
    return evt.pageX;
  }

  if (isTouchEvt) {
    return evt.touches[0].pageX
  }
}

const moveAt = (elem: JQuery<HTMLElement>, evt: JQuery.Event): void => {
  const cursorX = getPageX(evt)

  const elemLeftBoundaryX = cursorX - elem.width() / 2;
  const elemRightBoundaryX = elemLeftBoundaryX + elem.width();

  const elemParentLeftBoundaryX = elem.parent().offset().left;
  const elemParentRightBoundaryX = elemParentLeftBoundaryX + elem.parent().width() + 1;

  console.log(
    `cursorX: ${ cursorX }`, "\n",
    `elem left: ${ elem.offset().left }`
  )

  const elemInBoundaries = () =>
    elemLeftBoundaryX >= elemParentLeftBoundaryX
    && elemRightBoundaryX <= elemParentRightBoundaryX;

  if (elemInBoundaries()) {
    elem.css({
      left: cursorX - (elemParentLeftBoundaryX + elem.width() / 2)
    });
  }
};

export default (props: Props): JQuery<HTMLElement> => {
  const { signal } = props;

  const handle = div(
    props,
    null
  );

  const onDocumentMouseMove = (evt: JQuery.Event) => {
    moveAt(handle, evt)
  };

  const onDocumentMouseUp = () => {
    // Action

    $(document).off("mousemove.range.handle touchmove.range.handle");
    $(document).off("mouseup.range.handle touchend.range.handle");
  };

  handle.attr("tabindex", 0);

  handle.on("keydown", (evt: JQuery.Event): void => {
    const handleLeft = handle.position().left;

    evt.preventDefault();

    if (evt.key === "ArrowRight") {
      handle.css({
        left: handleLeft + 1 // Action
      });
    }

    if (evt.key === "ArrowLeft") {
      handle.css({
        left: handleLeft - 1 // Action
      });
    }
  });

  handle.on("mousedown.range.handle touchstart.range.handle", (evt: JQuery.Event) => {
    evt.stopPropagation();

    type CustomJQueryEventListener = (
      type: string,
      listener: (event: JQuery.Event) => void,
      options?: { passive?: boolean }
    ) => void;

    $(document).on(
      "mousemove.range.handle touchmove.range.handle",
      onDocumentMouseMove
    );

    $(document).on("mouseup.range.handle touchend.range.handle", onDocumentMouseUp);
  });

  handle.on("dragstart.range.handle", () => {
    return false;
  });

  return handle;
}
