precision highp float;

attribute vec3 position;
attribute vec2 uv;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform float uTime;
uniform float uRadius;

varying vec2 vUv;

void main() {
  vUv = uv;

  float d = (sin(uTime) + 1.0) / 2.0;
  vec3 v = normalize(position) * uRadius;
  vec3 pos = mix(position, v, d);

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}