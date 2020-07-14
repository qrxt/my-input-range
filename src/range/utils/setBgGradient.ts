const buildColorStopsString = (colors: Array<string>, percent: number): string =>
  colors
    .map((color, idx): string => {
      const currentPercentage = (percent / (colors.length - 1)) * idx;

      if (idx === colors.length - 1) {
        return `${ color } ${ currentPercentage }%,
        transparent ${ currentPercentage }%`
      }

      return `${ color } ${ currentPercentage }%,`;
    })
    .join("\n");


export default (elem: JQuery<HTMLElement>, colors: Array<string>, percent: number, vertical = false): void => {
  if (!colors) {
    return;
  }

  const gradientDirection = vertical
    ? "to top"
    : "to right"

  const gradientString = colors.length > 1
  ?  `linear-gradient(${ gradientDirection },
    ${ buildColorStopsString(colors, percent) }
  )`
  : `linear-gradient(${ gradientDirection },
    ${ colors[0] } 0%,
    ${ colors[0] } ${ percent }%,
    transparent ${ percent }%
  )`

  // ! check if more than 1 handle

  elem
    .css({
      background: gradientString,
    });
};
