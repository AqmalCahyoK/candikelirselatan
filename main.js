import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.outputColorSpace = THREE.SRGBColorSpace;

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000);
renderer.setPixelRatio(window.devicePixelRatio);

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.set(4, 5, 11);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enablePan = true;
controls.minDistance = 5;
controls.maxDistance = 300;
controls.minPolarAngle = 0.5;
controls.maxPolarAngle = 1.5;
controls.autoRotate = false;
controls.target = new THREE.Vector3(0, 1, 0);
controls.update();

const groundGeometry = new THREE.PlaneGeometry(20, 20, 32, 32);
groundGeometry.rotateX(-Math.PI / 2);
const groundMaterial = new THREE.MeshStandardMaterial({
  color: 0x555555,
  side: THREE.DoubleSide
});
const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
groundMesh.castShadow = false;
groundMesh.receiveShadow = false;
scene.add(groundMesh);

const spotLight = new THREE.SpotLight(0xffffff,  30, 100, 0.22, 10);
spotLight.position.set(0, 0, 25);
spotLight.castShadow = true;
spotLight.shadow.bias = -0.0001;
scene.add(spotLight);

const spotLight1 = new THREE.SpotLight(0xffffff,  30, 100, 0.22, 10);
spotLight1.position.set(0, 25, 0);
spotLight1.castShadow = true;
spotLight1.shadow.bias = -0.0001;
scene.add(spotLight1);

const spotLight2 = new THREE.SpotLight(0xffffff,  30, 100, 0.22, 10);
spotLight2.position.set(25, 0, 0);
spotLight2.castShadow = true;
spotLight2.shadow.bias = -0.0001;
scene.add(spotLight2);

const spotLight3 = new THREE.SpotLight(0xffffff,  30, 100, 0.22, 10);
spotLight3.position.set(0, 0, -25);
spotLight3.castShadow = true;
spotLight3.shadow.bias = -0.0001;
scene.add(spotLight3);

const spotLight4 = new THREE.SpotLight(0xffffff,  30, 100, 0.22, 10);
spotLight4.position.set(0, -25, 0);
spotLight4.castShadow = true;
spotLight4.shadow.bias = -0.0001;
scene.add(spotLight4);

const spotLight5 = new THREE.SpotLight(0xffffff,  30, 100, 0.22, 10);
spotLight5.position.set(-25, 0, 0);
spotLight5.castShadow = true;
spotLight5.shadow.bias = -0.0001;
scene.add(spotLight5);

const loader = new GLTFLoader().setPath('public/millennium_falcon/');
loader.load('scene.gltf', (gltf) => {
  const mesh = gltf.scene;

  mesh.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  mesh.position.set(0, 1.05, -1);
  scene.add(mesh);

  document.getElementById('progress-container').style.display = 'none';
}, ( xhr ) => {
  document.getElementById('progress').innerHTML = `LOADING ${Math.max(xhr.loaded / xhr.total, 1) * 100}/100`;
},);

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

animate();