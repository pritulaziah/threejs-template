import { GUI } from "lil-gui";
import mitt from "mitt";

type GUIEvents = {
  backgroundColorChanged: string;
  colorChanged: string;
};

export class GUIController {
  public params = {
    backgroundColor: "#181818",
    color: "#ff0000",
  };

  private emitter = mitt<GUIEvents>();

  constructor() {
    const gui = new GUI({ width: 400 });

    gui
      .addColor(this.params, "backgroundColor")
      .onChange((value: string) => {
        this.emitter.emit("backgroundColorChanged", value);
      })
      .name("Background color");
    gui
      .addColor(this.params, "color")
      .onChange((value: string) => {
        this.emitter.emit("colorChanged", value);
      })
      .name("Color");
  }

  onBackgroundChanged(cb: (color: string) => void) {
    this.emitter.on("backgroundColorChanged", cb);
  }

  onColorChanged(cb: (color: string) => void) {
    this.emitter.on("colorChanged", cb);
  }
}
