import * as $ from "jquery";

import Range from "../../src/range/range";

describe("Slider: render", () => {
  const elemSingle = $(`
    <div class="page__range page__range--horizontal js-range-single">
      <input type="range" min="0" max="10" step="1">
    </div>
  `);
  const elemDouble = $(`
    <div class="page__range page__range--horizontal js-range-double">
      <input type="range" min="0" max="10" step="1">
    </div>
  `);

  $("body").append(elemSingle);
  $("body").append(elemDouble);

  const rangeSingleElem = $(".js-range-single");
  const rangeDoubleElem = $(".js-range-double");

  new Range(rangeSingleElem, {
    min: 0,
    max: 10,

    from: 3
  }).init();

  new Range(rangeDoubleElem, {
    min: 123,
    max: 148,

    from: 144,
    to: 147
  }).init();

  test("Range should have base & handles (Single)", () => {
    expect($(".js-range-single .range__base").length).toBeTruthy();
    expect($(".js-range-single .range__handle").length).toBeTruthy();
  });

  test("Range should have base & handles (Double)", () => {
    expect($(".js-range-double .range__base").length).toBeTruthy();
    expect($(".js-range-double .range__handle").length).toBeTruthy();
  });
});
