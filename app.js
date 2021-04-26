var light1, light2, light3, light4, renderer, scene, camera;

init();
animate();
function init() {
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 1000);
	renderer = new THREE.WebGLRenderer();
	
	renderer.setSize(window.innerWidth, window.innerHeight);

	document.getElementById('webgl').appendChild(renderer.domElement);


	var loader = new THREE.GLTFLoader();

	loader.load(
		// resource URL
		'monkey/scene.gltf',
		// called when the resource is loaded
		function (gltf) {
			console.log("added")
			console.log(gltf)
			gltf.scene.scale.set(0.5, 0.5, 0.5);
			scene.add(gltf.scene);

			gltf.animations; // Array<THREE.AnimationClip>
			gltf.scene; // THREE.Group
			gltf.scenes; // Array<THREE.Group>
			gltf.cameras; // Array<THREE.Camera>
			gltf.asset; // Object

		},
		// called while loading is progressing
		function (xhr) {

			console.log((xhr.loaded / xhr.total * 100) + '% loaded');

		},
		// called when loading has errors
		function (error) {

			console.log('An error happened');

		}
	);
	let geometrie = new THREE.SphereGeometry(20, 24, 24);
	//var textureLoader = new THREE.TextureLoader();
	//var texture = textureLoader.load("textura.png");

	//texture.wrapS = THREE.RepeatWrapping;
	//texture.wrapT = THREE.RepeatWrapping;
	//texture.repeat.set(4, 4);
	let material = new THREE.MeshStandardMaterial({
		color: 0xffffff,
	});
	var canvas = document.createElement("canvas");
	material.bumpMap = THREE.ImageUtils.loadTexture('NormalMap.png')
	material.bumpScale = 100
	const sphere = new THREE.SphereGeometry(0.5, 16, 8);
	generateNoise(100, canvas);

	light1 = new THREE.PointLight(0xff0040, 5, 40);
	light1.add(new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({ color: 0xff0040 })));
	scene.add(light1);


	light2 = new THREE.PointLight(0x0040ff, 5, 50);
	light2.add(new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({ color: 0x0040ff })));
	scene.add(light2);

	light3 = new THREE.PointLight(0x80ff80, 5, 50);
	light3.add(new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({ color: 0x80ff80 })));
	scene.add(light3);

	light4 = new THREE.PointLight(0xffaa00, 5, 50);
	light4.add(new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({ color: 0xffaa00 })));
	scene.add(light4);


	controls = new THREE.OrbitControls(camera, renderer.domElement);
	controls.screenSpacePanning = true;
	controls.minDistance = 5;
	controls.maxDistance = 100;
	controls.target.set(0, 20, 0);
	controls.update();

	//let lumina = new THREE.SpotLight(0xffffff, 10);
	//lumina.position.x = 6;
	//lumina.position.y = 8;
	//lumina.position.z = -20;

	//scene.add(lumina);

	let sfera = new THREE.Mesh(geometrie, material);

	//scene.add(sfera);

	camera.position.x = 0;
	camera.position.y = 0;
	camera.position.z = 100;
	camera.lookAt(new THREE.Vector3(0, 20, 0));
}



 function generateNoise(opacity, canvas) {
	var
		x, y,
		number,
		opacity = opacity || .2;
	ctx = canvas.getContext('2d');
	for (x = 0; x < canvas.width; x++) {
		for (y = 0; y < canvas.height; y++) {
			number = Math.floor(Math.random() * 60);

			ctx.fillStyle = "rgba(" + number + "," + number + "," + number + "," + opacity + ")";
			ctx.fillRect(x, y, 1, 1);
		}
	}
}
function animate() {

	requestAnimationFrame(animate);

	render();

}
function render() {
	const clock = new THREE.Clock()
	const time = Date.now() * 0.0005;
	const delta = clock.getDelta();


	light1.position.x = Math.sin(time * 0.7) * 30;
	light1.position.y = Math.cos(time * 0.5) * 40;
	light1.position.z = Math.cos(time * 0.3) * 30;

	light2.position.x = Math.cos(time * 0.3) * 30;
	light2.position.y = Math.sin(time * 0.5) * 40;
	light2.position.z = Math.sin(time * 0.7) * 30;

	light3.position.x = Math.sin(time * 0.7) * 30;
	light3.position.y = Math.cos(time * 0.3) * 40;
	light3.position.z = Math.sin(time * 0.5) * 30;

	light4.position.x = Math.sin(time * 0.3) * 30;
	light4.position.y = Math.cos(time * 0.7) * 40;
	light4.position.z = Math.sin(time * 0.5) * 30;

	renderer.render(scene, camera);

}