'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

interface BuildingViewer3DProps {
  buildingData?: {
    floors: number;
    floorHeight: number;
    footprint: { width: number; length: number };
    style?: string;
  };
}

export function BuildingViewer3D({ buildingData }: BuildingViewer3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(
      50,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(30, 20, 30);
    camera.lookAt(0, 0, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.shadowMap.enabled = true;
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(20, 30, 20);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    // Ground plane
    const groundGeometry = new THREE.PlaneGeometry(100, 100);
    const groundMaterial = new THREE.MeshStandardMaterial({ color: 0xe0e0e0 });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    // Grid
    const gridHelper = new THREE.GridHelper(100, 50, 0xcccccc, 0xdddddd);
    scene.add(gridHelper);

    // Animation loop
    function animate() {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    }
    animate();

    // Cleanup
    return () => {
      containerRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  // Update building when data changes
  useEffect(() => {
    if (!sceneRef.current || !buildingData) return;

    // Remove old building
    const oldBuilding = sceneRef.current.getObjectByName('building');
    if (oldBuilding) {
      sceneRef.current.remove(oldBuilding);
    }

    // Create new building
    const { floors, floorHeight, footprint } = buildingData;
    const buildingHeight = floors * floorHeight;

    const geometry = new THREE.BoxGeometry(
      footprint.width,
      buildingHeight,
      footprint.length
    );

    // Material based on style
    const color = new THREE.Color(0x6366f1);
    const material = new THREE.MeshStandardMaterial({
      color,
      metalness: 0.3,
      roughness: 0.4,
    });

    const building = new THREE.Mesh(geometry, material);
    building.position.y = buildingHeight / 2;
    building.castShadow = true;
    building.receiveShadow = true;
    building.name = 'building';

    sceneRef.current.add(building);

    // Add floor lines
    for (let i = 1; i < floors; i++) {
      const floorY = i * floorHeight;
      const edgesGeometry = new THREE.EdgesGeometry(geometry);
      const edgesMaterial = new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 2 });
      const edges = new THREE.LineSegments(edgesGeometry, edgesMaterial);
      edges.position.copy(building.position);
      sceneRef.current.add(edges);
    }
  }, [buildingData]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full rounded-lg overflow-hidden border border-gray-200"
    />
  );
}
