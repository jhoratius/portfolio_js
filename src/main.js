import * as THREE from 'three';
import WebGL from 'three/addons/capabilities/WebGL.js';
import { texture3D } from 'three/examples/jsm/nodes/Nodes.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Water } from 'three/examples/jsm/objects/Water.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({antialias : true});

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const waterNormals = new THREE.TextureLoader().load('https://threejs.org/examples/textures/waternormals.jpg', function (texture) {
	texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
});

const water = new Water(new THREE.PlaneGeometry(2, 2), {
	textureWidth: 512,
	textureHeight: 512,
	waterNormals: waterNormals,
	alpha: 1.0,
	sunDirection: new THREE.Vector3(),
	sunColor: 0xffffff,
	waterColor: 0x001e0f,
	distortionScale: 3.7,
	fog: scene.fog !== undefined
});

const cubeMaterial = new THREE.MeshBasicMaterial( { color : 0x00ff00, side: THREE.BackSide });
const cube = new THREE.Mesh(geometry, cubeMaterial);
scene.add(cube);

water.position.y = 0.5;
water.rotation.x = -Math.PI / 2;
cube.add(water);

camera.position.z = 2;

function animate() {
	requestAnimationFrame(animate);
	controls.update();
	water.material.uniforms['time'].value += 1.0 / 60.0;
	renderer.render(scene, camera);
}
animate();

// display a msg when WebGL is not supported
//if ( WebGL.isWebGL2Available() ) {
//	animate();
//} else {
//	const warning = WebGL.getWebGL2ErrorMessage();
//	document.getElementById( 'container' ).appendChild( warning );
//}
