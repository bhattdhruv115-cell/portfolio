import { useEffect, useRef } from "react";
import * as THREE from "three";

const THREATS = [
  { lat: 40.7, lng: -74.0, level: "critical" },
  { lat: 51.5, lng: -0.1, level: "warning" },
  { lat: 35.7, lng: 139.7, level: "warning" },
  { lat: -33.9, lng: 151.2, level: "critical" },
  { lat: 55.8, lng: 37.6, level: "critical" },
  { lat: 1.35, lng: 103.8, level: "warning" },
  { lat: -23.5, lng: -46.6, level: "warning" },
];

function latLngToVec3(lat, lng, radius) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

export default function SecurityGlobe({ height = 380 }) {
  const canvasRef = useRef(null);
  const mountRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const mount = mountRef.current;
    let width = mount.clientWidth;
    let h = height;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / h, 0.1, 100);
    camera.position.set(0, 0.4, 6.5);
    let targetZ = 6.5;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setSize(width, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    // Earth surface — real continents via texture
    const earthGeo = new THREE.SphereGeometry(2, 64, 64);
    const loader = new THREE.TextureLoader();
    loader.crossOrigin = "anonymous";
    const earthTexture = loader.load(
      "https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg"
    );
    const earthMat = new THREE.MeshBasicMaterial({
      map: earthTexture,
      color: 0x88aacc,
    });
    const earth = new THREE.Mesh(earthGeo, earthMat);
    globeGroup.add(earth);

    // Tech grid wireframe overlay
    const gridGeo = new THREE.IcosahedronGeometry(2.03, 3);
    const gridMat = new THREE.MeshBasicMaterial({
      color: 0x00eaff,
      wireframe: true,
      transparent: true,
      opacity: 0.12,
    });
    globeGroup.add(new THREE.Mesh(gridGeo, gridMat));

    // Outer atmosphere glow
    const glowGeo = new THREE.SphereGeometry(2.18, 32, 32);
    const glowMat = new THREE.MeshBasicMaterial({
      color: 0x00eaff,
      transparent: true,
      opacity: 0.06,
      side: THREE.BackSide,
    });
    globeGroup.add(new THREE.Mesh(glowGeo, glowMat));

    // Threat markers + pulsing rings
    const markerGroup = new THREE.Group();
    globeGroup.add(markerGroup);
    const pulses = [];

    THREATS.forEach((t) => {
      const pos = latLngToVec3(t.lat, t.lng, 2.04);
      const color = t.level === "critical" ? 0xff4d4d : 0xffb84d;

      const dot = new THREE.Mesh(
        new THREE.SphereGeometry(0.035, 12, 12),
        new THREE.MeshBasicMaterial({ color })
      );
      dot.position.copy(pos);
      markerGroup.add(dot);

      const ring = new THREE.Mesh(
        new THREE.RingGeometry(0.05, 0.06, 24),
        new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.8, side: THREE.DoubleSide })
      );
      ring.position.copy(pos);
      ring.lookAt(pos.clone().multiplyScalar(2));
      markerGroup.add(ring);

      pulses.push({ ring, phase: Math.random() * Math.PI * 2 });
    });

    // Radar sweep
    const sweep = new THREE.Mesh(
      new THREE.CircleGeometry(2.3, 48, 0, Math.PI / 6),
      new THREE.MeshBasicMaterial({ color: 0x00eaff, transparent: true, opacity: 0.08, side: THREE.DoubleSide })
    );
    sweep.rotation.x = Math.PI / 2;
    scene.add(sweep);

    const mouse = { x: 0, y: 0 };
    function onMove(e) {
      const rect = mount.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    }
    function onEnter() { targetZ = 5.2; }
    function onLeave() { targetZ = 6.5; }
    mount.addEventListener("pointermove", onMove);
    mount.addEventListener("pointerenter", onEnter);
    mount.addEventListener("pointerleave", onLeave);

    const clock = new THREE.Clock();
    let raf;
    function animate() {
      const t = clock.getElapsedTime();

      globeGroup.rotation.y = t * 0.12;
      sweep.rotation.z = t * 1.1;

      pulses.forEach((p) => {
        const s = 1 + Math.sin(t * 2 + p.phase) * 0.6 + 0.7;
        p.ring.scale.setScalar(s);
        p.ring.material.opacity = Math.max(0, 0.8 - (s - 1) * 0.5);
      });

      camera.position.x += (mouse.x * 1.0 - camera.position.x) * 0.04;
      camera.position.y += (0.4 + mouse.y * 0.6 - camera.position.y) * 0.04;
      camera.position.z += (targetZ - camera.position.z) * 0.06;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    }
    animate();

    function onResize() {
      width = mount.clientWidth;
      camera.aspect = width / h;
      camera.updateProjectionMatrix();
      renderer.setSize(width, h);
    }
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      mount.removeEventListener("pointermove", onMove);
      mount.removeEventListener("pointerenter", onEnter);
      mount.removeEventListener("pointerleave", onLeave);
      renderer.dispose();
      earthGeo.dispose();
      earthMat.dispose();
      earthTexture.dispose();
      gridGeo.dispose();
      gridMat.dispose();
      glowGeo.dispose();
      glowMat.dispose();
    };
  }, [height]);

  return (
    <div ref={mountRef} style={{ width: "100%", height, position: "relative" }}>
      <canvas ref={canvasRef} style={{ width: "100%", height: "100%", display: "block" }} />
    </div>
  );
}