import * as $ from "jquery";

import Range from "../../src/range/range";

describe("Slider: construct", () => {
  const elem1 = $(`
    <div class="page__range page__range--horizontal js-range-1">
      <input type="range" min="0" max="10" step="1">
    </div>
  `);

  const elem2 = $(`
    <div class="page__range page__range--horizontal js-range-2">
      <input type="range" min="0" max="10" step="1">
    </div>
  `);

  $("body").append(elem1);
  $("body").append(elem2);

  const rangeElem1 = $(".js-range-1");
  const rangeElem2 = $(".js-range-2");

  const rangeWithIncorrectMax = new Range(rangeElem1, {
    min: 0,
    max: -10,

    step: 100000,

    from: -1000
  });

  const rangeWithIncorrectStep = new Range(rangeElem2, {
    min: 0,
    max: 10,

    step: 41.5,
    from: Infinity
  });

  test("Value (from / to) can't be out of bounds", () => {
    const { min: min1, from: from1 } = rangeWithIncorrectMax.options;
    const { max: max2, from: from2 } = rangeWithIncorrectStep.options;

    expect(from1).toBe(min1);
    expect(from2).toBe(max2);
  })

  test("Maximum value cant be lesser than minimum", () => {
    const { min, max } = rangeWithIncorrectMax.options;

    expect(max).toBeGreaterThanOrEqual(min);
  });

  test("Step cant be greater than sum of min and max #1", () => {
    const { min, max, step } = rangeWithIncorrectMax.options;

    const sum = Math.abs(max) + Math.abs(min);

    expect(step).toBe(sum);
  });

  test("Step cant be greater than sum of min and max #2", () => {
    const { min, max, step } = rangeWithIncorrectStep.options;

    const sum = Math.abs(max) + Math.abs(min);

    expect(step).toBe(sum);
  });
});
