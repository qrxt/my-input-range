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

  private _getStepIndexes (): Array<number> {
    const { min, max, step } = this.props;
    const indexesLength = Math.ceil((max - min + 1) / step);

    return Array.from(
      Array(indexesLength),
      (_, current) => current * step + min
    );
  }

  private _getStepPosMap (): Array<number> {
    const { baseWidth, handleWidth } = this.props;

    const posSteps = this._getStepIndexes();
    const stepsQuantity = posSteps.length - 1;

    const distanceBetweenSteps = (baseWidth - handleWidth) / stepsQuantity;

    return posSteps
      .map((_, idx) => idx * distanceBetweenSteps); // ?
  }

  private _getStepsPosMap (posToIdx = false): { [key: number]: number } {
    const { vertical } = this.props;
    const stepIndexes = this._getStepIndexes();
    const stepsPosMap = vertical
      ? this._getStepPosMap().slice().reverse()
      : this._getStepPosMap();

    return posToIdx
      ? stepsPosMap.reduce((acc, stepPos, idx) => ({
        ...acc, [ stepPos ]: stepIndexes[idx]
      }), {})
      : stepsPosMap.reduce((acc, stepPos, idx) => ({
        ...acc, [ stepIndexes[idx] ]: stepPos
      }), {});
  }

  private _onMove (evt: JQuery.Event): void {
    const { handleWidth, baseWidth, vertical, onSlide, name } = this.props;
    const stepsPosMap = this._getStepPosMap();
    const steps = this._getStepsPosMap(true);
    const closestStepCoord = findClosestInArray(
      stepsPosMap,
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
    const { signal, handleWidth, baseWidth, vertical, onChange } = this.props;
    const stepsPosMap = this._getStepPosMap();
    const steps = this._getStepsPosMap(true);

    const closest = findClosestInArray(
      stepsPosMap,
      this.offset
    );

    const valueToSet = steps[closest];
    const percentage = ((this.offset + handleWidth / 2) / baseWidth) * 100
    const currentPercentage = vertical
      ? 100 - percentage
      : percentage;

    signal(SetValue, {
      value: valueToSet,
      percent: currentPercentage
    });

    // Event on change
    if (onChange) {
      onChange([ valueToSet ]);
    }

    $(document).off(EVT_MOVE);
    $(document).off(EVT_STOP);
  }

  private _onPress (evt: JQuery.Event): void {
    const { colors, pos, baseWidth, handleWidth, vertical } = this.props;
    const { _onMove, _onStop } = this;
    const steps = this._getStepsPosMap()

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


    // Gradient on press
    setBgGradient(
      this.handle.parent(),
      colors,
      currentPercentage,
      vertical
    );
  }

  private _onPageReady (): void {
    const { signal, colors, max, pos, baseWidth, handleWidth, vertical, onLoad } = this.props;
    const unitWidth = baseWidth / max;
    const steps = this._getStepsPosMap()

    const percentage = calcPercentage(
      steps[pos] + (handleWidth / 2),
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
      this.moveTo(pos * unitWidth);

      signal(SetSizes, {
        handleWidth: this.handleWidth,
        baseWidth: this.baseWidth,
      });
    }
  }

  private _onDragStart (): boolean {
    return false;
  }

  private _onKeyDown (evt: JQuery.Event): void {
    console.log(evt.key);
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
    const { pos } = this.props;
    const steps = this._getStepsPosMap();
    this.moveTo(steps[pos])

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
