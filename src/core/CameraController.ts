import * as THREE from "three";

export class CameraController {
  public camera: THREE.PerspectiveCamera;

  constructor(fov = 75, aspect: number, near = 0.1, far = 100) {
    this.camera = new THREE.PerspectiveCamera(
      fov,
      aspect,
      near,
      far
    );
    this.camera.position.set(7, 7, 7);
  }

  updateAspect(width: number, height: number) {
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
  }
}