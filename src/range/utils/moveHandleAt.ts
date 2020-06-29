import getPageX from "@utils/getPageX";

export default (elem: JQuery<HTMLElement>, evt: JQuery.Event): void => {
  const cursorX = getPageX(evt);

  const elemLeftBoundaryX = cursorX - elem.width() / 2;
  const elemRightBoundaryX = elemLeftBoundaryX + elem.width();

  const elemParentLeftBoundaryX = elem.parent().offset().left;
  const elemParentRightBoundaryX = elemParentLeftBoundaryX + elem.parent().width() + 1;

  const elemInBoundaries = () =>
    elemLeftBoundaryX >= elemParentLeftBoundaryX
    && elemRightBoundaryX <= elemParentRightBoundaryX;

  if (elemInBoundaries()) {
    elem.css({
      left: cursorX - (elemParentLeftBoundaryX + elem.width() / 2)
    });
  }

  if (cursorX < elemParentLeftBoundaryX) {
    elem.css({
      left: 0
    });
  }

  if (cursorX > elemParentRightBoundaryX) {
    elem.css({
      left: elem.parent().width() - elem.width()
    });
  }
};
