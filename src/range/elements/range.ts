// Interfaces

import Props from "@interfaces/Props.interface";

// Enums

import ActionsEnum from "@enums/ActionsEnum.enums";

const { SetBaseWidth } = ActionsEnum;

// Elements

import div from "@elements/div";

const EVT_RESIZE = "resize.range";

export default (props: Props, children: JQuery<HTMLElement>): JQuery<HTMLElement> => {
  const {
    className,
    signal
  } = props;

  const range = div({
    className
  }, children);

  const onResize = (): void => {
    console.log("resize");
    const baseWidth = range.width()

    if (baseWidth !== 0) {
      signal(SetBaseWidth, { baseWidth })
    }

    $(window).off(EVT_RESIZE)
  };

  $(document).ready(() => {
    $(window).on(EVT_RESIZE, onResize);
  });

  return range;
}
