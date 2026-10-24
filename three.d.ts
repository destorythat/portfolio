declare module "three" {
  export class Object3D {
    constructor(...args: any[]);
    traverse(callback: (object: Object3D) => void): void;
    [key: string]: any;
  }

  export class Scene extends Object3D {}
  export class Group extends Object3D {}
  export class Mesh extends Object3D {}
  export class InstancedMesh extends Mesh {}
  export class Points extends Object3D {}
  export class PerspectiveCamera extends Object3D {}
  export class AmbientLight extends Object3D {}
  export class DirectionalLight extends Object3D {}
  export class SpotLight extends Object3D {}

  export class Material {
    constructor(...args: any[]);
    [key: string]: any;
  }

  export class MeshStandardMaterial extends Material {}
  export class MeshBasicMaterial extends Material {}
  export class PointsMaterial extends Material {}

  export class BufferGeometry {
    constructor(...args: any[]);
    [key: string]: any;
  }

  export class BoxGeometry extends BufferGeometry {}
  export class SphereGeometry extends BufferGeometry {}
  export class TorusGeometry extends BufferGeometry {}
  export class PlaneGeometry extends BufferGeometry {}
  export class CylinderGeometry extends BufferGeometry {}

  export class BufferAttribute {
    constructor(...args: any[]);
    [key: string]: any;
  }

  export class CanvasTexture {
    constructor(...args: any[]);
    [key: string]: any;
  }

  export class Color {
    constructor(...args: any[]);
    [key: string]: any;
  }

  export class Fog {
    constructor(...args: any[]);
    [key: string]: any;
  }

  export class Vector3 {
    constructor(...args: any[]);
    [key: string]: any;
  }

  export class WebGLRenderer {
    constructor(...args: any[]);
    [key: string]: any;
  }

  export const SRGBColorSpace: string;
  export const DoubleSide: number;
  export const MathUtils: {
    clamp(value: number, min: number, max: number): number;
    smoothstep(min: number, max: number, value: number): number;
  };
}
