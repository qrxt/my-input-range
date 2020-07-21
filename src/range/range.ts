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
    value
  } = options;

  const stepsSum = Math.abs(min) + Math.abs(max);
  const isValueOutOfBounds = (value < min || value > max);
  const isStepTooBig = step > stepsSum;

  return {
    ...options,

    max: max < min ? min + step : max,
    step: isStepTooBig ? stepsSum : step,
    value: isValueOutOfBounds ? Math.round(stepsSum / 2) : value,
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
      value: 3,

      vertical: false,

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
    return this.options.value;
  }

  set value (val: number) {
    this.options.value = val;
  }

  public set (val: number): void {
    this.signal(SetValue, {
      value: val
    });
  }

  init (): MyRange {
    const model: Model = {
      className: this.options.className,
      name: this.options.name,

      value: this.value,
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
