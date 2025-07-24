import * as THREE from "three";
import vertexShader from "@shaders/vertex.glsl";
import fragmentShader from "@shaders/fragment.glsl";

export class SuzanneMaterial extends THREE.ShaderMaterial {
  constructor(color: string) {
    super({
      side: THREE.DoubleSide,
      vertexShader,
      fragmentShader,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: new THREE.Uniform(0),
        uColor: new THREE.Uniform(new THREE.Color(color)),
      }
    });
  }

  updateTime(value: number) {
    this.uniforms.uTime.value = value;
  }

  updateColor(color: string) {
    this.uniforms.uColor.value.set(color);
  }
}
