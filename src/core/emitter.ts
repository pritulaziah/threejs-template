import mitt from "mitt";

type Events = {
  backgroundColorChanged: string;
  colorChanged: string;
};

export const emitter = mitt<Events>();