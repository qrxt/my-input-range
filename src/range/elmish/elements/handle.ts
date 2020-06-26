import "./div";
// Interfaces

import Props from "@interfaces/Props.interface";

// Elements

import div from "./div";

const moveAt = (elem: JQuery<HTMLElement>, evt: JQuery.Event): void => {
  evt.preventDefault();

  const leftBoundaryX = elem.parent().offset().left;
  const rightBoundaryX = elem.parent().width() + leftBoundaryX;

  const pageX = evt.pageX || evt.touches[0].pageX;

  if (pageX >= leftBoundaryX && pageX <= rightBoundaryX) {
    elem.css({
      left: (pageX) - (elem.get(0).offsetWidth / 2 + 10)
    });
  }

  // evt.touches[0].pageX
};

export default (props: Props): JQuery<HTMLElement> => {
  const handle = div(
    {
      ...props
    },
    null
  );

  const onDocumentMouseMove = (evt: JQuery.Event) => {
    moveAt(handle, evt)
  };

  const onDocumentMouseUp = () => {
    handle.css({
      zIndex: 0
    });

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

    console.log("touch start")

    handle.css({
      zIndex: 9999
    });

    type CustomJQueryEventListener = (
      type: string,
      listener: (event: JQuery.Event) => void,
      options?: { passive?: boolean }
    ) => void;

    $(document).on(
      "mousemove.range.handle touchmove.range.handle",
      onDocumentMouseMove,
      { passive: false }
    );

    $(document).on("mouseup.range.handle touchend.range.handle", onDocumentMouseUp);
  });

  handle.on("dragstart.range.handle", () => {
    return false;
  });

  return handle;
}
