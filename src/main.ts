import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import Stats from "three/examples/jsm/libs/stats.module.js";
import { GUIController } from "./core/GUIController";
import { emitter } from "@core/emitter";
import { CameraController } from "@core/CameraController";
import { RendererManager } from "@core/RendererManager";
import { Suzanne } from "@entities/Suzanne/Suzanne";

const bootstap = async () => {
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  if (!canvas) throw new Error("Canvas element not found");
  
  const gui = new GUIController();
  /**
   * Sizes
   */
  const sizes = { width: window.innerWidth, height: window.innerHeight };

  /*
   * Scene
   */
  const scene = new THREE.Scene();
  const cameraController = new CameraController(
    75,
    sizes.width / sizes.height,
    0.1,
    100
  );
  scene.add(cameraController.camera);
  /*
   * Renderer
   */
  const rendererManager = new RendererManager(canvas, gui.params.backgroundColor);
  /*
   * Clock
   */
  const clock = new THREE.Clock();
  /*
   * Controls
   */
  const controls = new OrbitControls(cameraController.camera, rendererManager.renderer.domElement);
  controls.enableDamping = true;
  /**
   * Stats
   */
  const stats = new Stats();
  document.body.appendChild(stats.dom);

  const suzanne = await Suzanne.create(gui.params.color);
  scene.add(suzanne.mesh);

  /*
   * Debug
   */
  emitter.on("backgroundColorChanged", (color) => {
    rendererManager.renderer.setClearColor(color);
  });
  
  emitter.on("colorChanged", (color) => {
    suzanne.material.updateColor(color);
  });

  const render = () => {
    rendererManager.render(scene, cameraController.camera);
  };

  const updateSizes = () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
    cameraController.updateAspect(sizes.width, sizes.height);
    rendererManager.updateSize(sizes.width, sizes.height);
  };

  const onResize = () => {
    updateSizes();
    render();
  };

  window.addEventListener("resize", onResize);
  updateSizes();

  const animate = async () => {
    requestAnimationFrame(animate);
    const elapsedTime = clock.getElapsedTime();

    suzanne.material.updateTime(elapsedTime);

    stats.update();
    controls.update();
    render();
  };

  animate();
};

bootstap();