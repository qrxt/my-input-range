// Interfaces

import HandleProps from "@interfaces/HandleProps.interface";

// Enums

import ActionsEnum from "@enums/ActionsEnum.enums";

const { SetValue, SetSizes } = ActionsEnum;

// Elements

import div from "@elements/div";

// Utils

import calcPercentage from "@utils/calcPercentage";
import setBgGradient from "@utils/setBgGradient";
import getCursorDocumentOffset from "@utils/getCursorDocumentOffset";
import findClosestInArray from "@utils/findClosestInArray";
//
import getStepIndexes from "@utils/getStepIndexes";
import getStepPositions from "@utils/getStepPositions";
import getStepsPosMap from "@utils/getStepsPosMap";

const EVT_MOVE = "mousemove.range.handle touchmove.range.handle";
const EVT_STOP = "mouseup.range.handle touchend.range.handle";
const EVT_START = "mousedown.range.handle touchstart.range.handle";
const EVT_DRAGSTART = "dragstart.range.handle";
const EVT_KEYDOWN = "keydown.range.handle";

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

  private _getMousePositionInside (evt: JQuery.Event): number {
    const { vertical } = this.props;

    const cursorDocumentOffset = vertical
      ? getCursorDocumentOffset(evt, "vertical")
      : getCursorDocumentOffset(evt)

    return vertical
      ? cursorDocumentOffset - this.handle.parent().offset().top
      : cursorDocumentOffset - this.handle.parent().offset().left;
  }

  private _onMove (evt: JQuery.Event): void {
    const {
      handleWidth,
      baseWidth, vertical,
      onSlide, name,
      min, max, step
    } = this.props;
    const stepIndexes = getStepIndexes(min, max, step);
    const stepPositions = getStepPositions(baseWidth, handleWidth, stepIndexes);
    const steps = getStepsPosMap(stepIndexes, stepPositions, vertical, true);
    const closestStepCoord = findClosestInArray(
      stepPositions,
      this._getMousePositionInside(evt) - (handleWidth / 2)
    );
    const closestValue = steps[closestStepCoord];

    if (evt.type === "mousemove") {
      evt.preventDefault();
      evt.stopPropagation();
    }

    const percentage = calcPercentage(
      this.offset + this.handleWidth / 2,
      baseWidth
    );
    const currentPercentage = vertical
      ? 100 - percentage
      : percentage;

    // Gradient on move
    setBgGradient(
      this.handle.parent(),
      this.props.colors,
      currentPercentage,
      vertical
    );

    this.moveTo(closestStepCoord);

    // Event on slide
    if (onSlide) {
      onSlide(
        [ closestValue ],
        name,
        this.handle
      );
    }
  }

  private _onStop (): void {
    const {
      signal,
      handleWidth,
      baseWidth,
      vertical,
      onChange, /***/ className /***/,
      min, max, step
    } = this.props;
    const stepIndexes = getStepIndexes(min, max, step);
    const stepPositions = getStepPositions(baseWidth, handleWidth, stepIndexes);
    const steps = getStepsPosMap(stepIndexes, stepPositions, vertical, true);

    const closest = findClosestInArray(
      stepPositions,
      this.offset
    );

    const valueToSet = steps[closest];

    //
    if (className.includes("upper")) {
      signal(SetValue, {
        to: valueToSet
      });
    } else {
      signal(SetValue, {
        from: valueToSet
      });
    }
    //

    $(document).off(EVT_MOVE);
    $(document).off(EVT_STOP);
  }

  private _onPress (evt: JQuery.Event): void {
    const {
      colors,
      pos,
      baseWidth,
      handleWidth,
      vertical,
      name,
      onPress,
      min, max, step
    } = this.props;
    const { _onMove, _onStop } = this;
    const stepIndexes = getStepIndexes(min, max, step);
    const stepPositions = getStepPositions(baseWidth, handleWidth, stepIndexes);
    const steps = getStepsPosMap(stepIndexes, stepPositions, vertical);

    evt.stopPropagation();

    $(document).on(
      EVT_MOVE,
      _onMove.bind(this)
    );

    $(document).on(
      EVT_STOP,
      _onStop.bind(this)
    );

    const percentage = calcPercentage(
      steps[pos] + handleWidth / 2,
      baseWidth
    );
    const currentPercentage = vertical
      ? 100 - percentage
      : percentage;

    // Event on press
    if (onPress) {
      onPress([ pos ], name, this.handle);
    }

    // Gradient on press
    setBgGradient(
      this.handle.parent(),
      colors,
      currentPercentage,
      vertical
    );
  }

  private _onPageReady (): void {
    const {
      signal,
      colors,
      pos,
      baseWidth,
      handleWidth,
      vertical,
      onLoad,
      name, className,
      min, max, step
    } = this.props;
    const stepIndexes = getStepIndexes(min, max, step);
    const stepPositions = getStepPositions(baseWidth, handleWidth, stepIndexes);
    const steps = getStepsPosMap(stepIndexes, stepPositions, vertical);

    const currentStepCoord = steps[pos];

    const percentage = calcPercentage(
      currentStepCoord + (handleWidth / 2),
      baseWidth
    );
    const currentPercentage = vertical
      ? 100 - percentage
      : percentage;

    // Gradient on page load
    setBgGradient(
      this.handle.parent(),
      colors,
      currentPercentage,
      vertical
    );

    if (!baseWidth) {
      this.moveTo(currentStepCoord);

      console.log(this.handle.width(), className, this.handleWidth, this.baseWidth)

      signal(SetSizes, {
        handleWidth: this.handleWidth,
        baseWidth: this.baseWidth,
      });

      if (onLoad) {
        onLoad([ pos ], name);
      }
    }
  }

  private _onDragStart (): boolean {
    return false;
  }

  private _onKeyDown (evt: JQuery.Event): void {
    // console.log(evt.key);
  }

  private get offset (): number {
    const { vertical } = this.props;

    return vertical
      ? this.handle.position().top
      : this.handle.position().left;
  }

  private get baseWidth (): number {
    const { vertical } = this.props;

    return vertical
      ? this.handle.parent().height()
      : this.handle.parent().width();
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
      min, max, step, baseWidth, handleWidth, vertical
    } = this.props;
    const stepIndexes = getStepIndexes(min, max, step);
    const stepPositions = getStepPositions(baseWidth, handleWidth, stepIndexes);
    const steps = getStepsPosMap(stepIndexes, stepPositions, vertical);

    this.moveTo(steps[pos])

    // Event on load
    if (onDraw) {
      onDraw([ pos ], name);
    }

    this.handle.attr("tabindex", 0);
  }

  init (): JQuery<HTMLElement> {
    const {
      _onPageReady,
      _onDragStart,
      _onPress,
      _onKeyDown
    } = this;

    this._preinit();

    $(document).ready(_onPageReady.bind(this));

    this.handle.on(
      EVT_DRAGSTART,
      _onDragStart.bind(this)
    );

    this.handle.on(
      EVT_START,
      _onPress.bind(this)
    );

    this.handle.on(
      EVT_KEYDOWN,
      _onKeyDown.bind(this)
    );

    return this.handle;
  }
}
