//     const { elem: handleElem, pos } = handle;
//     const value = (pos + handleElem.width() / 2) / parent.width();
//     const percent = value * 100;

export default (partial: number, total: number): number =>
  (partial / total) * 100
