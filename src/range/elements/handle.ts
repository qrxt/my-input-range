// Interfaces

import HandleProps from "@interfaces/HandleProps.interface";

// Types

import Direction from "@type/Direction.type";

// Enums

import ActionsEnum from "@enums/ActionsEnum.enums";

const { SetModel } = ActionsEnum;

// Elements

import div from "@elements/div";

// Utils

import moveHandleAt from "@utils/moveHandleAt";
import calcPercentage from "@utils/calcPercentage";
import setBgGradient from "@utils/setBgGradient";
import getPageX from "@utils/getPageX";

// !!!!!!!!!!!!!

const normalizePos = (unitWidth: number, value: number): number =>
  Math.ceil(value / unitWidth);

const findClosestInArray = (arr: Array<number>, needle: number) =>
  arr.reduce((a, b) =>
    Math.abs(b - needle) < Math.abs(a - needle) ? b : a
  );

// !!!!!!!!!!!!

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

  private _getPosMap (): Array<number> {
    const { min, max, step, baseWidth } = this.props;

    const posSteps = Array.from(Array(max / step), (_, current) => current + min + step);

    return posSteps
      .concat(0)
      .map(
        current => {
          const stepCoord = current * baseWidth / (max / step);

          return stepCoord === baseWidth
            ? stepCoord - this.handle.width()
            : Math.floor(stepCoord)
        }
      );
  }

  private _onMove (evt: JQuery.Event): void {
    const stepsMap = this._getPosMap();
    const closest = findClosestInArray(stepsMap, this._getMousePositionInside(evt));

    if (evt.type === "mousemove") {
      evt.preventDefault();
      evt.stopPropagation();
    }

    // Gradient on move
    setBgGradient(
      this.handle.parent(),
      this.props.colors,
      calcPercentage(
        this.handle.position().left + this.handle.width() / 2,
        this.handle.parent().width()
      )
    );

    // moveHandleAt(this.handle, evt); // ? if stepless

    if ((Math.abs(this._getMousePositionInside(evt) - closest)) >= 5) {
      this.moveTo(closest);
    }
  }

  private _onStop (): void {
    const { signal, min, max } = this.props;

    const isHandleOnRightBoundary = () =>
      Math.ceil(this.handle.position().left + this.handle.width()) === Math.ceil(this.handle.parent().width())

    const isHandleOnLeftBoundary = () =>
      this.handle.position().left <= 0;

    if (isHandleOnLeftBoundary()) {
      signal(SetModel, {
        value: min,
        percent: 0
      });
    } else if (isHandleOnRightBoundary()) {
      signal(SetModel, {
        value: max,
        percent: 100
      });
    } else {
      signal(SetModel, {
        value: normalizePos(
          this.handle.parent().width() / max,
          this.handle.position().left
        ),
        percent: (
          (this.handle.position().left + this.handle.width() / 2) / this.handle.parent().width()
        ) * 100
      });
    }

    $(document).off("mousemove.range.handle touchmove.range.handle");
    $(document).off("mouseup.range.handle touchend.range.handle");
  }

  private _onPress (evt: JQuery.Event): void {
    const { colors, max, pos } = this.props;
    const { _onMove, _onStop } = this;

    evt.stopPropagation();

    $(document).on(
      "mousemove.range.handle touchmove.range.handle",
      _onMove.bind(this)
    );

    $(document).on(
      "mouseup.range.handle touchend.range.handle",
      _onStop.bind(this)
    );

    // Gradient on press
    setBgGradient(
      this.handle.parent(),
      colors,
      calcPercentage(
        (pos * this.handle.parent().width() / max) + this.handle.width() / 2,
        this.handle.parent().width()
      )
    );
  }

  private _onPageReady (): void {
    const { signal, colors, max, pos, baseWidth } = this.props;
    const unitWidth = this.handle.parent().width() / max;

    // Gradient on page load
    setBgGradient(
      this.handle.parent(),
      colors,
      calcPercentage(
        pos * unitWidth + this.handle.width() / 2,
        this.handle.parent().width()
      )
    );

    if (!baseWidth) {
      this.moveTo(pos * unitWidth);

      signal(SetModel, {
        handleWidth: this.handle.width(),
        baseWidth: this.handle.parent().width(),
      });
    }
  }

  private _onDragStart (): boolean {
    return false;
  }

  private _preinit(): void {
    const { pos, max, handleWidth, baseWidth } = this.props;

    if (pos === max) {
      this.moveTo((pos * (baseWidth / max)) - handleWidth);
    } else {
      this.moveTo(pos * (baseWidth / max));
    }

    this.handle.attr("tabindex", 0);
  }

  get pos (): number {
    return this.handle.position().left;
  }

  moveTo (pos: number): void {
    this.handle.css({
      left: pos
    })
  }

  move (direction: Direction): void {
    console.log("move", direction);
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
      "mousedown.range.handle touchstart.range.handle",
      _onPress.bind(this)
    );

    return this.handle;
  }
}
