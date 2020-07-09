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
import getPageX from "@utils/getPageX";
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
    this.handle = div(
      props,
      null
    );
  }

  private _getMousePositionInside (evt: JQuery.Event): number {
    return getPageX(evt) - this.handle.parent().offset().left;
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
    const distanceBetweenSteps = (baseWidth - handleWidth) / (posSteps.length - 1);

    return posSteps
      .map((_, idx) => idx * distanceBetweenSteps);
  }

  private _getStepsPosMap (posToIdx = false): { [key: number]: number } {
    const stepIndexes = this._getStepIndexes();
    const stepsPosMap = this._getStepPosMap();
    // console.log(stepsPosMap);

    return posToIdx
      ? stepsPosMap.reduce((acc, stepPos, idx) => ({
        ...acc, [ stepPos ]: stepIndexes[idx]
      }), {})
      : stepsPosMap.reduce((acc, stepPos, idx) => ({
        ...acc, [ stepIndexes[idx] ]: stepPos
      }), {});
  }

  private _onMove (evt: JQuery.Event): void {
    const { handleWidth, baseWidth } = this.props;
    const stepsPosMap = this._getStepPosMap();
    const closest = findClosestInArray(
      stepsPosMap,
      this._getMousePositionInside(evt) - (handleWidth / 2)
    );

    if (evt.type === "mousemove") {
      evt.preventDefault();
      evt.stopPropagation();
    }

    // Gradient on move
    setBgGradient(
      this.handle.parent(),
      this.props.colors,
      calcPercentage(
        this.left + this.handleWidth / 2,
        baseWidth
      )
    );

    this.moveTo(closest);
  }

  private _onStop (): void {
    const { signal, handleWidth, baseWidth } = this.props;
    const stepsPosMap = this._getStepPosMap();
    const steps = this._getStepsPosMap(true);
    const closest = findClosestInArray(
      stepsPosMap,
      this.left
    );

    signal(SetValue, {
      value: steps[closest],
      percent: ((this.left + handleWidth / 2) / baseWidth) * 100
    });

    $(document).off(EVT_MOVE);
    $(document).off(EVT_STOP);
  }

  private _onPress (evt: JQuery.Event): void {
    const { colors, pos, baseWidth } = this.props;
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

    // Gradient on press
    setBgGradient(
      this.handle.parent(),
      colors,
      calcPercentage(
        steps[pos] + this.handle.width() / 2,
        baseWidth
      )
    );
  }

  private _onPageReady (): void {
    const { signal, colors, max, pos, baseWidth } = this.props;
    const unitWidth = baseWidth / max;
    const steps = this._getStepsPosMap()

    // Gradient on page load
    setBgGradient(
      this.handle.parent(),
      colors,
      calcPercentage(
        steps[pos] + this.handle.width() / 2,
        baseWidth
      )
    );

    if (!baseWidth) {
      this.moveTo(pos * unitWidth);

      signal(SetSizes, {
        handleWidth: this.handleWidth,
        baseWidth: this.handle.parent().width(),
      });
    }
  }

  private _onDragStart (): boolean {
    return false;
  }

  private _onKeyDown (evt: JQuery.Event): void {
    console.log(evt.key);
  }

  private _preinit(): void {
    const { pos } = this.props;
    const steps = this._getStepsPosMap();

    // console.log(steps);

    this.moveTo(steps[pos])

    this.handle.attr("tabindex", 0);
  }

  private get left (): number {
    return this.handle.position().left;
  }

  private get handleWidth (): number {
    return this.handle.width();
  }

  private moveTo (left: number): void {
    this.handle.css({ left })
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
