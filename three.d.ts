declare module "three" {
  class Object3D {
    constructor(...args: any[]);
    traverse(callback: (object: Object3D) => void): void;
    [key: string]: any;
  }

  class Scene extends Object3D {}
  class Group extends Object3D {}
  class Mesh extends Object3D {}
  class InstancedMesh extends Mesh {}
  class Points extends Object3D {}
  class PerspectiveCamera extends Object3D {}
  class AmbientLight extends Object3D {}
  class DirectionalLight extends Object3D {}
  class SpotLight extends Object3D {}

  class Material {
    constructor(...args: any[]);
    [key: string]: any;
  }

  class MeshStandardMaterial extends Material {}
  class PointsMaterial extends Material {}

  class BufferGeometry {
    constructor(...args: any[]);
    [key: string]: any;
  }

  class BoxGeometry extends BufferGeometry {}
  class SphereGeometry extends BufferGeometry {}
  class TorusGeometry extends BufferGeometry {}
  class PlaneGeometry extends BufferGeometry {}
  class CylinderGeometry extends BufferGeometry {}

  class BufferAttribute {
    constructor(...args: any[]);
    [key: string]: any;
  }

  class CanvasTexture {
    constructor(...args: any[]);
    [key: string]: any;
  }

  class Fog {
    constructor(...args: any[]);
    [key: string]: any;
  }

  class Vector3 {
    constructor(...args: any[]);
    [key: string]: any;
  }

  class WebGLRenderer {
    constructor(...args: any[]);
    [key: string]: any;
  }

  const SRGBColorSpace: string;
  const DoubleSide: number;
  const MathUtils: {
    clamp(value: number, min: number, max: number): number;
    smoothstep(min: number, max: number, value: number): number;
  };
}
