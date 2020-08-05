// Interfaces

import Options from "@interfaces/Options.interface";
import Model from "@interfaces/Model.interface";

// Types

import Signal from "@type/Signal.type";

// Enums

import ActionsEnum from "@enums/ActionsEnum.enums";

const { SetValue } = ActionsEnum;

// Elmish

import { mount } from "./elmish";

// Utils

import normalizeValue from "@utils/normalize-value";

const normalizeConstructData = (options: Options): Options => {
  const {
    min,
    max,
    step,
    from,
    to
  } = options;

  const normalizedMax = max < min ? min + step : max
  const stepsSum = Math.abs(min) + Math.abs(normalizedMax);
  const isStepTooBig = step > stepsSum;

  return {
    ...options,

    max: normalizedMax,
    step: isStepTooBig ? stepsSum : step,
    from: from ? normalizeValue(min, max, from) : null,
    to: to ? normalizeValue(min, max, to) : null
  };
};

export default class MyRange {
  public readonly node: JQuery<HTMLElement>;
  public readonly range: JQuery<HTMLElement>;
  public readonly options: Options;
  private signal: null | Signal;

  constructor (node: JQuery<HTMLElement>, options: Options) {
    this.node = node;
    this.signal = null;
    this.range = this.node.find("input[type='range']");
    this.options = normalizeConstructData({
      className: null,
      name: "range-nameless",

      min: 0,
      max: 5,
      step: 1,
      from: 3,
      to: null,

      vertical: false,
      percentages: [],

      onChange: null,
      onSlide: null,
      onDraw: null,
      onLoad: null,
      onPress: null,
      onResize: null,

      arrowBtns: null,

      colors: null,

      ...options
    });
  }

  public get (): Array<number> {
    const { from, to } = this.options;

    return [ from, to ];
  }

  public set (handle: "lower" | "upper", val: number): void {
    const { from, to, min, max } = this.options;

    const isRange = typeof to === "number";

    const setUpper = (val: number): void => {
      const fixedTo = normalizeValue(from, this.options.max, val);

      this.options.to = fixedTo;

      this.signal(SetValue, {
        to: fixedTo
      });
    };



    const setLower = (val: number): void => {
      if (isRange) {
        const fixedFrom = normalizeValue(min, to, val);

        this.options.from = fixedFrom;

        this.signal(SetValue, {
          from: fixedFrom
        });
      } else {
        const fixedFrom = normalizeValue(min, max, val)
        this.options.from = fixedFrom;

        this.signal(SetValue, {
          from: fixedFrom
        });
      }
    };

    if (handle === "lower") {
      setLower(val);
    }

    if (handle === "upper") {
      setUpper(val);
    }
  }

  init (): MyRange {
    const model: Model = {
      className: this.options.className,
      name: this.options.name,

      from: this.options.from,
      to: this.options.to,

      min: this.options.min,
      max: this.options.max,
      step: this.options.step,

      vertical: this.options.vertical,

      onChange: this.options.onChange,
      onSlide: this.options.onSlide,
      onDraw: this.options.onDraw,
      onLoad: this.options.onLoad,
      onPress: this.options.onPress,
      onResize: this.options.onResize,

      arrowBtns: this.options.arrowBtns,

      baseWidth: null,
      handleWidth: null,

      colors: this.options.colors
    };

    this.signal = mount(model, this);

    return this;
  }
}
