import getStripedGradientString from "@utils/get-striped-gradient";
// Types

import Direction from "@type/Direction.type";

const removeExtraSpaces = (string: string): string =>
  string.replace(/\s+/g, " ").trim();

describe("Utils: setBgGradient", () => {
  // default set with one color and one stop
  const set1 = {
    direction: "to right" as Direction,
    colors: [ "#ffe100" ],
    stops: [ 52 ]
  };
  // set with one stop and two colors
  const set2 = {
    direction: "to right" as Direction,
    colors: [ "#23ff00", "#ffe100" ],
    stops: [ 43 ]
  };
  // set with multiple stops and one color
  const set3 = {
    direction: "to right" as Direction,
    colors: [ "red" ],
    stops: [ 59, 67 ]
  };
  // set with multiple stops and colors
  const set4 = {
    direction: "to right" as Direction,
    colors: [ "yellow", "magenta", "green", "red" ],
    stops: [ 59, 67 ]
  };
  // set with vertical orientation
  const set5 = {
    direction: "to top" as Direction,
    colors: [ "green" ],
    stops: [ 17 ]
  };

  test("Should work with single color and single stop value", () => {
    const expected = "linear-gradient(to right, #ffe100 52%, transparent 52%)";

    expect(getStripedGradientString(set1.direction, set1.colors, set1.stops))
      .toBe(expected);
  });

  test("Should work with single stop value and two colors", () => {
    const expected = "linear-gradient(to right, #23ff00 0%, #ffe100 43%, transparent 43%)";

    expect(getStripedGradientString(set2.direction, set2.colors, set2.stops))
      .toBe(expected);
  });

  test("Should work with multiple stops and one color", () => {
    const expected = removeExtraSpaces(
      `linear-gradient(to right,
      transparent 0%,
      transparent 59%,
      red 59%,
      red 67%,
      transparent 67%)`
    );

    expect(getStripedGradientString(set3.direction, set3.colors, set3.stops))
      .toBe(expected);
  });

  test("Should work with multiple stops and multiple colors", () => {
    const expected = removeExtraSpaces(
      `linear-gradient(to right,
      transparent 0%,
      transparent 59%,
      yellow 59%,
      magenta 61.666666666666664%,
      green 64.33333333333333%,
      red 67%,
      transparent 67%)`
    );

    expect(getStripedGradientString(set4.direction, set4.colors, set4.stops))
      .toBe(expected);
  });

  test("Should work with different directions", () => {
    const expected = "linear-gradient(to top, green 17%, transparent 17%)";

    expect(getStripedGradientString(set5.direction, set5.colors, set5.stops))
      .toBe(expected);
  });
});
