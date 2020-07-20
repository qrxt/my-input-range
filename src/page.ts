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

const inputNumber = $(".page__input-number");
const regularRange = new Range(rangeElemHorizontal, {
  min: 1,
  max: 10,
  step: 1,
  value: 5,

  colors: [
    "rgba(0, 200, 180, 0.4)",
    "rgba(200, 10, 180, 0.4)"
  ],

  arrowBtns: {
    left: {
      className: "page__arrow-btn page__arrow-btn--left",
      children: "<"
    },

    right: {
      className: "page__arrow-btn page__arrow-btn--right",
      children: ">"
    }
  },

  onResize: (entry, name) => {
    console.log(entry, name)
  },

  onChange: values => {
    inputNumber.val(values[0])
  }
}).init();

inputNumber.on("change", () => {
  const inputValue = Number(inputNumber.val());

  regularRange.set(inputValue);
});

// Vertical Example Range

new Range(rangeElemVertical, {
  name: "range-annoying",

  min: 2,
  max: 6,
  step: 1,
  value: 4,

  vertical: true,

  onChange: (values) => {
    console.log(values);
  },

  onLoad: (_, name) => {
    console.log("i'm loaded! My name is", name)
  },

  onPress: (values, name, handle) => {
    console.log(values, name, handle.width())
  },

  colors: [
    "rgba(80, 0, 220, 0.4)",
    "rgba(0, 0, 255, 0.4)"
  ]
}).init();

// RGB Colorpicker

const palette = $(".page__color");

const toHex = (dec: number): string => {
  const hex = dec.toString(16);

  return hex.length === 1
    ? `0${ hex }`
    : hex;
};

const toDec = (hex: string) =>
  parseInt(hex, 16);

const updatePaletteColor = (values: Array<number>, name: string): void => {
  const value = toHex(values[0]);
  const colorName = name.split("-")[2];
  const paletteColor = palette.val().toString();

  const paletteColorRed = paletteColor.slice(1, 3);
  const paletteColorGreen = paletteColor.slice(3, 5);
  const paletteColorBlue = paletteColor.slice(5, 7);

  const colorResults: { [key: string]: string } = {
    red: `#${ value }${ paletteColorGreen }${ paletteColorBlue }`,
    green: `#${ paletteColorRed }${ value }${ paletteColorBlue }`,
    blue: `#${ paletteColorRed }${ paletteColorGreen }${ value }`,
  };

  console.log(values);

  palette.val(
    colorResults[colorName]
  );
};

const redColor = [ "#c0392b", "#ff9287" ];
const greenColor = [ "#27ae60", "#6fd39b" ];
const blueColor = [ "#2980b9", "#72b0d9" ];

const defaultColorRangeOptions = {
  vertical: true,

  min: 0,
  max: 255,

  onSlide: updatePaletteColor,
  onLoad: updatePaletteColor,

  value: 127
}

const rangeRed = new Range(rangeElemRed, {
  ...defaultColorRangeOptions,
  name: "range-color-red",
  colors: redColor
});
const rangeGreen = new Range(rangeElemGreen, {
  ...defaultColorRangeOptions,
  name: "range-color-green",
  colors: greenColor
});
const rangeBlue = new Range(rangeElemBlue, {
  ...defaultColorRangeOptions,
  name: "range-color-blue",
  colors: blueColor
});

[ rangeRed, rangeGreen, rangeBlue ]
  .forEach(range => range.init());

palette.on("change", () => {
  const newColor = palette.val().toString();

  const red = toDec(newColor.slice(1, 3));
  const green = toDec(newColor.slice(3, 5));
  const blue = toDec(newColor.slice(5, 7));

  rangeRed.set(red);
  rangeGreen.set(green);
  rangeBlue.set(blue);
});
