import * as dat from 'dat.gui';
import Home from './screens/home/Home.js';

export default class Application {
  constructor() {
    // this.content = document.querySelector('.content');
    // this.template = this.content.dataset.template;

    this.config = { debug: window.location.hash === '#debug' };
    this.url = window.location.pathname;

    this.createHome();
    this.setupDebug();
  }

  update() {
    const elapsedTime = this.clock.getElapsedTime();
    this.mesh.rotation.x = elapsedTime * 0.5;
    this.mesh.rotation.y = elapsedTime * 0.5;
    this.renderer.render(this.scene, this.camera);
    window.requestAnimationFrame(this.update);
  }

  setupDebug() {
    if (!this.config.debug) return;

    this.gui = new dat.GUI({ width: 400 });
  }

  createHome() {
    this.home = new Home();
    this.home.create();
  }

  destructor() {
    // this.time.off('tick');
    // this.sizes.off();
    // this.camera.orbitControls.dispose();
    // this.renderer.dispose();
    this.debug.destroy();
  }
}
