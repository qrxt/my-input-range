import * as $ from "jquery";

import Range from "../../src/range/range";

describe("Slider: construct", () => {
    test("Range should construct correctly", () => {

    const elem = $(`
      <div class="page__range page__range--horizontal js-range">
        <input type="range" min="0" max="10" step="1">
      </div>
    `);

    $("body").append(elem);

    const rangeElem = $(".js-range");

    const expectedFrom = 1;
    const range = new Range(rangeElem, {
      min: 0,
      max: 10,

      from: expectedFrom
    });

    expect(rangeElem.length).toBeGreaterThan(0);
    expect(range).toBeTruthy();

    const initializedRange = range.init();

    expect(initializedRange).toBeTruthy();
    expect(initializedRange.get()[0]).toBe(expectedFrom);
  });
});
