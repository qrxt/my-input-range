// // Interfaces

// import Props from "@interfaces/Props.interface";

// Types

import Children from "@type/Children.type";

// Elements

import btn from "@elements/btn";

export default
  (className: string | null, children: Children): JQuery<HTMLElement> => {
    const classNameWithDefault = `range__btn-arrow range__btn-arrow--left ${ className }`;
    const btnArrow = btn({ className: classNameWithDefault }, children);

    btnArrow.on("click", () => {
      console.log("clicked");
    });

    return btnArrow;
  };
