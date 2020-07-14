import * as $ from "jquery";

import Range from "./range";

import "./page.css";

// Elems

const rangeElemHorizontal = $(".js-range-example-horizontal");
const rangeElemVertical = $(".js-range-example-vertical");

const rangeElemRed = $(".js-range-example-red");
const rangeElemGreen = $(".js-range-example-green");
const rangeElemBlue = $(".js-range-example-blue");

// Horizontal Example Range

new Range(rangeElemHorizontal, {
  min: 1,
  max: 10,
  step: 1,
  value: 5,

  colors: [
    "rgba(0, 200, 180, 0.4)",
    "rgba(200, 10, 180, 0.4)"
  ]
}).init();

// Vertical Example Range

new Range(rangeElemVertical, {
  min: 2,
  max: 6,
  step: 1,
  value: 4,

  vertical: true,

  colors: [
    "rgba(80, 0, 220, 0.4)",
    "rgba(0, 0, 255, 0.4)"
  ]
}).init();

// RGB Colorpicker

const redColor = [ "#c0392b", "#ff9287" ];
const greenColor = [ "#27ae60", "#6fd39b" ];
const blueColor = [ "#2980b9", "#72b0d9" ];

const defaultRangeOptions = {
  vertical: true,

  min: 0,
  max: 255,

  value: 128
}

const rangeRed = new Range(rangeElemRed, { ...defaultRangeOptions, colors: redColor });
const rangeGreen = new Range(rangeElemGreen, { ...defaultRangeOptions, colors: greenColor });
const rangeBlue = new Range(rangeElemBlue, { ...defaultRangeOptions, colors: blueColor });

[ rangeRed, rangeGreen, rangeBlue ]
  .forEach(range => range.init());
