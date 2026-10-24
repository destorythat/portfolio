declare module "three" {
<<<<<<< HEAD
  type Constructable = new (...args: any[]) => { [key: string]: any };

  export class Mesh {
    constructor(...args: any[]);
    [key: string]: any;
  }
  export class CanvasTexture {
    constructor(...args: any[]);
    [key: string]: any;
  }
  export class MeshStandardMaterial {
    constructor(...args: any[]);
    [key: string]: any;
  }
  export class BufferGeometry {
    constructor(...args: any[]);
    [key: string]: any;
  }
  export class Material {
=======
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
>>>>>>> 2026-10-21-6z4h
    constructor(...args: any[]);
    [key: string]: any;
  }

<<<<<<< HEAD
  export const AmbientLight: Constructable;
  export const BoxGeometry: Constructable;
  export const BufferAttribute: Constructable;
  export const Color: Constructable;
  export const DirectionalLight: Constructable;
  export const DoubleSide: number;
  export const Fog: Constructable;
  export const Group: Constructable;
  export const InstancedMesh: Constructable;
  export const MathUtils: {
    clamp(value: number, min: number, max: number): number;
    smoothstep(min: number, max: number, value: number): number;
  };
  export const MeshBasicMaterial: Constructable;
  export const Object3D: Constructable;
  export const PerspectiveCamera: Constructable;
  export const PlaneGeometry: Constructable;
  export const Points: Constructable;
  export const PointsMaterial: Constructable;
  export const SRGBColorSpace: string;
  export const Scene: Constructable;
  export const SphereGeometry: Constructable;
  export const SpotLight: Constructable;
  export const TorusGeometry: Constructable;
  export const Vector3: Constructable;
  export const WebGLRenderer: Constructable;
=======
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
>>>>>>> 2026-10-21-6z4h
}
