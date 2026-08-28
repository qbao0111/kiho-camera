"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Rotate3d, Upload, RefreshCw, ZoomIn, Camera } from "lucide-react";

interface ThreeCameraCanvasProps {
  className?: string;
  modelUrl?: string;
}

export function ThreeCameraCanvas({ className = "", modelUrl = "/models/canon_r50.glb" }: ThreeCameraCanvasProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loadingModel, setLoadingModel] = useState(true);
  const [modelType, setModelType] = useState<"glb" | "procedural">("procedural");
  const [isAutoRotate, setIsAutoRotate] = useState(true);
  const [statusMessage, setStatusMessage] = useState<string>("Đang tải mô hình 3D...");

  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraGroupRef = useRef<THREE.Group | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 480;
    const height = container.clientHeight || 440;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0.3, 3.8);

    // 2. High-DPI Antialiased WebGL Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;

    container.appendChild(renderer.domElement);

    // 3. Orbit Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controlsRef.current = controls;
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enablePan = false;
    controls.autoRotate = isAutoRotate;
    controls.autoRotateSpeed = 2.0;
    controls.minDistance = 2.0;
    controls.maxDistance = 6.5;
    controls.maxPolarAngle = Math.PI / 2 + 0.3;

    // 4. Studio Lighting Environment
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.8);
    keyLight.position.set(4, 5, 5);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.bias = -0.001;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xddeeff, 1.5);
    fillLight.position.set(-4, 2, 4);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xe05822, 2.2);
    rimLight.position.set(0, 4, -4);
    scene.add(rimLight);

    const bottomGlow = new THREE.PointLight(0xffecd6, 1.2, 8);
    bottomGlow.position.set(0, -2, 2);
    scene.add(bottomGlow);

    // Ground Shadow Plane
    const shadowGeo = new THREE.PlaneGeometry(6, 6);
    const shadowMat = new THREE.ShadowMaterial({ opacity: 0.25 });
    const shadowPlane = new THREE.Mesh(shadowGeo, shadowMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -1.0;
    shadowPlane.receiveShadow = true;
    scene.add(shadowPlane);

    const rootModelGroup = new THREE.Group();
    scene.add(rootModelGroup);
    cameraGroupRef.current = rootModelGroup;

    // Detailed Procedural Canon EOS R50
    const createDetailedCanonR50Model = () => {
      const g = new THREE.Group();

      const matteBodyMat = new THREE.MeshStandardMaterial({
        color: 0x1a1a1a,
        roughness: 0.45,
        metalness: 0.3,
      });

      const texturedGripMat = new THREE.MeshStandardMaterial({
        color: 0x121212,
        roughness: 0.85,
        metalness: 0.1,
      });

      const metalChromeMat = new THREE.MeshStandardMaterial({
        color: 0xaaaaaa,
        roughness: 0.15,
        metalness: 0.95,
      });

      const canonRedRingMat = new THREE.MeshStandardMaterial({
        color: 0xd92518,
        roughness: 0.2,
        metalness: 0.7,
      });

      const multiCoatedGlassMat = new THREE.MeshPhysicalMaterial({
        color: 0x0a3545,
        transmission: 0.92,
        opacity: 1,
        transparent: true,
        roughness: 0.05,
        ior: 1.65,
        reflectivity: 0.95,
        clearcoat: 1.0,
        clearcoatRoughness: 0.05,
      });

      const sensorMat = new THREE.MeshStandardMaterial({
        color: 0x15655b,
        roughness: 0.1,
        metalness: 0.9,
      });

      // Chassis
      const bodyGeo = new THREE.BoxGeometry(1.6, 1.05, 0.75);
      const bodyMesh = new THREE.Mesh(bodyGeo, matteBodyMat);
      bodyMesh.castShadow = true;
      bodyMesh.receiveShadow = true;
      g.add(bodyMesh);

      // Grip
      const gripGeo = new THREE.CylinderGeometry(0.28, 0.32, 1.02, 32);
      const gripMesh = new THREE.Mesh(gripGeo, texturedGripMat);
      gripMesh.scale.set(0.9, 1.0, 1.4);
      gripMesh.position.set(0.72, -0.01, 0.28);
      gripMesh.rotation.y = -0.15;
      gripMesh.castShadow = true;
      g.add(gripMesh);

      // Prism
      const prismGeo = new THREE.CylinderGeometry(0.32, 0.48, 0.45, 4);
      const prismMesh = new THREE.Mesh(prismGeo, matteBodyMat);
      prismMesh.position.set(-0.05, 0.65, 0.05);
      prismMesh.rotation.y = Math.PI / 4;
      prismMesh.castShadow = true;
      g.add(prismMesh);

      // Eyecup
      const eyecupGeo = new THREE.BoxGeometry(0.35, 0.25, 0.12);
      const eyecupMesh = new THREE.Mesh(eyecupGeo, texturedGripMat);
      eyecupMesh.position.set(-0.05, 0.6, -0.42);
      g.add(eyecupMesh);

      // Hotshoe
      const hotshoeGeo = new THREE.BoxGeometry(0.2, 0.05, 0.22);
      const hotshoeMesh = new THREE.Mesh(hotshoeGeo, metalChromeMat);
      hotshoeMesh.position.set(-0.05, 0.88, 0.05);
      g.add(hotshoeMesh);

      // Mode Dial
      const modeDialGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.12, 32);
      const modeDial = new THREE.Mesh(modeDialGeo, metalChromeMat);
      modeDial.position.set(-0.55, 0.58, 0.05);
      g.add(modeDial);

      // Control Wheel
      const wheelGeo = new THREE.CylinderGeometry(0.16, 0.16, 0.08, 32);
      const wheel = new THREE.Mesh(wheelGeo, metalChromeMat);
      wheel.position.set(0.52, 0.56, 0.08);
      g.add(wheel);

      // Shutter
      const shutterGeo = new THREE.CylinderGeometry(0.09, 0.09, 0.08, 24);
      const shutter = new THREE.Mesh(shutterGeo, metalChromeMat);
      shutter.position.set(0.68, 0.54, 0.32);
      shutter.rotation.x = 0.25;
      g.add(shutter);

      // Rec Button
      const recGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.04, 16);
      const recButton = new THREE.Mesh(recGeo, canonRedRingMat);
      recButton.position.set(0.42, 0.56, 0.28);
      g.add(recButton);

      // Lens Mount & Barrel
      const mountRingGeo = new THREE.CylinderGeometry(0.55, 0.55, 0.08, 48);
      const mountRing = new THREE.Mesh(mountRingGeo, metalChromeMat);
      mountRing.rotation.x = Math.PI / 2;
      mountRing.position.set(-0.05, 0.02, 0.42);
      g.add(mountRing);

      const lensBaseGeo = new THREE.CylinderGeometry(0.52, 0.54, 0.45, 48);
      const lensBase = new THREE.Mesh(lensBaseGeo, matteBodyMat);
      lensBase.rotation.x = Math.PI / 2;
      lensBase.position.set(-0.05, 0.02, 0.65);
      lensBase.castShadow = true;
      g.add(lensBase);

      const redRingGeo = new THREE.TorusGeometry(0.515, 0.016, 16, 64);
      const redRing = new THREE.Mesh(redRingGeo, canonRedRingMat);
      redRing.position.set(-0.05, 0.02, 0.88);
      g.add(redRing);

      const knurlGeo = new THREE.CylinderGeometry(0.505, 0.505, 0.38, 64);
      const knurlRing = new THREE.Mesh(knurlGeo, texturedGripMat);
      knurlRing.rotation.x = Math.PI / 2;
      knurlRing.position.set(-0.05, 0.02, 1.08);
      g.add(knurlRing);

      const frontBarrelGeo = new THREE.CylinderGeometry(0.48, 0.5, 0.22, 48);
      const frontBarrel = new THREE.Mesh(frontBarrelGeo, matteBodyMat);
      frontBarrel.rotation.x = Math.PI / 2;
      frontBarrel.position.set(-0.05, 0.02, 1.35);
      g.add(frontBarrel);

      const glassGeo = new THREE.SphereGeometry(0.45, 36, 24, 0, Math.PI * 2, 0, Math.PI * 0.38);
      const frontGlass = new THREE.Mesh(glassGeo, multiCoatedGlassMat);
      frontGlass.position.set(-0.05, 0.02, 1.32);
      g.add(frontGlass);

      const sensorGeo = new THREE.PlaneGeometry(0.42, 0.28);
      const sensorMesh = new THREE.Mesh(sensorGeo, sensorMat);
      sensorMesh.position.set(-0.05, 0.02, 0.39);
      g.add(sensorMesh);

      // Back LCD
      const lcdFrameGeo = new THREE.BoxGeometry(1.0, 0.72, 0.06);
      const lcdFrame = new THREE.Mesh(lcdFrameGeo, matteBodyMat);
      lcdFrame.position.set(-0.15, -0.05, -0.4);
      g.add(lcdFrame);

      const lcdScreenGeo = new THREE.PlaneGeometry(0.88, 0.6);
      const lcdScreenMat = new THREE.MeshStandardMaterial({
        color: 0x050d1a,
        roughness: 0.1,
        metalness: 0.9,
      });
      const lcdScreen = new THREE.Mesh(lcdScreenGeo, lcdScreenMat);
      lcdScreen.position.set(-0.15, -0.05, -0.435);
      lcdScreen.rotation.y = Math.PI;
      g.add(lcdScreen);

      // Decal
      const canvas = document.createElement("canvas");
      canvas.width = 512;
      canvas.height = 128;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.fillStyle = "rgba(0,0,0,0)";
        ctx.fillRect(0, 0, 512, 128);
        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 64px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("Canon", 256, 80);
      }
      const textTex = new THREE.CanvasTexture(canvas);
      const badgeMat = new THREE.MeshBasicMaterial({ map: textTex, transparent: true });
      const badgeGeo = new THREE.PlaneGeometry(0.45, 0.12);
      const badgeMesh = new THREE.Mesh(badgeGeo, badgeMat);
      badgeMesh.position.set(-0.05, 0.66, 0.36);
      badgeMesh.rotation.x = -0.2;
      g.add(badgeMesh);

      g.scale.set(1.1, 1.1, 1.1);
      g.position.set(0, -0.1, 0);
      g.rotation.set(0.12, -0.4, 0);

      return g;
    };

    const loadGLBModel = (url: string) => {
      const loader = new GLTFLoader();
      setLoadingModel(true);
      setStatusMessage("Đang tải mô hình...");

      loader.load(
        url,
        (gltf) => {
          while (rootModelGroup.children.length > 0) {
            rootModelGroup.remove(rootModelGroup.children[0]);
          }

          const model = gltf.scene;
          const box = new THREE.Box3().setFromObject(model);
          const size = box.getSize(new THREE.Vector3());
          const center = box.getCenter(new THREE.Vector3());

          const maxDim = Math.max(size.x, size.y, size.z);
          const scaleFactor = 2.2 / (maxDim || 1);

          model.scale.setScalar(scaleFactor);
          model.position.x = -center.x * scaleFactor;
          model.position.y = -center.y * scaleFactor - 0.1;
          model.position.z = -center.z * scaleFactor;

          model.traverse((child) => {
            if ((child as THREE.Mesh).isMesh) {
              const mesh = child as THREE.Mesh;
              mesh.castShadow = true;
              mesh.receiveShadow = true;
              if (mesh.material) {
                const mat = mesh.material as THREE.MeshStandardMaterial;
                mat.envMapIntensity = 1.2;
              }
            }
          });

          rootModelGroup.add(model);
          setModelType("glb");
          setLoadingModel(false);
          setStatusMessage("Đã nạp mô hình thành công!");
        },
        undefined,
        () => {
          while (rootModelGroup.children.length > 0) {
            rootModelGroup.remove(rootModelGroup.children[0]);
          }
          const detailedProcedural = createDetailedCanonR50Model();
          rootModelGroup.add(detailedProcedural);
          setModelType("procedural");
          setLoadingModel(false);
          setStatusMessage("Mô hình 3D Canon EOS R50");
        }
      );
    };

    loadGLBModel(modelUrl);

    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      controls.update();
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
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
      controls.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [modelUrl, isAutoRotate]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const arrayBuffer = event.target?.result as ArrayBuffer;
      if (!arrayBuffer || !sceneRef.current || !cameraGroupRef.current) return;

      const loader = new GLTFLoader();
      setLoadingModel(true);
      setStatusMessage(`Đang nạp ${file.name}...`);

      loader.parse(
        arrayBuffer,
        "",
        (gltf) => {
          const rootGroup = cameraGroupRef.current;
          if (!rootGroup) return;

          while (rootGroup.children.length > 0) {
            rootGroup.remove(rootGroup.children[0]);
          }

          const model = gltf.scene;
          const box = new THREE.Box3().setFromObject(model);
          const size = box.getSize(new THREE.Vector3());
          const center = box.getCenter(new THREE.Vector3());

          const maxDim = Math.max(size.x, size.y, size.z);
          const scaleFactor = 2.2 / (maxDim || 1);

          model.scale.setScalar(scaleFactor);
          model.position.x = -center.x * scaleFactor;
          model.position.y = -center.y * scaleFactor - 0.1;
          model.position.z = -center.z * scaleFactor;

          model.traverse((child) => {
            if ((child as THREE.Mesh).isMesh) {
              const mesh = child as THREE.Mesh;
              mesh.castShadow = true;
              mesh.receiveShadow = true;
            }
          });

          rootGroup.add(model);
          setModelType("glb");
          setLoadingModel(false);
          setStatusMessage(`Đã nạp thành công mô hình ${file.name}!`);
        },
        (error) => {
          console.error("Error parsing GLB file:", error);
          setLoadingModel(false);
          setStatusMessage("Không thể đọc tệp 3D.");
        }
      );
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <div className={`relative w-full h-full min-h-[360px] sm:min-h-[440px] flex items-center justify-center select-none ${className}`}>
      <div
        ref={mountRef}
        className="w-full h-full cursor-grab active:cursor-grabbing flex items-center justify-center"
      />

      <input
        ref={fileInputRef}
        type="file"
        accept=".glb,.gltf"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Top Floating Action Bar */}
      <div className="absolute top-3 inset-x-3 z-20 flex items-center justify-between pointer-events-none">
        <div className="pointer-events-auto flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-3 py-1 rounded-md border border-white/20 text-white text-[11px] font-mono shadow-md">
          <Rotate3d className="w-3.5 h-3.5 text-accent" />
          <span>{modelType === "glb" ? "3D Mesh GLB" : "3D Canon EOS R50"}</span>
        </div>

        <div className="pointer-events-auto flex items-center gap-1 bg-black/60 backdrop-blur-md p-1 rounded-md border border-white/20 shadow-md">
          <button
            onClick={() => setIsAutoRotate(!isAutoRotate)}
            className={`px-2 py-1 rounded text-[11px] font-mono transition-all cursor-pointer ${
              isAutoRotate ? "bg-accent text-white" : "text-white/70 hover:text-white"
            }`}
            title="Bật/Tắt tự động xoay 360°"
          >
            <RefreshCw className="w-3 h-3" />
          </button>

          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-1 px-2.5 py-1 rounded bg-white/15 hover:bg-white/30 text-white text-[11px] font-mono transition-all cursor-pointer"
            title="Tải lên file .glb"
          >
            <Upload className="w-3 h-3" />
            <span className="hidden sm:inline">Nạp GLB</span>
          </button>
        </div>
      </div>

      {/* Bottom Info Bar */}
      <div className="absolute bottom-3 inset-x-3 z-20 flex items-center justify-between pointer-events-none">
        <div className="pointer-events-auto flex items-center gap-1.5 bg-ink-900/90 backdrop-blur-md px-3 py-1 rounded-md border border-white/10 text-white text-xs font-sans font-medium">
          <Camera className="w-3.5 h-3.5 text-accent" />
          <span>Canon EOS R50 · 24.2MP Dual Pixel AF II</span>
        </div>

        <div className="hidden sm:flex pointer-events-auto items-center gap-1 text-[11px] font-mono text-white/70 bg-black/40 px-2 py-1 rounded border border-white/10">
          <ZoomIn className="w-3 h-3" />
          <span>Cuộn chuột để zoom</span>
        </div>
      </div>
    </div>
  );
}
