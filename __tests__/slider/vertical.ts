import * as $ from "jquery";

import Range from "../../src/range/range";

describe("Vertical slider should work correctly", () => {
  test("Range should construct correctly", () => {
    const elem = $(`
      <div class="page__range page__range--horizontal js-range">
        <input type="range" min="0" max="10" step="1">
      </div>
    `);

    $("body").append(elem);

    const rangeElem = $(".js-range");

    const range = new Range(rangeElem, {
      vertical: true,
      min: 0,
      max: 10,

      from: 1
    });

    const initializedRange = range.init();

    expect(initializedRange).toBeTruthy();

    // Trying to set value
    initializedRange.set("lower", 9);
    initializedRange.set("upper", 10);

    expect(initializedRange.get()).toEqual([ 9, 10 ]);
  });
});
