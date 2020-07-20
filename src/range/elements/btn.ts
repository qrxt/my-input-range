// Interfaces

import Props from "@interfaces/Props.interface";

// Types

import Children from "@type/Children.type";

import element from "@elements/element";

export default
  (props: Props, children: Children): JQuery<HTMLElement> => {
    return element("button", props, children);
  };
