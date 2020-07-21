// Interfaces

import ArrowBtnProps from "@interfaces/ArrowBtnProps.interface";

// Types

import Children from "@type/Children.type";

// Enums

import ActionsEnum from "@enums/ActionsEnum.enums";

const { SetValue } = ActionsEnum;

// Elements

import btn from "@elements/btn";

export default
  (direction: "left" | "right", props: ArrowBtnProps, children: Children): JQuery<HTMLElement> => {
    const { signal, className, min, max, step, pos } = props;

    const classNameWithDefault = `range__btn-arrow range__btn-arrow--${ direction } ${ className }`;
    const btnArrow = btn({ className: classNameWithDefault }, children);

    if (direction === "left") {
      btnArrow.on("click", () => {
        if (pos - step >= min) {
          const newValue = pos - step;

          signal(SetValue, { value: newValue });

          $(".range__btn-arrow--left").focus();
        }
      });
    }

    if (direction === "right") {
      btnArrow.on("click", () => {
        if (pos + step <= max) {
          const newValue = pos + step;

          signal(SetValue, { value: newValue });

          $(".range__btn-arrow--right").focus();
        }
      });
    }

    return btnArrow;
  };
