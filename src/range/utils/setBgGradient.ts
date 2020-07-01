const buildColorStopsString = (colors: Array<string>, percent: number): string =>
  colors
    .map((color, idx): string => {
      const currentPercentage = (percent / (colors.length - 1)) * idx;

      if (idx === colors.length - 1) {
        return `color-stop(${ currentPercentage }%, ${ color }),
        color-stop(${ currentPercentage }%, transparent)`
      }

      return `color-stop(${ currentPercentage }%, ${ color }),`;
    })
    .join("\n");


export default (elem: JQuery<HTMLElement>, colors: Array<string>, percent: number): void => {
  if (!colors) {
    return;
  }

  // ! check if more than 1 handle
  const gradient = colors.length > 1
    ?  `-webkit-gradient(linear, left top, right top,
      ${ buildColorStopsString(colors, percent) }
    )`
    : `-webkit-gradient(linear, left top, right top,
      color-stop(0%, ${ colors[0] }),
      color-stop(${ percent }%, ${ colors[0] }),
      color-stop(${ percent }%, transparent)
    )`

  elem
    .css({
      background: gradient,
    });
};
