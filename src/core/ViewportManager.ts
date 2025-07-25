import mitt from "mitt";

type ViewportEvents = {
  resize: undefined;
};

export class ViewportManager {
  private emitter = mitt<ViewportEvents>();

  private _state: { width: number; height: number; pixelRatio: number; };

  constructor(private maxPixelRatio = 2) {
    this._state = {
      width: window.innerWidth,
      height: window.innerHeight,
      pixelRatio: this.getPixelRatio(),
    };
    window.addEventListener("resize", this.handleResize);
  }

  private getPixelRatio(): number {
    return Math.min(window.devicePixelRatio, this.maxPixelRatio);
  }

  public get aspect(): number {
    return this._state.width / this._state.height;
  }

  public get state() {
    return { ...this._state, aspect: this.aspect };
  }

  private handleResize = () => {
    this._state = {
      width: window.innerWidth,
      height: window.innerHeight,
      pixelRatio: this.getPixelRatio(),
    }
    this.emitResize();
  };

  private emitResize() {
    this.emitter.emit("resize", undefined);
  }

  onResize(cb: () => void, opts: { immediate?: boolean } = {}) {
    if (opts.immediate) {
      cb();
    }

    this.emitter.on("resize", cb);
  }

  offResize(cb: () => void) {
    this.emitter.off("resize", cb);
  }

  dispose() {
    window.removeEventListener("resize", this.handleResize);
  }
}
