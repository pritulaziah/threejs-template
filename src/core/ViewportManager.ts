import mitt from "mitt";

export type ViewportData = {
  width: number;
  height: number;
  aspect: number;
};

type ViewportEvents = {
  resize: ViewportData;
};

export class ViewportManager {
  private emitter = mitt<ViewportEvents>();

  public viewport: ViewportData = {
    width: window.innerWidth,
    height: window.innerHeight,
    aspect: window.innerWidth / window.innerHeight,
  };

  constructor() {
    window.addEventListener("resize", this.handleResize);
  }

  private handleResize = () => {
    this.viewport.width = window.innerWidth;
    this.viewport.height = window.innerHeight;
    this.viewport.aspect = this.viewport.width / this.viewport.height;
    this.emitResize();
  };

  private emitResize() {
    this.emitter.emit("resize", this.viewport);
  }

  onResize(cb: (viewport: ViewportData) => void, opts: { immediate?: boolean } = {}) {
    if (opts.immediate) {
      cb(this.viewport);
    }

    this.emitter.on("resize", cb);
  }

  offResize(cb: (viewport: ViewportData) => void) {
    this.emitter.off("resize", cb);
  }

  dispose() {
    window.removeEventListener("resize", this.handleResize);
  }
}
