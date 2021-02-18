import { TextureLoader } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';

const textureLoader = new TextureLoader();
const gltfLoader = new GLTFLoader();
const dracoLoader = new DRACOLoader();
const fbxLoader = new FBXLoader();
const objLoader = new OBJLoader();

export const loadTexture = src => {
  return new Promise((resolve, reject) => {
    textureLoader.load(src, resolve, null, reject);
  });
};

export const loadGLTF = src => {
  return new Promise((resolve, reject) => {
    gltfLoader.load(src, resolve, null, reject);
  });
};

export const loadDRACO = src => {
  dracoLoader.setDecoderPath('../../assets/draco/');
  gltfLoader.setDRACOLoader(dracoLoader);
  return new Promise((resolve, reject) => {
    gltfLoader.load(src, resolve, null, reject);
  });
};

export const loadFBX = src => {
  return new Promise((resolve, reject) => {
    fbxLoader.load(src, resolve, null, reject);
  });
};

export const loadOBJ = src => {
  return new Promise((resolve, reject) => {
    objLoader.load(src, resolve, null, reject);
  });
};
