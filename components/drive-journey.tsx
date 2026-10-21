"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { profile, projects, skillGroups } from "@/lib/profile";

type Sign = {
  id: string;
  kicker: string;
  title: string;
  body: string;
  href?: string;
  z: number;
};

const GAP = 32;

function buildSigns(): Sign[] {
  const items: Omit<Sign, "z">[] = [
    {
      id: "start",
      kicker: "Start",
      title: profile.name,
      body: `${profile.role}. Five years of products, from the interface through to the API.`,
    },
    {
      id: "story",
      kicker: "Story",
      title: "The path",
      body: profile.summary,
    },
    ...projects.map((project) => ({
      id: project.slug,
      kicker: project.category,
      title: project.name,
      body: `${project.lede} ${project.stack.join(" · ")}`,
      href: `/work/${project.slug}`,
    })),
    ...skillGroups.map((group) => ({
      id: `skill-${group.label}`,
      kicker: "Skills",
      title: group.label,
      body: group.items.join(" · "),
      href: "/skills",
    })),
    {
      id: "arrive",
      kicker: "Arrive",
      title: "Let's talk",
      body: "The drive ends here. The work is behind you.",
      href: "/contact",
    },
  ];

  return items.map((item, index) => ({ ...item, z: -18 - index * GAP }));
}

const signs = buildSigns();
const roadEnd = signs[signs.length - 1].z - 22;

function paintSign(title: string, kicker: string) {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");
  if (!ctx) return canvas;
  ctx.fillStyle = "#f7f4ee";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  const family = getComputedStyle(document.body).fontFamily;
  ctx.fillStyle = "#5c6648";
  ctx.font = `500 40px ${family}`;
  ctx.fillText(kicker.toUpperCase(), 64, 92);
  ctx.fillStyle = "#2c3328";
  ctx.font = `500 78px ${family}`;
  const words = title.split(" ");
  let line = "";
  let y = 210;
  words.forEach((word) => {
    const next = line ? `${line} ${word}` : word;
    if (line && ctx.measureText(next).width > 880) {
      ctx.fillText(line, 64, y);
      line = word;
      y += 92;
    } else {
      line = next;
    }
  });
  if (line) ctx.fillText(line, 64, y);
  return canvas;
}

export function DriveJourney() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeId, setActiveId] = useState(signs[0].id);
  const [speed, setSpeed] = useState(0);
  const active = signs.find((sign) => sign.id === activeId) ?? signs[0];
  const index = Math.max(0, signs.findIndex((sign) => sign.id === active.id));
  const progress = index / (signs.length - 1);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let alive = true;
    let cleanup = () => {};

    import("three").then((THREE) => {
      if (!alive) return;
      cleanup = mount(THREE, canvas, (id, nextSpeed) => {
        setActiveId((current) => (current === id ? current : id));
        setSpeed((current) => (current === nextSpeed ? current : nextSpeed));
      });
    });

    return () => {
      alive = false;
      cleanup();
    };
  }, []);

  return (
    <div className="fixed left-0 top-0 z-20 h-[calc(100dvh-4.5rem)] w-full bg-[#c8cab2]">
      <canvas ref={canvasRef} className="absolute inset-0 block h-full w-full touch-none" />
      <aside className="pointer-events-none absolute left-4 top-6 max-w-md rounded-[1.4rem] border border-[#2c3328]/10 bg-[#f7f4ee]/92 p-5 text-[#2c3328] shadow-xl sm:left-8 sm:p-6">
        <p className="text-[11px] uppercase tracking-[0.18em] text-[#5c6648]">
          {active.kicker}
        </p>
        <h2 className="mt-2 font-serif text-3xl leading-none sm:text-4xl">{active.title}</h2>
        <p className="mt-3 text-sm leading-6">{active.body}</p>
        {active.href ? (
          <Link href={active.href} className="pointer-events-auto mt-4 inline-block text-sm underline">
            Open
          </Link>
        ) : null}
      </aside>
      <div className="pointer-events-none absolute bottom-6 left-1/2 w-[min(28rem,calc(100%-2rem))] -translate-x-1/2 rounded-full border border-[#2c3328]/10 bg-[#f7f4ee]/92 px-4 py-3 text-[#2c3328]">
        <div className="mb-2 flex items-center justify-between text-[11px] uppercase tracking-[0.16em] text-[#5c6648]">
          <span>Arrows, scroll, or drag</span>
          <span>{speed} km/h</span>
        </div>
        <div className="h-1 overflow-hidden rounded-full bg-[#2c3328]/15">
          <div className="h-full bg-[#3e4634]" style={{ width: `${progress * 100}%` }} />
        </div>
      </div>
    </div>
  );
}

