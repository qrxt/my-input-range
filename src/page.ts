import * as $ from "jquery";

import Range from "./range";

import "./page.css";

// Elems

const rangeElemHorizontal = $(".js-range-example-horizontal");
const rangeElemVertical = $(".js-range-example-vertical");
const rangeElemDouble = $(".js-range-example-double");

const rangeElemRed = $(".js-range-example-red");
const rangeElemGreen = $(".js-range-example-green");
const rangeElemBlue = $(".js-range-example-blue");

// Horizontal Example Range

const inputNumber = $(".page__input-number");
const regularRange = new Range(rangeElemHorizontal, {
  className: "page__range-horizontal",

  min: 1,
  max: 10,
  step: 1,
  from: 5,

  colors: [
    "#9C75C1",
    "#A3478F"
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

  regularRange.set("lower", inputValue);
});

// Vertical Example Range

new Range(rangeElemVertical, {
  name: "range-annoying",

  min: 2,
  max: 6,
  step: 1,
  from: 4,

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

  from: 127
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

  rangeRed.set("lower", red);
  rangeGreen.set("lower", green);
  rangeBlue.set("lower", blue);
});

// Double Example Range

const doubleRange = new Range(rangeElemDouble, {
  name: "range-double",

  min: 0,
  max: 100,

  from: 50,
  to: 70,

  onChange: (vals) => console.log(vals),

  colors: [ "green" ]
});

doubleRange.init();
