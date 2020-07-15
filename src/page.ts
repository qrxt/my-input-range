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

  onChange: (values) => {
    console.log(values);
  },

  colors: [
    "rgba(80, 0, 220, 0.4)",
    "rgba(0, 0, 255, 0.4)"
  ]
}).init();

// RGB Colorpicker

const palette = $(".page__color");

const setPaletteColor = (color: string, value: number): void => {
  const bgColorString = palette.css("background-color");

  const regexp = /rgba?\((\d{1,3}), ?(\d{1,3}), ?(\d{1,3})\)?(?:, ?(\d(?:\.\d?))\))?/u;
  const match = regexp.exec(bgColorString);

  const red = match[1];
  const green = match[2];
  const blue = match[3];

  const updatedColorResults: { [key: string]: string } = {
    red: `rgb(${ value }, ${ green }, ${ blue })`,
    green: `rgb(${ red }, ${ value }, ${ blue })`,
    blue: `rgb(${ red }, ${ green }, ${ value })`
  };

  palette.css({
    backgroundColor: updatedColorResults[color],
    boxShadow: `0 0 10px ${ updatedColorResults[color] }`
  });
};

const redColor = [ "#c0392b", "#ff9287" ];
const greenColor = [ "#27ae60", "#6fd39b" ];
const blueColor = [ "#2980b9", "#72b0d9" ];

const updatePalette = (values: Array<number>, name: string) => {
  const color = name.split("-")[2];

  setPaletteColor(color, values[0]);
};

const defaultRangeOptions = {
  vertical: true,

  min: 0,
  max: 255,

  onSlide: updatePalette,
  onLoad: updatePalette,

  value: 127
}

const rangeRed = new Range(rangeElemRed, {
  ...defaultRangeOptions,
  name: "range-color-red",
  colors: redColor
});
const rangeGreen = new Range(rangeElemGreen, {
  ...defaultRangeOptions,
  name: "range-color-green",
  colors: greenColor
});
const rangeBlue = new Range(rangeElemBlue, {
  ...defaultRangeOptions,
  name: "range-color-blue",
  colors: blueColor
});

[ rangeRed, rangeGreen, rangeBlue ]
  .forEach(range => range.init());
