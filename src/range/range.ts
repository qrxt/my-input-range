import { mount } from "./elmish";
import Model from "@interfaces/Model.interface";

interface Options {
  value?: number
}

export default class MyRange {
  node: JQuery<HTMLElement>;
  range: JQuery<HTMLElement>;
  options: Options;

  constructor (node: JQuery<HTMLElement>, options: Options) {
    this.node = node;
    this.range = this.node.find("input[type='range']")
    this.options = {
      value: 50,

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
      value: this.value
    };

    this.range.val(this.options.value);

    mount(model, this);
  }
}
