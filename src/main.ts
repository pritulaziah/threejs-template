import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import Stats from "three/examples/jsm/libs/stats.module.js";
import { GUIController } from "./core/GUIController";
import { CameraController } from "@core/CameraController";
import { RendererManager } from "@core/RendererManager";
import { Suzanne } from "@entities/Suzanne/Suzanne";
import { ViewportManager } from "@core/ViewportManager";

const bootstap = async () => {
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  if (!canvas) throw new Error("Canvas element not found");
  /* 
   * GUI
   */
  const gui = new GUIController();
  /**
   * Sizes
   */
  const viewportManager = new ViewportManager();
  /*
   * Scene
   */
  const scene = new THREE.Scene();
  /*
   * Camera
   */
  const cameraController = new CameraController();
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

  /*
   * Suzanne
   */
  const suzanne = await Suzanne.create(gui.params.color);
  scene.add(suzanne.mesh);

  /*
   * Debug
   */
  gui.onBackgroundChanged((color) => {
    rendererManager.renderer.setClearColor(color);
  });
  
  gui.onColorChanged((color) => {
    suzanne.material.updateColor(color);
  });

  /*
   * Initial render
   */
  const render = () => {
    rendererManager.render(scene, cameraController.camera);
  };

  viewportManager.onResize(({ width, height, aspect }) => {
    cameraController.updateAspect(aspect);
    rendererManager.updateSize(width, height);
    render();
  }, { immediate: true });

  /* 
   * Animation Loop
   */
  const animate = async () => {
    requestAnimationFrame(animate);
    const elapsedTime = clock.getElapsedTime();

    suzanne.material.updateTime(elapsedTime);

    stats.update();
    controls.update();
    rendererManager.render(scene, cameraController.camera);
  };

  animate();
};

bootstap();