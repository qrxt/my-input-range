import * as $ from "jquery";

import Range from "./range";

import "./page.css";

const rangeElem = $(".range-example");

if (rangeElem.length > 0) {
  const range = new Range(rangeElem, {
    value: 150,

    colors: [
      "rgba(0, 200, 180, 0.4)"
    ]
  });

  range.init();
}
