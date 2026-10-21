declare module "three" {
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
    constructor(...args: any[]);
    [key: string]: any;
  }

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
}
