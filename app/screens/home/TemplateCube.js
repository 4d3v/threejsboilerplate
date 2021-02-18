import * as THREE from 'three';
import boxVertex from '../../shaders/home/box.vs';
import boxFragment from '../../shaders/home/box.fs';

export default class TemplateCube {
  constructor() {
    this.uniforms = {
      uTime: { value: 0 },
      uRadius: { value: 1.5 },
      uMo: { value: { x: 0, y: 0 } },
    };
    this.obj = this.createObj();
  }

  createObj() {
    return new THREE.Mesh(
      new THREE.BoxBufferGeometry(2, 2, 2, 10, 10, 10),
      new THREE.RawShaderMaterial({
        uniforms: this.uniforms,
        vertexShader: boxVertex,
        fragmentShader: boxFragment,
      })
    );
  }

  render(time) {
    this.uniforms.uTime.value = time;
    this.obj.rotation.x = time * 0.5;
    this.obj.rotation.y = time * 0.5;
  }
}
