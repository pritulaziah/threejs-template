import { GUI } from "lil-gui";
import { emitter } from "./emitter";

export class GUIController {
  params = {
    backgroundColor: "#181818",
    color: "#ff0000",
  };

  constructor() {
    const gui = new GUI({ width: 400 });

    gui
      .addColor(this.params, "backgroundColor")
      .onChange((value: string) => {
        emitter.emit("backgroundColorChanged", value);
      })
      .name("Background color");
    gui
      .addColor(this.params, "color")
      .onChange((value: string) => {
        emitter.emit("colorChanged", value);
      })
      .name("Color");
  }
}
