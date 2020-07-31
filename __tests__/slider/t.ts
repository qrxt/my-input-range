import * as $ from "jquery";
import ResizeObserver from "resize-observer-polyfill";

import Range from "../../src/range/range";

global["ResizeObserver"] = ResizeObserver;

describe("Slider: t", () => {
  test("JQuery should be defined", () => {
    console.log($("body").width());

    expect($("body")).not.toBeFalsy();
  });

  test("JQuery should let me create and find elements on page", () => {
    const div = $(`<div class="find-it">oh hi</div>`);

    $("body").append(div);

    const findItElem = $(".find-it");

    console.log(findItElem);

    expect(findItElem.text()).toBe("oh hi");
  });

  test("Range should construct correctly", () => {
    const elem = $(`
      <div class="page__range page__range--horizontal js-range-example-horizontal">
        <input type="range" min="0" max="10" step="1">
      </div>
    `);

    $("body").append(elem);

    const rangeElem = $(".js-range-example-horizontal");

    const range = new Range(rangeElem, {
      min: 0,
      max: 10,

      from: 1
    });

    console.log(range);

    expect(rangeElem.length).toBeGreaterThan(0);
    expect(range).toBeTruthy();

    const initializedRange = range.init();

    expect(initializedRange).toBeTruthy();
  });
});
