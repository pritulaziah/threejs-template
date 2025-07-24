import * as THREE from "three";
import { SuzanneMaterial } from "./SuzanneMaterial";
import { GLTFLoaderService } from "@utils/GLTFLoaderService";

export type SuzanneOptions = {
  initialColor: THREE.ColorRepresentation;
};

export class Suzanne {
  public static readonly modelPath = "./suzanne.glb";
  public readonly mesh: THREE.Mesh;
  public readonly material: SuzanneMaterial;

  private constructor(mesh: THREE.Mesh, material: SuzanneMaterial) {
    this.mesh = mesh;
    this.material = material;
  }

  public static async create(initialColor: string): Promise<Suzanne> {
    const gltf = await GLTFLoaderService.load(this.modelPath);
    const mesh = gltf.scene.getObjectByName("Suzanne") as THREE.Mesh;

    const material = new SuzanneMaterial(initialColor);
    mesh.material = material;

    return new Suzanne(mesh, material);
  }
}
