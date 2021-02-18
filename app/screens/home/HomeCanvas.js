import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import Canvas from '../../components/Canvas.js';
import TemplateCube from './TemplateCube.js';

export default class HomeCanvas extends Canvas {
  constructor() {
    super({
      camFov: 45,
      camNear: 0.01,
      camFar: 10,
      // rendererOpts: { antialias: true },
    });

    this.clock = new THREE.Clock();
    this.camera.position.set(0, 0, 6);

    this.setupTemplateCube();

    this.setupRenderTarget();
    this.updateuMo();
    this.setupOrbitControls();
    this.onResize();

    this.update = this.update.bind(this);
    this.update();
  }

  setupTemplateCube() {
    this.templateCube = new TemplateCube();
    this.scene.add(this.templateCube.obj);
  }

  setupRenderTarget() {
    this.renderTargetClass =
      this.renderer.getPixelRatio() === 1 && this.renderer.capabilities.isWebGL2
        ? new THREE.WebGLMultisampleRenderTarget(
            this.sizes.width,
            this.sizes.height
          )
        : new THREE.WebGLRenderTarget(this.sizes.width, this.sizes.height);
  }

  updateuMo() {
    window.addEventListener('mousemove', e => {
      this.templateCube.uniforms.uMo.value.x = e.clientX / this.sizes.width;
      this.templateCube.uniforms.uMo.value.y = e.clientY / this.sizes.height;
    });

    // window.addEventListener('mouseout', e => {
    //
    // });
  }

  setupOrbitControls() {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.target.set(0, 0, 0);
    this.controls.enableDamping = true;
  }

  onResize() {
    window.addEventListener('resize', () => {
      this.sizes.width = window.innerWidth;
      this.sizes.height = window.innerHeight;

      this.camera.aspect = this.sizes.width / this.sizes.height;
      this.camera.updateProjectionMatrix();

      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      this.renderer.setSize(this.sizes.width, this.sizes.height);
    });
  }

  update() {
    const elapsedTime = this.clock.getElapsedTime();
    this.templateCube.render(elapsedTime);
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
    window.requestAnimationFrame(this.update);
  }
}
