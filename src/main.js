import * as THREE from 'three';
import WebGL from 'three/addons/capabilities/WebGL.js';
import { texture3D } from 'three/examples/jsm/nodes/Nodes.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Water } from 'three/examples/jsm/objects/Water.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({antialias : true});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x0fffff, 1);

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

const geometry = new THREE.BoxGeometry(50, 50, 50);
const waterNormals = new THREE.TextureLoader().load('https://threejs.org/examples/textures/waternormals.jpg', function (texture) {
	texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
});

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(0, 1, 0);
scene.add(directionalLight);

const water = new Water(new THREE.PlaneGeometry(51, 51), {
	textureWidth: 512,
	textureHeight: 512,
	waterNormals: waterNormals,
	alpha: 1.0,
	sunDirection: new THREE.Vector3(),
	sunColor: 0xFFC300,
	waterColor: 0x0096FF,
	distortionScale: 3.7,
	fog: scene.fog !== undefined
});

const water2 = new Water(new THREE.PlaneGeometry(51, 51), {
	textureWidth: 512,
	textureHeight: 512,
	waterNormals: waterNormals,
	alpha: 1.0,
	sunDirection: new THREE.Vector3(),
	sunColor: 0xFFC300,
	waterColor: 0x0096FF,
	distortionScale: 3.7,
	fog: scene.fog !== undefined
});

const cubeMaterial = new THREE.MeshStandardMaterial( { color : 0x0f0ff0, side: THREE.BackSide });
const cube = new THREE.Mesh(geometry, cubeMaterial);
scene.add(cube);
cube.position.y = -25;

water.position.y = 0.51;
water.rotation.x = -Math.PI / 2;
cube.add(water);

camera.position.set(2, 1, 4);
camera.lookAt(scene.position);

scene.add(water);

function animate() {
	requestAnimationFrame(animate);
	controls.update();
	water.material.uniforms['time'].value += 1.0 / 60.0;
	renderer.render(scene, camera);
}
animate();

// display a msg when WebGL is not supported
// if ( WebGL.isWebGL2Available() ) {
// 	animate();
// } else {
// 	const warning = WebGL.getWebGL2ErrorMessage();
// 	document.getElementById( 'container' ).appendChild( warning );
// }
