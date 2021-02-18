import { Clock, PerspectiveCamera, Scene, WebGLRenderer } from 'three';
import Sizes from '../utils/Sizes';

export default class Canvas {
  constructor(_options) {
    this.sizes = new Sizes();
    this.scene = new Scene();
    this.clock = new Clock();

    this.setupCamera(
      _options.camFov,
      this.sizes.width / this.sizes.height,
      _options.camNear,
      _options.camFar
    );

    this.setupRenderer(_options.rendererOpts);
  }

  setupCamera(fov, aspect, near, far) {
    this.camera = new PerspectiveCamera(fov, aspect, near, far);
  }

  setupRenderer(rendererOpts) {
    this.renderer = new WebGLRenderer(rendererOpts);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(this.sizes.width, this.sizes.height);
    document.body.appendChild(this.renderer.domElement);
  }
}
