const buildColorStopsString = (colors: Array<string>, fromPercentage: number, toPercentage?: number): string =>
  colors
    .map((color, idx): string => {
      const currentPercentage = (fromPercentage / (colors.length - 1)) * idx;

      const lastIdx = colors.length - 1;

      if (idx === lastIdx) {
        return `${ color } ${ currentPercentage }%,
        transparent ${ currentPercentage }%`
      }

      return `${ color } ${ currentPercentage }%,`;
    })
    .join(" ");

const buildDoubleGradientString = (colors: Array<string>, from: number, to: number): string => {
  const map = colors.map((color, idx): string => {
    const lastIdx = colors.length - 1;
    const percentagesDifference = to - from;
    const distanceBetweenColors = percentagesDifference / (colors.length - 1) * idx;

    if (idx === 0) {
      return `${ color } ${ from }%,`
    }

    if (idx === lastIdx) {
      return `${ color } ${ to }%`
    }

    return `${ color } ${ from + distanceBetweenColors }%,`;
  })

  return `transparent 0%,
    transparent ${ from }%,
    ${ map.join(" ") },
    transparent ${ to }%
  `;
};

export default (elem: JQuery<HTMLElement>, colors: Array<string>, percentages: Array<number>, isVertical: boolean): void => {
  if (!colors) {
    return;
  }

  const fromPercentage = percentages[0];
  const toPercentage = percentages[1];

  const gradientDirection = isVertical
    ? "to top"
    : "to right";

  const gradientString = colors.length > 1
    ? `linear-gradient(${ gradientDirection },
      ${ buildColorStopsString(colors, fromPercentage, toPercentage) }
    )`
    : `linear-gradient(
      ${ gradientDirection },
      ${ colors[0] } 0%,
      ${ colors[0] } ${ fromPercentage }%,
      transparent ${ fromPercentage }%
    )`.replace(/\s+/g, " ").trim();

  const doubleGradientString = colors.length > 1
    ? `linear-gradient(
      ${ gradientDirection },
      ${ buildDoubleGradientString(colors, fromPercentage, toPercentage) }
    )`
    : `linear-gradient(
      ${ gradientDirection },
      transparent 0%,
      transparent ${ fromPercentage }%,
      ${ colors[0] } ${ fromPercentage }%,
      ${ colors[0] } ${ toPercentage }%,
      transparent ${ toPercentage }%
    )`.replace(/\s+/g, " ").trim();

  if (typeof toPercentage === "number") {
    elem.css({
      background: doubleGradientString
    })
  } else {
    elem
      .css({
        background: gradientString,
      });
  }
};
