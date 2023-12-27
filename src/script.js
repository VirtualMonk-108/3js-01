import * as THREE from 'three';

// Canvas
const canvas = document.querySelector('#webgl');

// Scene
const scene = new THREE.Scene();

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 'red'})
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Position
// mesh.position.x = 0.7
// mesh.position.y = -0.5
// mesh.position.z = 1
//instead of doing the above, we can do the following
mesh.position.set(0.7, -0.6, 1)

// Scale
// mesh.scale.x = 2
// mesh.scale.y = 0.5
// mesh.scale.z = 0.5
//instead of doing the above, we can do the following
mesh.scale.set(2, 0.5, 0.5)

// Rotation
// PI is 180 degrees so half a rotation || Full rotation will be 2 * PI
// mesh.rotation.reorder('YXZ') // this will change the order of the rotation to avoid gimbal lock
// also we have to do reorder before we do the rotation
mesh.rotation.reorder('YXZ')
mesh.rotation.x = Math.PI * 0.25
mesh.rotation.y = Math.PI * 0.25





//Axes helper
const axesHelper = new THREE.AxesHelper()
scene.add(axesHelper)

// this is the distance from the origin to the mesh. origin is 0,0,0 which is the center of the scene
// console.log(mesh.position.length()) 

// this will normalize the position of the mesh to 1 because it is a unit vector
// mesh.position.normalize() 
// console.log(mesh.position.length()) 

// Camera
const sizes = { width: 800, height: 600 }
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
// camera.position.x = 1
// camera.position.y = 1
scene.add(camera)

// camera.lookAt(mesh.position) - this will 
// make the camera look at the mesh from whatever position it is in
camera.lookAt(new THREE.Vector3(0, 0, 0))

// this is the distance from the camera to the mesh
// console.log(mesh.position.length(camera.position)) 

// Renderer
const renderer = new THREE.WebGLRenderer({ canvas: canvas })
renderer.setSize(sizes.width, sizes.height)

renderer.render(scene, camera)