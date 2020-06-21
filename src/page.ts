import * as $ from "jquery";

import Range from "./range";

const rangeElem = $(".range-example");

if (rangeElem.length > 0) {
  const range = new Range(rangeElem, {
    value: 30
  });

  range.init();
}
