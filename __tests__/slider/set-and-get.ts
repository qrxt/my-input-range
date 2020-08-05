import * as $ from "jquery";

import Range from "../../src/range/range";

describe("Slider: set and get", () => {
  const singleElem = $(`
    <div class="page__range page__range--horizontal js-range-single">
      <input type="range" min="0" max="10" step="1">
    </div>
  `);

  const doubleElem = $(`
    <div class="page__range page__range--horizontal js-range-double">
      <input type="range" min="0" max="10" step="1">
    </div>
  `);

  $("body").append(singleElem);
  $("body").append(doubleElem);

  const rangeSingleElem = $(".js-range-single");
  const single = new Range(rangeSingleElem, {
    min: 3,
    max: 7,

    from: 5
  }).init();

  const rangeDoubleElem = $(".js-range-double");
  const double = new Range(rangeDoubleElem, {
    min: 0,
    max: 100,

    from: 20,
    to: 50,
  }).init();
    test("Slider should let us to get and set values (Single Slider)", () => {
      // before set
      expect(single.get()).toEqual([ 5, null ]);

      // after set
      single.set("lower", 6);

      expect(single.get()).toEqual([ 6, null ]);
    });

  test("Slider should let us to get and set values (Double Slider)", () => {
    // before set
    expect(double.get()).toEqual([ 20, 50 ]);

    // after set lower
    double.set("lower", 0);
    expect(double.get()).toEqual([ 0, 50 ]);

    // after set upper
    double.set("upper", 11);
    expect(double.get()).toEqual([ 0, 11 ]);
  });

  test("Trying to set values out of bounds (Single Slider)", () => {
      const { min, max } = single.options;

      // out of left bound
      single.set("lower", -Infinity);
      expect(single.get()).toEqual([ min, null ]);

      // out of right bound
      single.set("lower", Infinity);
      expect(single.get()).toEqual([ max, null ]);
  });

  test("Trying to set values out of bounds (Double Slider)", () => {
    const { from, to, min, max } = double.options;

    // trying to set "lower" bigger value than "upper" has
    double.set("lower", to + 100);
    expect(double.get()[0]).toBe(to);

    // trying to set "lower" value out of left bound
    double.set("lower", min - 100);
    expect(double.get()[0]).toBe(min);

    // trying to set "upper" lesser value than "lower" has
    double.set("upper", from - 100);
    expect(double.get()[0]).toBe(from);

    // trying to set "upper" value out of right bound
    double.set("upper", max + 100);
    expect(double.get()[1]).toBe(max);
  });
});
