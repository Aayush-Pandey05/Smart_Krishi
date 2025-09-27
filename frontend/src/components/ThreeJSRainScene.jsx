import React, { useRef, useEffect } from "react";
import * as THREE from "three";

const ThreeJSAgroScene = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0c140c); 

    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    const container = mountRef.current;
    const updateSize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    updateSize();
    container.appendChild(renderer.domElement);

    // --- Floating Spores/Pollen ---
    const sporeGeometry = new THREE.BufferGeometry();
    const sporeCount = 500;
    const positions = new Float32Array(sporeCount * 3);

    for (let i = 0; i < sporeCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 1] = Math.random() * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 50;
    }
    sporeGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const sporeMaterial = new THREE.PointsMaterial({
      color: 0x84cc16,
      size: 0.08,
      transparent: true,
      opacity: 0.6,
    });
    const spores = new THREE.Points(sporeGeometry, sporeMaterial);
    scene.add(spores);

    // --- Waving Field ---
    const fieldGeometry = new THREE.PlaneGeometry(30, 30, 100, 100);
    const fieldMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color: { value: new THREE.Color(0x15803d) },
      },
      vertexShader: `
        uniform float time;
        varying vec2 vUv;
        varying float vElevation;
        void main() {
          vUv = uv;
          vec3 pos = position;
          pos.z = sin(pos.x * 10.0 + time * 2.0) * 0.15;
          pos.z += cos(pos.y * 5.0 + time * 1.5) * 0.1;
          vElevation = pos.z;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 color;
        varying float vElevation;
        void main() {
          vec3 finalColor = color + vElevation * 0.4;
          gl_FragColor = vec4(finalColor, 1.0);
        }
      `,
      side: THREE.DoubleSide,
    });
    const field = new THREE.Mesh(fieldGeometry, fieldMaterial);
    field.rotation.x = -Math.PI / 2;
    field.position.y = -5;
    scene.add(field);

    // --- Farm Silos ---
    const siloGroup = new THREE.Group();
    const siloMaterial = new THREE.MeshPhongMaterial({ color: 0x78716c });

    const mainSiloBodyGeo = new THREE.CylinderGeometry(1.2, 1.2, 4, 12);
    const mainSiloRoofGeo = new THREE.ConeGeometry(1.4, 1, 12);
    const mainSiloBody = new THREE.Mesh(mainSiloBodyGeo, siloMaterial);
    const mainSiloRoof = new THREE.Mesh(mainSiloRoofGeo, siloMaterial);
    mainSiloRoof.position.y = 2.5;
    siloGroup.add(mainSiloBody);
    siloGroup.add(mainSiloRoof);
    siloGroup.position.set(-8, -3, -10);
    scene.add(siloGroup);

    const smallSiloGroup = new THREE.Group();
    const smallSiloBodyGeo = new THREE.CylinderGeometry(0.8, 0.8, 3, 12);
    const smallSiloRoofGeo = new THREE.ConeGeometry(1, 0.8, 12);
    const smallSiloBody = new THREE.Mesh(smallSiloBodyGeo, siloMaterial);
    const smallSiloRoof = new THREE.Mesh(smallSiloRoofGeo, siloMaterial);
    smallSiloRoof.position.y = 2;
    smallSiloGroup.add(smallSiloBody);
    smallSiloGroup.add(smallSiloRoof);
    smallSiloGroup.position.set(-5.5, -3.5, -11);
    scene.add(smallSiloGroup);

    // --- Fireflies ---
    const fireflyGeometry = new THREE.SphereGeometry(0.08, 8, 8);
    const fireflyMaterial = new THREE.MeshBasicMaterial({ color: 0xfacc15 });
    const fireflies = [];
    for (let i = 0; i < 40; i++) {
      const firefly = new THREE.Mesh(fireflyGeometry, fireflyMaterial);
      firefly.position.set(
        (Math.random() - 0.5) * 25,
        Math.random() * 10 - 2,
        (Math.random() - 0.5) * 25
      );
      fireflies.push(firefly);
      scene.add(firefly);
    }

    // --- Lighting ---
    const ambientLight = new THREE.AmbientLight(0x103310, 0.8);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.4);
    directionalLight.position.set(5, 10, 7);
    scene.add(directionalLight);

    camera.position.set(10, 5, 18);
    camera.lookAt(0, 0, 0);

    let animationId;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const time = Date.now() * 0.001;

      spores.rotation.y = time * 0.1;
      fieldMaterial.uniforms.time.value = time;

      fireflies.forEach((firefly, i) => {
        firefly.position.y += Math.sin(time + i) * 0.02;
      });

      camera.position.x = 10 + Math.sin(time * 0.2) * 2;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => updateSize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="w-full h-full" />;
};

export default ThreeJSAgroScene;

