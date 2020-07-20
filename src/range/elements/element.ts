// Interfaces

import Props from "@interfaces/Props.interface";

// Types

import Children from "@type/Children.type";

export default
  (tagName: string, props: Props, children: Children): JQuery<HTMLElement> => {
    const {
      className
    } = props;

    const elem = $(`<${ tagName }>`).addClass(className);

    if (children && typeof children === "object") {
      children.appendTo(elem);
    }

    if (typeof children === "string") {
      elem.text(children);
    }

    return elem;
  }
