import { mount } from "./elmish";
import Model from "@interfaces/Model.interface";

// Interfaces

import Options from "@interfaces/Options.interface";

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

  constructor (node: JQuery<HTMLElement>, options: Options) {
    this.node = node;
    this.range = this.node.find("input[type='range']");
    this.options = normalize({
      name: "range-nameless",

      min: 0,
      max: 5,
      step: 1,
      value: 3,

      vertical: false,

      onChange: null,

      colors: null,

      ...options
    });
  }

  get value(): number {
    return this.options.value;
  }

  set value(val: number) {
    this.options.value = val;
  }

  init (): MyRange {
    const model: Model = {
      name: this.options.name,

      value: this.value,
      min: this.options.min,
      max: this.options.max,
      step: this.options.step,

      vertical: this.options.vertical,

      onChange: this.options.onChange,
      onSlide: this.options.onSlide,

      baseWidth: null,
      handleWidth: null,

      colors: this.options.colors
    };

    mount(model, this);

    return this;
  }
}
