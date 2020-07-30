// Interfaces

import HandleProps from "@interfaces/HandleProps.interface";

// Enums

import ActionsEnum from "@enums/ActionsEnum.enums";

const { SetValue, Init } = ActionsEnum;

// Elements

import div from "@elements/div";

// Utils

import calcPercentage from "@utils/calc-percentage";
import getCursorDocumentOffset from "@utils/get-cursor-document-offset";
import findClosestInArray from "@utils/find-closest-in-array";

const EVT_MOVE = "mousemove.range.handle touchmove.range.handle";
const EVT_STOP = "mouseup.range.handle touchend.range.handle";
const EVT_START = "mousedown.range.handle touchstart.range.handle";
const EVT_DRAGSTART = "dragstart.range.handle";
const EVT_KEYDOWN = "keydown.range.handle";

const isUpper = (className: string): boolean =>
  className.includes("upper");

export default class Handle {
  props: HandleProps
  handle: JQuery<HTMLElement>

  constructor (props: HandleProps) {
    this.props = props;

    const { vertical, className } = this.props;
    const modifiedClassname = vertical
      ? `${ className } range__handle--vertical`
      : className;

    this.handle = div(
      {
        ...props,
        className: modifiedClassname
      },
      null
    );
  }

  private getMousePositionInside (evt: JQuery.Event): number {
    const { vertical, base } = this.props;

    const cursorDocumentOffset = vertical
      ? getCursorDocumentOffset(evt, "vertical")
      : getCursorDocumentOffset(evt)

    return vertical
      ? cursorDocumentOffset - base.elem.offset().top
      : cursorDocumentOffset - base.elem.offset().left;
  }

  private onMove (evt: JQuery.Event): void {
    const {
      handleWidth,
      baseWidth,
      vertical, percentages,
      onSlide, className,
      name, allowedMax, allowedMin,
      stepsMapReversed, stepPositions
    } = this.props;

    const closestStepCoord = findClosestInArray(
      stepPositions,
      this.getMousePositionInside(evt) - (handleWidth / 2)
    );
    const closestValue = stepsMapReversed[closestStepCoord];

    if (evt.type === "mousemove") {
      evt.preventDefault();
      evt.stopPropagation();
    }

    const percentage = calcPercentage(closestStepCoord, baseWidth);
    const currentPercentage = vertical
      ? 100 - percentage
      : percentage;

    const closestValueMoreThanLower = closestValue >= allowedMin;
    const closestValueLessThanUpper = closestValue <= allowedMax

    const currentPercentages = isUpper(className)
      ? [ percentages[0], currentPercentage ]
      : [ currentPercentage, percentages[1] ];

    if (isUpper(className) && closestValueMoreThanLower || closestValueLessThanUpper) {
      const { base, colors } = this.props;

      this.moveTo(closestStepCoord);

      // Gradient on move
      base.setGradient(colors, currentPercentages);
    }

    // Event on slide
    if (onSlide) {
      onSlide(
        [ closestValue ],
        name,
        this.handle
      );
    }
  }

  private onStop (): void {
    const {
      signal,
      className,
      stepsMapReversed,
      stepPositions
    } = this.props;

    const closest = findClosestInArray(
      stepPositions,
      this.offset
    );

    const valueToSet = stepsMapReversed[closest];

    if (isUpper(className)) {
      signal(SetValue, {
        to: valueToSet
      });
    } else {
      signal(SetValue, {
        from: valueToSet
      });
    }

    $(document).off(EVT_MOVE);
    $(document).off(EVT_STOP);
  }

  private onPress (evt: JQuery.Event): void {
    const {
      pos,
      name,
      onPress,
    } = this.props;
    const { onMove, onStop } = this;

    evt.stopPropagation();

    $(document).on(
      EVT_MOVE,
      onMove.bind(this)
    );

    $(document).on(
      EVT_STOP,
      onStop.bind(this)
    );

    // Event on press
    if (onPress) {
      onPress([ pos ], name, this.handle);
    }
  }

  private onPageReady (): void {
    const {
      signal,
      pos,
      baseWidth,
      onLoad,
      name,
      stepsMap
    } = this.props;

    if (!baseWidth) {
      if (stepsMap) {
        this.moveTo(stepsMap[pos]);
      }

      signal(Init, {
        handleWidth: this.handleWidth,
        baseWidth: this.baseWidth,
      });

      if (onLoad) {
        onLoad([ pos ], name);
      }
    }
  }

  private onDragStart (): boolean {
    return false;
  }

  private onKeyDown (evt: JQuery.Event): void {
    // console.log(evt.key);
  }

  private get offset (): number {
    const { vertical } = this.props;

    return vertical
      ? this.handle.position().top
      : this.handle.position().left;
  }

  private get baseWidth (): number {
    const { vertical, base } = this.props;

    return vertical
      ? base.elem.height()
      : base.elem.width();
  }

  private get handleWidth (): number {
    const { vertical } = this.props;

    return vertical
      ? this.handle.height()
      : this.handle.width();
  }

  private moveTo (pos: number): void {
    const { vertical } = this.props;

    vertical
      ? this.handle.css({ top: pos })
      : this.handle.css({ left: pos });
  }

  private _preinit(): void {
    const {
      pos,
      onDraw,
      name,
      stepsMap
    } = this.props;

    if (stepsMap) {
      this.moveTo(stepsMap[pos]);
    }

    // Event on load
    if (onDraw) {
      onDraw([ pos ], name);
    }

    this.handle.attr("tabindex", 0);
  }

  init (): JQuery<HTMLElement> {
    const {
      onPageReady,
      onDragStart,
      onPress,
      onKeyDown
    } = this;

    this._preinit();

    $(document).ready(onPageReady.bind(this));

    this.handle.on(
      EVT_DRAGSTART,
      onDragStart.bind(this)
    );

    this.handle.on(
      EVT_START,
      onPress.bind(this)
    );

    this.handle.on(
      EVT_KEYDOWN,
      onKeyDown.bind(this)
    );

    return this.handle;
  }
}
