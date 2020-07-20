// Types

import Children from "@type/Children.type";

type ArrowBtn = { className?: null | string, children?: Children }

export default interface ArrowBtns {
  left?: null | ArrowBtn,
  right?: null | ArrowBtn
}
