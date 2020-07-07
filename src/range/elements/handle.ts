// Interfaces

import HandleProps from "@interfaces/HandleProps.interface";

// Enums

import ActionsEnum from "@enums/ActionsEnum.enums";

const { SetModel } = ActionsEnum;

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

    const t = Array.from(
      Array(indexesLength),
      (_, current) => current * step + min
    );

    console.log(t);

    return t;
  }

  private _getStepPosMap (): Array<number> {
    const { baseWidth, handleWidth } = this.props;
    const posSteps = this._getStepIndexes();
    const distanceBetweenSteps = (baseWidth - handleWidth) / (posSteps.length - 1);

    const t = posSteps
      .map((_, idx) => idx * distanceBetweenSteps);

    console.log(t);

    return t;
  }

  private _getStepsPosMap (posToIdx = false): { [key: number]: number } {
    const stepIndexes = this._getStepIndexes();
    const stepsPosMap = this._getStepPosMap();

    return posToIdx
      ? stepsPosMap.reduce((acc, stepPos, idx) => ({
        ...acc, [ stepPos ]: stepIndexes[idx]
      }), {})
      : stepsPosMap.reduce((acc, stepPos, idx) => ({
        ...acc, [ stepIndexes[idx] ]: stepPos
      }), {});
  }

  private _onMove (evt: JQuery.Event): void {
    const stepsPosMap = this._getStepPosMap();
    const closest = findClosestInArray(
      stepsPosMap,
      this._getMousePositionInside(evt) - (this.handleWidth / 2)
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
        this.parentWidth
      )
    );

    this.moveTo(closest);
  }

  private _onStop (): void {
    const { signal } = this.props;
    const stepsPosMap = this._getStepPosMap();
    const steps = this._getStepsPosMap(true);
    const closest = findClosestInArray(
      stepsPosMap,
      this.left
    );

    signal(SetModel, {
      value: steps[closest],
      percent: ((this.left + this.handleWidth / 2) / this.parentWidth) * 100
    });

    $(document).off(EVT_MOVE);
    $(document).off(EVT_STOP);
  }

  private _onPress (evt: JQuery.Event): void {
    const { colors, pos } = this.props;
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
        steps[pos],
        this.parentWidth
      )
    );
  }

  private _onPageReady (): void {
    const { signal, colors, max, pos, baseWidth } = this.props;
    const unitWidth = this.parentWidth / max;
    const steps = this._getStepsPosMap()

    // Gradient on page load
    setBgGradient(
      this.handle.parent(),
      colors,
      calcPercentage(
        steps[pos],
        this.parentWidth
      )
    );

    if (!baseWidth) {
      this.moveTo(pos * unitWidth);

      signal(SetModel, {
        handleWidth: this.handleWidth,
        baseWidth: this.parentWidth,
      });
    }
  }

  private _onDragStart (): boolean {
    return false;
  }

  private _preinit(): void {
    const { pos, min } = this.props;
    const steps = this._getStepsPosMap();

    // if (pos === max) {
    //   this.moveTo((pos * (baseWidth / max)) - handleWidth);
    // } else
    if (pos === min) {
      this.moveTo(0)
    } else {
      this.moveTo(steps[pos])
    }

    this.handle.attr("tabindex", 0);
  }

  get left (): number {
    return this.handle.position().left;
  }

  get handleWidth (): number {
    return this.handle.width();
  }

  get parentWidth (): number {
    return this.handle.parent().width();
  }

  moveTo (left: number): void {
    this.handle.css({ left })
  }

  init (): JQuery<HTMLElement> {
    const {
      _onPageReady,
      _onDragStart,
      _onPress
    } = this;

    this._preinit();

    $(document).ready(_onPageReady.bind(this));

    this.handle.on(
      "dragstart.range.handle",
      _onDragStart.bind(this)
    );

    this.handle.on(
      EVT_START,
      _onPress.bind(this)
    );

    return this.handle;
  }
}
