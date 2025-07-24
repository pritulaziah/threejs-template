import { GLTFLoader, GLTF } from "three/addons/loaders/GLTFLoader.js";

export class GLTFLoaderService {
  private static loader = new GLTFLoader();
  private static cache = new Map<string, Promise<GLTF>>();
  private constructor() {}

  public static load(path: string): Promise<GLTF> {
    if (!this.cache.has(path)) {
      this.cache.set(path, this.loader.loadAsync(path));
    }
    return this.cache.get(path)!;
  }
}
