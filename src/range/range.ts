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

const normalize = (options: Options): Options => {
  const {
    min,
    max,
    step,
    from
  } = options;

  const stepsSum = Math.abs(min) + Math.abs(max);
  const isValueOutOfBounds = (from < min || from > max);
  const isStepTooBig = step > stepsSum;

  return {
    ...options,

    max: max < min ? min + step : max,
    step: isStepTooBig ? stepsSum : step,
    from: isValueOutOfBounds ? Math.round(stepsSum / 2) : from,
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
    this.options = normalize({
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

  get value (): number {
    return this.options.from;
  }

  set value (val: number) {
    this.options.from = val;
  }

  public set (handle: "lower" | "upper", val: number): void {
    const { from, to } = this.options;

    const isRange = typeof to === "number";

    if (isRange) {
      if (handle === "lower") {
        const fixedFrom = val <= to
          ? val
          : to;

        this.signal(SetValue, {
          from: fixedFrom
        });
      } else if (handle === "upper") {
        const fixedTo = val >= from
          ? val
          : from;

        this.signal(SetValue, {
          to: fixedTo
        });
      }
    } else {
      this.signal(SetValue, {
        from: val
      });
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
