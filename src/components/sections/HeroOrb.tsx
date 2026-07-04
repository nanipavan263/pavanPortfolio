"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function HeroOrb() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    const width = container.clientWidth;
    const height = container.clientHeight;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 7;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 2. Complex Intricate 3D Object (TorusKnot + Wireframe Outer Shell)
    const objectGroup = new THREE.Group();
    scene.add(objectGroup);

    // Main Metallic Glass TorusKnot
    const knotGeometry = new THREE.TorusKnotGeometry(1.5, 0.45, 128, 32);
    const knotMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x9333ea,
      emissive: 0x3b0764,
      roughness: 0.15,
      metalness: 0.85,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      wireframe: false,
    });

    const mainKnot = new THREE.Mesh(knotGeometry, knotMaterial);
    objectGroup.add(mainKnot);

    // Outer Glowing Wireframe Shell
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0xf472b6,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const wireframeKnot = new THREE.Mesh(knotGeometry, wireframeMaterial);
    wireframeKnot.scale.set(1.05, 1.05, 1.05);
    objectGroup.add(wireframeKnot);

    // Orbiting Geometric Particles (Icosahedrons)
    const particleGroup = new THREE.Group();
    scene.add(particleGroup);

    const particleGeo = new THREE.IcosahedronGeometry(0.12, 1);
    const particleMat = new THREE.MeshStandardMaterial({
      color: 0xe879f9,
      roughness: 0.2,
      metalness: 0.8,
    });

    const particles: THREE.Mesh[] = [];
    const radius = 2.8;

    for (let i = 0; i < 8; i++) {
      const mesh = new THREE.Mesh(particleGeo, particleMat);
      const angle = (i / 8) * Math.PI * 2;
      mesh.position.set(
        Math.cos(angle) * radius,
        Math.sin(angle) * radius * 0.5,
        Math.sin(angle) * radius * 0.8
      );
      particleGroup.add(mesh);
      particles.push(mesh);
    }

    // 3. Dynamic Lighting Pass
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0xf472b6, 4, 50);
    pointLight1.position.set(6, 6, 6);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x818cf8, 3, 50);
    pointLight2.position.set(-6, -6, 4);
    scene.add(pointLight2);

    const pointLight3 = new THREE.PointLight(0xc084fc, 2.5, 50);
    pointLight3.position.set(0, 5, -5);
    scene.add(pointLight3);

    // 4. Mouse & Scroll Interaction
    let mouseX = 0;
    let mouseY = 0;
    let scrollY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const { left, top, width, height } = container.getBoundingClientRect();
      mouseX = ((e.clientX - left) / width - 0.5) * 2;
      mouseY = ((e.clientY - top) / height - 0.5) * 2;
    };

    const handleScroll = () => {
      scrollY = window.scrollY;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    // 5. Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Continuous 3D rotation + dynamic scroll-bound rotation shifts
      const scrollFactor = scrollY * 0.003;
      objectGroup.rotation.x = elapsedTime * 0.3 + scrollFactor;
      objectGroup.rotation.y = elapsedTime * 0.4 + scrollFactor * 1.2;
      objectGroup.rotation.z = Math.sin(elapsedTime * 0.2) * 0.2;

      particleGroup.rotation.y = -elapsedTime * 0.5 - scrollFactor;
      particleGroup.rotation.x = Math.cos(elapsedTime * 0.3) * 0.3;

      // Pulse individual particles
      particles.forEach((p, idx) => {
        p.rotation.x += 0.02;
        p.rotation.y += 0.02;
        p.scale.setScalar(1 + Math.sin(elapsedTime * 3 + idx) * 0.2);
      });

      // Smooth camera perspective response to mouse
      camera.position.x += (mouseX * 0.6 - camera.position.x) * 0.05;
      camera.position.y += (-mouseY * 0.6 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-[400px] sm:h-[500px] lg:h-[620px] relative pointer-events-none select-none flex items-center justify-center"
    />
  );
}
