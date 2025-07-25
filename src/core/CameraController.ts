import * as THREE from "three";

export class CameraController {
  public camera: THREE.PerspectiveCamera;

  constructor(fov = 75, aspect = 1, near = 0.1, far = 100) {
    this.camera = new THREE.PerspectiveCamera(
      fov,
      aspect,
      near,
      far
    );
    this.camera.position.set(7, 7, 7);
  }

  updateAspect(aspect: THREE.PerspectiveCamera['aspect']) {
    this.camera.aspect = aspect;
    this.camera.updateProjectionMatrix();
  }
}