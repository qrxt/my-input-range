import { mount } from "./elmish";
import Model from "@interfaces/Model.interface";

// Interfaces

import Options from "@interfaces/Options.interface";

export default class MyRange {
  node: JQuery<HTMLElement>;
  range: JQuery<HTMLElement>;
  options: Options;

  constructor (node: JQuery<HTMLElement>, options: Options) {
    this.node = node;
    this.range = this.node.find("input[type='range']")
    this.options = {
      min: 0,
      max: 10,
      value: 5,

      colors: null,

      ...options
    };
  }

  get value(): number {
    return this.options.value;
  }

  set value(val: number) {
    this.options.value = val;
  }

  init (): void {
    const model: Model = {
      value: this.value,
      min: this.options.min,
      max: this.options.max,

      baseWidth: null,
      handleWidth: null,

      colors: this.options.colors
    };

    mount(model, this);
  }
}
