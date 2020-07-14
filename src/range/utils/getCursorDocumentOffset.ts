// Types

// import Orientaion from "@type/Orientation";

export default (evt: JQuery.Event, orientation = "horizontal"): number => {
  const isMouseEvt = evt.type === "mousemove";
  const isTouchEvt = evt.type === "touchmove";

  const isVertical = orientation === "vertical";

  if (isMouseEvt) {
    return isVertical
      ? evt.pageY
      : evt.pageX;
  }

  if (isTouchEvt) {
    return isVertical
      ? evt.touches[0].pageY
      : evt.touches[0].pageX
  }
};
