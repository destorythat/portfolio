"use client";

import { useEffect, useRef } from "react";

export function SageScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let alive = true;
    let cleanup = () => {};

    import("three").then((THREE) => {
      if (!alive) return;
      cleanup = mountScene(THREE, canvas);
    });

    return () => {
      alive = false;
      cleanup();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 h-dvh w-full"
    />
  );
}

function mountScene(THREE: typeof import("three"), canvas: HTMLCanvasElement) {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const mobile = window.innerWidth < 760;

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: !mobile,
    alpha: false,
    powerPreference: "high-performance",
  });
  renderer.setClearColor(0xc8cab2, 1);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, mobile ? 1.25 : 1.6));

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0xc8cab2, 7, 18);

  const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 40);
  camera.position.set(0, 0.2, 9);

  scene.add(new THREE.AmbientLight(0xf7f4ee, 1.15));
  const sun = new THREE.DirectionalLight(0xf0ddb0, 2.1);
  sun.position.set(4, 6, 5);
  scene.add(sun);
  const fill = new THREE.DirectionalLight(0x8ea084, 0.7);
  fill.position.set(-5, -2, 3);
  scene.add(fill);

  const root = new THREE.Group();
  scene.add(root);

  const disposed: { geometry: THREE.BufferGeometry; material: THREE.Material }[] = [];

  function addMesh(mesh: THREE.Mesh, geometry: THREE.BufferGeometry, material: THREE.Material) {
    disposed.push({ geometry, material });
    root.add(mesh);
    return mesh;
  }

  const beamGeo = new THREE.BoxGeometry(0.16, 5.4, 1.15);
  const beamColors = [0xf4ead2, 0xf7f4ee, 0xe4d7b0, 0xd5deC4];
  const beams = beamColors.map((color, index) => {
    const material = new THREE.MeshStandardMaterial({
      color,
      transparent: true,
      opacity: 0.34,
      roughness: 0.85,
      metalness: 0.02,
    });
    const mesh = new THREE.Mesh(beamGeo, material);
    mesh.position.set(-3.2 + index * 1.7, index % 2 === 0 ? 0.4 : -0.6, -1.2 + (index % 3) * 0.45);
    mesh.rotation.z = -0.42;
    mesh.rotation.y = 0.15 * index;
    return addMesh(mesh, index === 0 ? beamGeo : beamGeo, material);
  });

  const orbGeo = new THREE.SphereGeometry(mobile ? 0.7 : 0.95, 32, 32);
  const orbColors = [0x8ea084, 0x5c6648, 0xe7eadc, 0xb7c3a4];
  const orbs = orbColors.map((color, index) => {
    const material = new THREE.MeshStandardMaterial({
      color,
      transparent: true,
      opacity: 0.55,
      roughness: 0.55,
      metalness: 0.04,
    });
    const mesh = new THREE.Mesh(orbGeo, material);
    const side = index % 2 === 0 ? -1 : 1;
    mesh.position.set(side * (3.1 + (index % 2) * 0.4), 1.6 - index * 0.9, -0.4 - index * 0.25);
    return addMesh(mesh, orbGeo, material);
  });

  const ringGeo = new THREE.TorusGeometry(2.15, 0.035, 16, 80);
  const ringMat = new THREE.MeshStandardMaterial({
    color: 0x3e4634,
    transparent: true,
    opacity: 0.28,
    roughness: 0.4,
  });
  const ring = addMesh(new THREE.Mesh(ringGeo, ringMat), ringGeo, ringMat);
  ring.position.set(2.4, -0.2, -1.5);
  ring.rotation.x = 1.15;

  const count = mobile ? 90 : 180;
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i += 1) {
    positions[i * 3] = (Math.random() - 0.5) * 12;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 6;
  }
  const dustGeo = new THREE.BufferGeometry();
  dustGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  const dustMat = new THREE.PointsMaterial({
    color: 0xf7f4ee,
    size: 0.035,
    transparent: true,
    opacity: 0.7,
    depthWrite: false,
  });
  const dust = new THREE.Points(dustGeo, dustMat);
  root.add(dust);
  disposed.push({ geometry: dustGeo, material: dustMat });

  const pointer = { x: 0, y: 0 };
  let scroll = window.scrollY;
  let frame = 0;

  function resize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    camera.aspect = width / Math.max(height, 1);
    camera.updateProjectionMatrix();
    renderer.setSize(width, height, false);
  }

  function onPointer(event: PointerEvent) {
    pointer.x = event.clientX / window.innerWidth - 0.5;
    pointer.y = event.clientY / window.innerHeight - 0.5;
  }

  function onScroll() {
    scroll = window.scrollY;
  }

  function render(now: number) {
    const t = reduce ? 0.6 : now / 1000;
    beams.forEach((beam, index) => {
      beam.position.y = (index % 2 === 0 ? 0.35 : -0.45) + Math.sin(t * 0.35 + index) * 0.28;
      beam.rotation.z = -0.42 + Math.sin(t * 0.22 + index) * 0.06;
    });
    orbs.forEach((orb, index) => {
      const side = index % 2 === 0 ? -1 : 1;
      orb.position.y = 1.5 - index * 0.85 + Math.sin(t * 0.5 + index) * 0.22;
      orb.position.x = side * (3.05 + Math.cos(t * 0.28 + index) * 0.18);
    });
    ring.rotation.z = t * 0.18;
    ring.rotation.y = Math.sin(t * 0.2) * 0.25;
    dust.rotation.y = t * 0.04;
    dust.position.y = Math.sin(t * 0.3) * 0.15;

    const targetX = pointer.x * 0.7;
    const targetY = 0.2 - pointer.y * 0.35 - scroll * 0.00055;
    camera.position.x += (targetX - camera.position.x) * 0.04;
    camera.position.y += (targetY - camera.position.y) * 0.04;
    camera.lookAt(0, 0, 0);
    renderer.render(scene, camera);
  }

  function tick(now: number) {
    render(now);
    if (!reduce) frame = window.requestAnimationFrame(tick);
  }

  resize();
  window.addEventListener("resize", resize);
  window.addEventListener("pointermove", onPointer);
  window.addEventListener("scroll", onScroll, { passive: true });
  frame = window.requestAnimationFrame(tick);
  if (reduce) render(600);

  return () => {
    window.cancelAnimationFrame(frame);
    window.removeEventListener("resize", resize);
    window.removeEventListener("pointermove", onPointer);
    window.removeEventListener("scroll", onScroll);
    disposed.forEach(({ geometry, material }) => {
      geometry.dispose();
      material.dispose();
    });
    renderer.dispose();
  };
}
