import * as $ from "jquery";

import Range from "./range";

import "./page.css";

const rangeElem = $(".range-example");

if (rangeElem.length > 0) {
  const range = new Range(rangeElem, {
    min: 4,
    max: 12,
    step: 2,
    value: 6,

    colors: [
      "rgba(0, 200, 180, 0.4)",
      "rgba(200, 10, 180, 0.4)"
    ]
  });

  range.init();
}
