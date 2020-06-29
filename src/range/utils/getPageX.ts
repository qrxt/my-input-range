export default (evt: JQuery.Event): number => {
  const isMouseEvt = evt.type === "mousemove";
  const isTouchEvt = evt.type === "touchmove";

  if (isMouseEvt) {
    return evt.pageX;
  }

  if (isTouchEvt) {
    return evt.touches[0].pageX
  }
};
