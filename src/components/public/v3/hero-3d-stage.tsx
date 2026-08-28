"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

interface Hero3DStageProps {
  activeCameraId: string;
  cameras: Array<{
    id: string;
    name: string;
    image: string;
    spec: string;
  }>;
  onCameraSelect: (id: string) => void;
}

export function Hero3DStage({
  activeCameraId,
  cameras,
}: Hero3DStageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraGroupRef = useRef<THREE.Group | null>(null);
  const meshMapRef = useRef<Map<string, THREE.Mesh>>(new Map());
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const scrollRef = useRef({ y: 0, targetY: 0 });
  const [isSupported, setIsSupported] = useState(true);

  const activeIdx = cameras.findIndex((c) => c.id === activeCameraId);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check WebGL support & reduced motion
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (!gl) {
        setIsSupported(false);
        return;
      }
    } catch {
      setIsSupported(false);
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const width = container.clientWidth || 500;
    const height = container.clientHeight || 450;

    // 1. Scene & Perspective Camera
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 0, 4.2);

    // 2. High-performance, capped DPR WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    rendererRef.current = renderer;
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;

    container.appendChild(renderer.domElement);

    // 3. Studio Lighting Rig
    const ambientLight = new THREE.AmbientLight(0xfff8f0, 1.4);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
    keyLight.position.set(3, 4, 4);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xe8f0ff, 1.0);
    fillLight.position.set(-3, 2, 3);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xd95d39, 1.8);
    rimLight.position.set(0, 3, -3);
    scene.add(rimLight);

    // 4. Ground Shadow Disc
    const shadowCanvas = document.createElement("canvas");
    shadowCanvas.width = 256;
    shadowCanvas.height = 256;
    const sCtx = shadowCanvas.getContext("2d");
    if (sCtx) {
      const grad = sCtx.createRadialGradient(128, 128, 0, 128, 128, 120);
      grad.addColorStop(0, "rgba(20, 15, 10, 0.35)");
      grad.addColorStop(0.5, "rgba(20, 15, 10, 0.12)");
      grad.addColorStop(1, "rgba(20, 15, 10, 0)");
      sCtx.fillStyle = grad;
      sCtx.fillRect(0, 0, 256, 256);
    }
    const shadowTex = new THREE.CanvasTexture(shadowCanvas);
    const shadowGeo = new THREE.PlaneGeometry(3.6, 1.4);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      depthWrite: false,
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2.3;
    shadowMesh.position.set(0, -1.15, 0);
    scene.add(shadowMesh);

    // 5. Camera Root Group
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);
    cameraGroupRef.current = rootGroup;

    // 6. Texture Loader for High-Resolution Camera Cutouts
    const texLoader = new THREE.TextureLoader();
    const meshMap = new Map<string, THREE.Mesh>();
    meshMapRef.current = meshMap;

    cameras.forEach((cam, idx) => {
      texLoader.load(cam.image, (tex) => {
        tex.generateMipmaps = true;
        tex.minFilter = THREE.LinearMipmapLinearFilter;
        tex.magFilter = THREE.LinearFilter;

        // Custom Double-sided Depth-lit Plane
        const planeGeo = new THREE.PlaneGeometry(2.5, 2.5);
        const planeMat = new THREE.MeshStandardMaterial({
          map: tex,
          transparent: true,
          roughness: 0.35,
          metalness: 0.25,
          alphaTest: 0.05,
          side: THREE.DoubleSide,
        });

        const mesh = new THREE.Mesh(planeGeo, planeMat);
        mesh.userData = { id: cam.id, defaultIdx: idx };

        // Position initial cards
        const isCurrent = cam.id === activeCameraId;
        mesh.position.set(0, 0, isCurrent ? 0 : -1.5);
        mesh.scale.setScalar(isCurrent ? 1.0 : 0.65);
        mesh.visible = isCurrent || Math.abs(idx - activeIdx) <= 1;

        rootGroup.add(mesh);
        meshMap.set(cam.id, mesh);
      });
    });

    // 7. Mouse and Scroll Listeners
    const handleMouseMove = (e: MouseEvent) => {
      if (prefersReducedMotion) return;
      const { innerWidth, innerHeight } = window;
      mouseRef.current.targetX = (e.clientX / innerWidth - 0.5) * 2;
      mouseRef.current.targetY = (e.clientY / innerHeight - 0.5) * 2;
    };

    const handleScroll = () => {
      if (prefersReducedMotion) return;
      const scrollY = window.scrollY || window.pageYOffset;
      scrollRef.current.targetY = Math.min(scrollY / 600, 1.2);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });

    // 8. Animation Loop with Eased Physics
    let animationId: number;
    let clock = new THREE.Clock();

    const render = () => {
      animationId = requestAnimationFrame(render);
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Smooth mouse interpolation
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.06;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.06;

      // Smooth scroll interpolation
      scrollRef.current.y += (scrollRef.current.targetY - scrollRef.current.y) * 0.08;

      if (rootGroup && !prefersReducedMotion) {
        // Idle gentle breathing float
        const floatY = Math.sin(time * 1.5) * 0.04;
        const floatRotZ = Math.cos(time * 1.2) * 0.015;

        // Interactive mouse rotation + scroll-linked exit choreography
        rootGroup.position.x = mouseRef.current.x * 0.25 - scrollRef.current.y * 0.4;
        rootGroup.position.y = -mouseRef.current.y * 0.2 + floatY - scrollRef.current.y * 0.3;
        rootGroup.position.z = -scrollRef.current.y * 0.8;

        rootGroup.rotation.y = mouseRef.current.x * 0.28 + floatRotZ - scrollRef.current.y * 0.25;
        rootGroup.rotation.x = -mouseRef.current.y * 0.22;
        rootGroup.rotation.z = floatRotZ;

        // Shadow follow
        shadowMesh.position.x = rootGroup.position.x * 0.7;
        shadowMesh.scale.setScalar(1.0 - scrollRef.current.y * 0.3);
      }

      // Smooth Camera Mesh Transitions
      meshMap.forEach((mesh, id) => {
        const isCurrent = id === activeCameraId;
        const targetScale = isCurrent ? 1.0 : 0.6;
        const targetZ = isCurrent ? 0 : -1.2;
        const targetOpacity = isCurrent ? 1.0 : 0.0;

        mesh.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * 8);
        mesh.position.z += (targetZ - mesh.position.z) * (delta * 8);

        const mat = mesh.material as THREE.MeshStandardMaterial;
        if (mat) {
          mat.opacity += (targetOpacity - mat.opacity) * (delta * 8);
          mesh.visible = mat.opacity > 0.02;
        }
      });

      renderer.render(scene, camera);
    };

    render();

    // 9. Resize Handling
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
      cancelAnimationFrame(animationId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);

      meshMap.forEach((mesh) => {
        mesh.geometry.dispose();
        if (Array.isArray(mesh.material)) {
          mesh.material.forEach((m) => m.dispose());
        } else {
          mesh.material.dispose();
        }
      });
      meshMap.clear();

      shadowGeo.dispose();
      shadowMat.dispose();
      shadowTex.dispose();

      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [cameras, activeCameraId, activeIdx]);

  if (!isSupported) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className="w-full h-full min-h-[380px] sm:min-h-[460px] flex items-center justify-center pointer-events-none select-none"
    />
  );
}