function mount(
  THREE: typeof import("three"),
  canvas: HTMLCanvasElement,
  onProgress: (id: string, speed: number) => void,
) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  renderer.setClearColor(0xc8cab2, 1);
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0xc8cab2, 18, 86);
  const camera = new THREE.PerspectiveCamera(52, 1, 0.1, 140);

  scene.add(new THREE.AmbientLight(0xf7f4ee, 1.05));
  const sun = new THREE.DirectionalLight(0xf0ddb0, 1.7);
  sun.position.set(6, 12, 8);
  scene.add(sun);
  const fill = new THREE.DirectionalLight(0x8ea084, 0.55);
  fill.position.set(-6, 3, -2);
  scene.add(fill);

  const beams: import("three").Mesh[] = [];
  const orbs: import("three").Mesh[] = [];
  const rings: import("three").Mesh[] = [];
  const beamGeo = new THREE.BoxGeometry(0.55, 16, 2.6);
  const orbGeo = new THREE.SphereGeometry(3.6, 32, 32);
  const ringGeo = new THREE.TorusGeometry(6.4, 0.08, 16, 80);
  const beamColors = [0xf4ead2, 0xf7f4ee, 0xe4d7b0, 0xd5dec4];
  const orbColors = [0x8ea084, 0x5c6648, 0xe7eadc, 0xb7c3a4];

  for (let set = 0; set < 5; set += 1) {
    const z = -4 - set * 130;
    beamColors.forEach((color, index) => {
      const mesh = new THREE.Mesh(
        beamGeo,
        new THREE.MeshStandardMaterial({
          color,
          transparent: true,
          opacity: 0.4,
          roughness: 0.85,
          depthWrite: false,
        }),
      );
      mesh.position.set(-9 + index * 5.4, index % 2 === 0 ? 8.2 : 6.6, z - index * 1.6);
      mesh.rotation.z = -0.42;
      mesh.rotation.y = 0.15 * index;
      mesh.userData.baseY = mesh.position.y;
      scene.add(mesh);
      beams.push(mesh);
    });
    orbColors.forEach((color, index) => {
      const mesh = new THREE.Mesh(
        orbGeo,
        new THREE.MeshStandardMaterial({
          color,
          transparent: true,
          opacity: 0.52,
          roughness: 0.55,
          depthWrite: false,
        }),
      );
      const side = index % 2 === 0 ? -1 : 1;
      mesh.position.set(side * (7.5 + index * 0.8), 5.8 - index * 0.55, z - 6 - index * 2);
      mesh.userData.baseX = mesh.position.x;
      mesh.userData.baseY = mesh.position.y;
      scene.add(mesh);
      orbs.push(mesh);
    });
    const ring = new THREE.Mesh(
      ringGeo,
      new THREE.MeshStandardMaterial({
        color: 0x3e4634,
        transparent: true,
        opacity: 0.32,
        roughness: 0.4,
        depthWrite: false,
      }),
    );
    ring.position.set(6.5, 4.4, z - 8);
    ring.rotation.x = 1.15;
    scene.add(ring);
    rings.push(ring);
  }

  const dustCount = 240;
  const dustPositions = new Float32Array(dustCount * 3);
  for (let i = 0; i < dustCount; i += 1) {
    dustPositions[i * 3] = (Math.random() - 0.5) * 36;
    dustPositions[i * 3 + 1] = 2 + Math.random() * 12;
    dustPositions[i * 3 + 2] = 8 - Math.random() * (Math.abs(roadEnd) + 20);
  }
  const dustGeo = new THREE.BufferGeometry();
  dustGeo.setAttribute("position", new THREE.BufferAttribute(dustPositions, 3));
  const dustMat = new THREE.PointsMaterial({
    color: 0xf7f4ee,
    size: 0.07,
    transparent: true,
    opacity: 0.7,
    depthWrite: false,
  });
  const dust = new THREE.Points(dustGeo, dustMat);
  scene.add(dust);

  const length = Math.abs(roadEnd) + 50;
  const road = new THREE.Mesh(
    new THREE.PlaneGeometry(9, length),
    new THREE.MeshStandardMaterial({ color: 0x3e4634, roughness: 0.92 }),
  );
  road.rotation.x = -Math.PI / 2;
  road.position.set(0, 0.04, -length / 2 + 10);
  scene.add(road);

  const sage = new THREE.Color(0xc8cab2);
  const lowSage = new THREE.Color(0x6f775c);
  const highSage = new THREE.Color(0xe7eadc);
  function terrainHeight(x: number, along: number) {
    const ax = Math.abs(x);
    const wave = Math.sin(along * 0.04) * 0.45 + Math.sin(along * 0.012) * 0.7;
    let height = 0;
    if (ax > 4.6 && ax < 9.2) {
      const t = (ax - 4.6) / 4.6;
      height = -2.6 * Math.sin(Math.min(t, 1) * Math.PI);
    } else if (ax >= 9.2 && ax < 22) {
      const t = (ax - 9.2) / 12.8;
      const ridge = Math.sin(Math.min(t, 1) * Math.PI);
      height = ridge * (4.4 + wave);
    } else if (ax >= 22 && ax < 40) {
      const t = (ax - 22) / 18;
      const basin = Math.sin(Math.min(t, 1) * Math.PI);
      height = -2.3 * basin + wave * 0.2;
    }
    const trenchX = (x > 0 ? 1 : -1) * (29 + Math.sin(along * 0.02) * 2.2);
    const trench = Math.abs(x - trenchX);
    if (trench < 1.6) {
      const falloff = 1 - trench / 1.6;
      height -= 1.5 * falloff * falloff;
    }
    return height;
  }
  const groundGeo = new THREE.PlaneGeometry(110, length, 180, 220);
  const groundPos = groundGeo.attributes.position;
  const groundColors = new Float32Array(groundPos.count * 3);
  for (let i = 0; i < groundPos.count; i += 1) {
    const x = groundPos.getX(i);
    const along = groundPos.getY(i);
    const height = terrainHeight(x, along);
    groundPos.setZ(i, height);
    const color = sage.clone();
    if (height < 0) color.lerp(lowSage, THREE.MathUtils.clamp(-height / 2.6, 0, 1));
    else color.lerp(highSage, THREE.MathUtils.clamp(height / 4.4, 0, 1));
    groundColors[i * 3] = color.r;
    groundColors[i * 3 + 1] = color.g;
    groundColors[i * 3 + 2] = color.b;
  }
  groundPos.needsUpdate = true;
  groundGeo.setAttribute("color", new THREE.BufferAttribute(groundColors, 3));
  groundGeo.computeVertexNormals();
  const ground = new THREE.Mesh(
    groundGeo,
    new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 1, side: THREE.DoubleSide }),
  );
  ground.rotation.x = -Math.PI / 2;
  ground.position.set(0, 0, road.position.z);
  scene.add(ground);

  const dashGeo = new THREE.BoxGeometry(0.12, 0.03, 1.5);
  const dashMat = new THREE.MeshStandardMaterial({ color: 0xf7f4ee, roughness: 0.7 });
  const dashCount = Math.floor(length / 4);
  const dashes = new THREE.InstancedMesh(dashGeo, dashMat, dashCount);
  const dummy = new THREE.Object3D();
  for (let i = 0; i < dashCount; i += 1) {
    dummy.position.set(0, 0.06, 8 - i * 4);
    dummy.updateMatrix();
    dashes.setMatrixAt(i, dummy.matrix);
  }
  scene.add(dashes);

  const blockGeo = new THREE.BoxGeometry(2.2, 1, 2.2);
  const blockMat = new THREE.MeshStandardMaterial({ color: 0x5c6648, roughness: 0.82 });
  const paperMat = new THREE.MeshStandardMaterial({ color: 0xf7f4ee, roughness: 0.74 });
  const lampMat = new THREE.MeshStandardMaterial({
    color: 0xd4532b,
    emissive: 0xd4532b,
    emissiveIntensity: 0.7,
  });
  const lampGeo = new THREE.BoxGeometry(0.12, 0.7, 0.12);

  const boards: { mesh: import("three").Mesh; z: number }[] = [];
  const textures: import("three").CanvasTexture[] = [];

  signs.forEach((sign, index) => {
    const texture = new THREE.CanvasTexture(paintSign(sign.title, sign.kicker));
    texture.colorSpace = THREE.SRGBColorSpace;
    textures.push(texture);
    const material = new THREE.MeshStandardMaterial({
      map: texture,
      roughness: 0.72,
      transparent: true,
      opacity: 0.2,
    });
    const board = new THREE.Mesh(new THREE.PlaneGeometry(4.4, 2.2), material);
    const side = index % 2 === 0 ? -1 : 1;
    board.position.set(side * 4.6, 1.8, sign.z);
    board.lookAt(0, 1.8, sign.z);
    scene.add(board);
    boards.push({ mesh: board, z: sign.z });

    for (const edge of [-1, 1]) {
      const height = 1.4 + ((index + (edge > 0 ? 1 : 0)) % 4) * 0.85;
      const block = new THREE.Mesh(blockGeo, (index + (edge > 0 ? 1 : 0)) % 2 === 0 ? paperMat : blockMat);
      const blockX = edge * 15;
      const blockZ = sign.z + edge * 4;
      const lift = terrainHeight(blockX, road.position.z - blockZ);
      block.scale.y = height;
      block.position.set(blockX, lift + height / 2, blockZ);
      scene.add(block);
      const lamp = new THREE.Mesh(lampGeo, lampMat);
      lamp.position.set(edge * 4.15, 1.5, sign.z - 2);
      scene.add(lamp);
    }
  });

  const car = new THREE.Group();
  const shell = new THREE.Mesh(
    new THREE.BoxGeometry(1.7, 0.46, 3.5),
    new THREE.MeshStandardMaterial({ color: 0x2c3328, metalness: 0.28, roughness: 0.46 }),
  );
  shell.position.y = 0.46;
  const cabin = new THREE.Mesh(
    new THREE.BoxGeometry(1.3, 0.4, 1.45),
    new THREE.MeshStandardMaterial({ color: 0xf7f4ee, roughness: 0.22, metalness: 0.08 }),
  );
  cabin.position.set(0, 0.84, -0.15);
  const tail = new THREE.Mesh(
    new THREE.BoxGeometry(0.38, 0.1, 0.08),
    new THREE.MeshStandardMaterial({ color: 0xd4532b, emissive: 0xd4532b, emissiveIntensity: 1.5 }),
  );
  const tailRight = tail.clone();
  tail.position.set(-0.55, 0.5, 1.74);
  tailRight.position.set(0.55, 0.5, 1.74);
  const plateCanvas = document.createElement("canvas");
  plateCanvas.width = 512;
  plateCanvas.height = 160;
  const plateCtx = plateCanvas.getContext("2d");
  if (plateCtx) {
    plateCtx.fillStyle = "#ffffff";
    plateCtx.fillRect(0, 0, plateCanvas.width, plateCanvas.height);
    const family = getComputedStyle(document.body).fontFamily;
    plateCtx.fillStyle = "#2c3328";
    plateCtx.font = `600 72px ${family}`;
    plateCtx.textAlign = "center";
    plateCtx.textBaseline = "middle";
    plateCtx.fillText("NGK 0369", plateCanvas.width / 2, plateCanvas.height / 2);
  }
  const plateTexture = new THREE.CanvasTexture(plateCanvas);
  plateTexture.colorSpace = THREE.SRGBColorSpace;
  textures.push(plateTexture);
  const plate = new THREE.Mesh(
    new THREE.PlaneGeometry(0.62, 0.18),
    new THREE.MeshBasicMaterial({ map: plateTexture }),
  );
  plate.position.set(0, 0.36, 1.76);
  car.add(shell, cabin, tail, tailRight, plate);
  car.position.set(0, 0, 6);
  scene.add(car);

  const head = new THREE.SpotLight(0xf7f4ee, 2.2, 26, 0.5, 0.6);
  head.position.set(0, 1.15, 1.1);
  head.target.position.set(0, 0.3, -10);
  car.add(head, head.target);

  const keys = { forward: false, back: false };
  let velocity = 0;
  let shown = signs[0].id;
  let reportedSpeed = 0;
  let lastReport = 0;
  let last = performance.now();
  let frame = 0;
  let dragging = false;
  let lastPointerY = 0;

  function resize() {
    const width = canvas.clientWidth;
    const height = Math.max(canvas.clientHeight, 1);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height, false);
  }

  function onKey(event: KeyboardEvent, down: boolean) {
    const key = event.key.toLowerCase();
    if (key === "arrowup" || key === "w") {
      keys.forward = down;
      event.preventDefault();
    }
    if (key === "arrowdown" || key === "s") {
      keys.back = down;
      event.preventDefault();
    }
  }

  function onWheel(event: WheelEvent) {
    event.preventDefault();
    velocity += Math.sign(event.deltaY) * 3.2;
  }

  function onPointerDown(event: PointerEvent) {
    dragging = true;
    lastPointerY = event.clientY;
  }

  function onPointerMove(event: PointerEvent) {
    if (!dragging) return;
    velocity += (event.clientY - lastPointerY) * 0.06;
    lastPointerY = event.clientY;
  }

  function onPointerUp() {
    dragging = false;
  }

  const onDown = (event: KeyboardEvent) => onKey(event, true);
  const onUp = (event: KeyboardEvent) => onKey(event, false);

  function tick(now: number) {
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    if (keys.forward) velocity += 18 * dt;
    if (keys.back) velocity -= 22 * dt;
    velocity *= 0.985;
    velocity = Math.max(-7, Math.min(24, velocity));

    car.position.z -= velocity * dt;
    car.position.z = Math.max(roadEnd, Math.min(8, car.position.z));
    if (car.position.z <= roadEnd || car.position.z >= 8) velocity *= 0.45;

    const desired = new THREE.Vector3(car.position.x, car.position.y + 2.5, car.position.z + 7.2);
    camera.position.lerp(desired, 1 - Math.pow(0.0015, dt));
    camera.lookAt(car.position.x, 0.8, car.position.z - 5);

    const t = now / 1000;
    beams.forEach((beam, index) => {
      beam.position.y = beam.userData.baseY + Math.sin(t * 0.35 + index) * 0.35;
      beam.rotation.z = -0.42 + Math.sin(t * 0.22 + index) * 0.06;
    });
    orbs.forEach((orb, index) => {
      orb.position.y = orb.userData.baseY + Math.sin(t * 0.5 + index) * 0.28;
      orb.position.x = orb.userData.baseX + Math.cos(t * 0.28 + index) * 0.22;
    });
    rings.forEach((ring, index) => {
      ring.rotation.z = t * 0.18 + index;
      ring.rotation.y = Math.sin(t * 0.2 + index) * 0.25;
    });
    dust.rotation.y = t * 0.03;

    let nearest = signs[0];
    let best = Infinity;
    boards.forEach((board, index) => {
      const distance = Math.abs(board.z - car.position.z);
      const reveal = THREE.MathUtils.smoothstep(28, 7, distance);
      board.mesh.scale.setScalar(0.7 + reveal * 0.3);
      const material = board.mesh.material as import("three").MeshStandardMaterial;
      material.opacity = 0.12 + reveal * 0.88;
      if (distance < best) {
        best = distance;
        nearest = signs[index];
      }
    });

    const kmh = Math.round(Math.abs(velocity) * 4);
    if (now - lastReport > 160 && (nearest.id !== shown || Math.abs(kmh - reportedSpeed) >= 2)) {
      shown = nearest.id;
      reportedSpeed = kmh;
      lastReport = now;
      onProgress(shown, kmh);
    }

    renderer.render(scene, camera);
    frame = window.requestAnimationFrame(tick);
  }

  const observer = new ResizeObserver(resize);
  observer.observe(canvas);
  resize();
  window.addEventListener("resize", resize);
  window.addEventListener("keydown", onDown);
  window.addEventListener("keyup", onUp);
  window.addEventListener("wheel", onWheel, { passive: false });
  canvas.addEventListener("pointerdown", onPointerDown);
  window.addEventListener("pointermove", onPointerMove);
  window.addEventListener("pointerup", onPointerUp);
  frame = window.requestAnimationFrame(tick);

  return () => {
    window.cancelAnimationFrame(frame);
    observer.disconnect();
    window.removeEventListener("resize", resize);
    window.removeEventListener("keydown", onDown);
    window.removeEventListener("keyup", onUp);
    window.removeEventListener("wheel", onWheel);
    canvas.removeEventListener("pointerdown", onPointerDown);
    window.removeEventListener("pointermove", onPointerMove);
    window.removeEventListener("pointerup", onPointerUp);
    textures.forEach((texture) => texture.dispose());
    dustGeo.dispose();
    dustMat.dispose();
    scene.traverse((object: import("three").Mesh) => {
      const mesh = object as import("three").Mesh;
      if (!mesh.isMesh) return;
      mesh.geometry?.dispose();
      const material = mesh.material;
      if (Array.isArray(material)) material.forEach((item) => item.dispose());
      else material?.dispose();
    });
    renderer.dispose();
  };
}
