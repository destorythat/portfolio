"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { profile, projects } from "@/lib/profile";

const chapters = [
  {
    id: "intro",
    kicker: "Collection",
    title: "Three years of products.",
    body: "Scroll through the work. Each piece is a product I shipped, from the interface through to the API.",
    href: "/#work",
    link: "Enter the work",
  },
  ...projects.map((project) => ({
    id: project.slug,
    kicker: project.category,
    title: project.name,
    body: project.description,
    href: `/work/${project.slug}`,
    link: "Open the case study",
  })),
];

export function ScrollStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progressRef = useRef(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const onScroll = () => {
      const start = section.offsetTop;
      const span = Math.max(section.offsetHeight - window.innerHeight, 1);
      const next = Math.min(1, Math.max(0, (window.scrollY - start) / span));
      progressRef.current = next;
      setProgress(next);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let alive = true;
    let cleanup = () => {};
    import("three").then((THREE) => {
      if (!alive) return;
      cleanup = mount(THREE, canvas, progressRef);
    });
    return () => {
      alive = false;
      cleanup();
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative h-[560vh]" aria-label="Selected work, told in sequence">
      <div className="sticky top-16 grid h-[calc(100dvh-4rem)] items-center gap-8 overflow-hidden px-4 sm:px-8 lg:grid-cols-[minmax(0,34rem)_1fr]">
        <div className="relative z-10 min-h-64">
          {chapters.map((chapter, index) => {
            const center = (index + 0.5) / chapters.length;
            const opacity = Math.max(0, 1 - Math.abs(progress - center) * chapters.length * 1.35);
            return (
              <article
                key={chapter.id}
                className="absolute inset-x-0 top-0 max-w-xl"
                style={{
                  opacity,
                  transform: `translateY(${(progress - center) * -48}px)`,
                  pointerEvents: opacity > 0.45 ? "auto" : "none",
                }}
              >
                <p className="font-mono text-xs uppercase tracking-[0.22em] text-olive">
                  {String(index + 1).padStart(2, "0")} / {String(chapters.length).padStart(2, "0")} · {chapter.kicker}
                </p>
                <h2 className="mt-4 font-display text-5xl leading-[0.95] tracking-tight sm:text-7xl">{chapter.title}</h2>
                <p className="mt-5 text-base leading-7 text-muted">{chapter.body}</p>
                <Link href={chapter.href} className="mt-6 inline-block text-sm text-foreground underline">
                  {chapter.link}
                </Link>
              </article>
            );
          })}
          <p className="absolute bottom-0 font-mono text-[11px] uppercase tracking-[0.18em] text-faint">
            {profile.name} · scroll the collection
          </p>
        </div>
        <canvas ref={canvasRef} className="h-[46vh] w-full lg:h-[78vh]" aria-hidden="true" />
      </div>
    </section>
  );
}

function mount(
  THREE: typeof import("three"),
  canvas: HTMLCanvasElement,
  progressRef: { current: number },
) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 40);
  camera.position.set(0, 1.1, 7.2);

  scene.add(new THREE.AmbientLight(0xf7f4ee, 1.3));
  const sun = new THREE.DirectionalLight(0xf4ead2, 2.1);
  sun.position.set(3, 6, 4);
  scene.add(sun);
  const fill = new THREE.DirectionalLight(0x8ea084, 0.7);
  fill.position.set(-4, 1, -2);
  scene.add(fill);

  const piece = new THREE.Group();
  const stone = new THREE.MeshStandardMaterial({ color: 0xf7f4ee, roughness: 0.62 });
  const moss = new THREE.MeshStandardMaterial({ color: 0x3e4634, roughness: 0.55 });
  const olive = new THREE.MeshStandardMaterial({ color: 0x8ea084, roughness: 0.48 });
  const ink = new THREE.MeshStandardMaterial({ color: 0x2c3328, roughness: 0.4 });

  const deck = new THREE.Mesh(new THREE.BoxGeometry(3.4, 0.08, 2.1), moss);
  deck.position.y = -1.15;
  const keyboard = new THREE.Mesh(new THREE.BoxGeometry(2.5, 0.06, 1.35), ink);
  keyboard.position.set(0, -1.05, 0.15);
  const screen = new THREE.Mesh(new THREE.BoxGeometry(2.35, 1.5, 0.08), ink);
  screen.position.set(0, -0.05, -0.72);
  screen.rotation.x = -0.12;
  const glass = new THREE.Mesh(new THREE.BoxGeometry(2.12, 1.28, 0.03), stone);
  glass.position.set(0, -0.02, -0.66);
  glass.rotation.x = -0.12;
  for (let row = 0; row < 5; row += 1) {
    const line = new THREE.Mesh(new THREE.BoxGeometry(1.15 - (row % 2) * 0.35, 0.045, 0.02), row % 2 === 0 ? olive : moss);
    line.position.set(-0.28, 0.38 - row * 0.18, -0.6);
    line.rotation.x = -0.12;
    piece.add(line);
  }
  const api = new THREE.Mesh(new THREE.BoxGeometry(1.05, 0.62, 0.06), stone);
  api.position.set(1.55, 0.35, 0.35);
  api.rotation.y = -0.4;
  const apiBar = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.06, 0.02), olive);
  apiBar.position.set(1.48, 0.48, 0.4);
  apiBar.rotation.y = -0.4;
  const database = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.28, 0.7, 24), olive);
  database.position.set(-1.45, -0.55, 0.25);
  const cap = new THREE.Mesh(new THREE.SphereGeometry(0.28, 20, 12), moss);
  cap.scale.y = 0.45;
  cap.position.set(-1.45, -0.18, 0.25);
  const blocks = [
    [-0.7, 0.85, 0.55],
    [0.15, 1.05, 0.2],
    [0.85, 0.95, -0.15],
  ];
  blocks.forEach(([x, y, z], index) => {
    const block = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.42, 0.42), index === 1 ? ink : stone);
    block.position.set(x, y, z);
    block.rotation.y = 0.4 * index;
    piece.add(block);
  });

  piece.add(deck, keyboard, screen, glass, api, apiBar, database, cap);
  scene.add(piece);

  const shots = [
    { x: 0.2, y: 0.55, z: 7.6, lookY: -0.15, rot: -0.35 },
    { x: 2.6, y: 0.9, z: 4.2, lookY: 0.15, rot: 0.45 },
    { x: -2.3, y: 1.15, z: 3.6, lookY: 0.55, rot: 1.1 },
    { x: 1.8, y: 0.35, z: 3.4, lookY: -0.2, rot: 1.9 },
    { x: -1.4, y: 0.15, z: 4.4, lookY: -0.55, rot: 2.6 },
    { x: 0.1, y: 1.2, z: 6.2, lookY: 0.1, rot: 3.4 },
  ];
  const desired = new THREE.Vector3();
  const lookTarget = new THREE.Vector3();
  const look = new THREE.Vector3(0, 0.3, 0);

  let frame = 0;
  function resize() {
    const width = canvas.clientWidth;
    const height = Math.max(canvas.clientHeight, 1);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height, false);
  }
  function mix(from: number, to: number, amount: number) {
    return from + (to - from) * amount;
  }

  function tick() {
    const progress = progressRef.current;
    const scaled = progress * (shots.length - 1);
    const index = Math.min(shots.length - 2, Math.floor(scaled));
    const raw = scaled - index;
    const eased = raw * raw * (3 - 2 * raw);
    const from = shots[index];
    const to = shots[index + 1];
    desired.set(mix(from.x, to.x, eased), mix(from.y, to.y, eased), mix(from.z, to.z, eased));
    lookTarget.set(0, mix(from.lookY, to.lookY, eased), 0);
    camera.position.lerp(desired, 0.12);
    look.lerp(lookTarget, 0.12);
    camera.lookAt(look);
    const turn = mix(from.rot, to.rot, eased);
    piece.rotation.y += (turn - piece.rotation.y) * 0.12;
    renderer.render(scene, camera);
    frame = window.requestAnimationFrame(tick);
  }

  const observer = new ResizeObserver(resize);
  observer.observe(canvas);
  resize();
  frame = window.requestAnimationFrame(tick);

  return () => {
    window.cancelAnimationFrame(frame);
    observer.disconnect();
    scene.traverse((object: import("three").Mesh) => {
      const mesh = object;
      if (!mesh.isMesh) return;
      mesh.geometry?.dispose();
      const material = mesh.material;
      if (Array.isArray(material)) material.forEach((item) => item.dispose());
      else material?.dispose();
    });
    renderer.dispose();
  };
}
