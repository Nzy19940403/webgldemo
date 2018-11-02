<template>
    <div id="wrap">

    </div>
</template>
<script>
import * as THREE from 'three'
import OrbitControls from 'three-orbitcontrols'
export default {
    name:'sphere',
    mounted () {
        let scene = new THREE.Scene();

        let renderer = new THREE.WebGLRenderer({
            antialias:true
        })
        renderer.setSize( window.innerWidth, window.innerHeight );
        // renderer.setClearColor(0xEEEEEE)

        renderer.setClearColor(0xEEEEEE)
        document.getElementById("wrap").appendChild(renderer.domElement);
        let loader = new THREE.TextureLoader();
        loader.setPath('static/pic/');

        let sphereGeometry = new THREE.SphereGeometry(3,50,50);
        let sphereMaterial = new THREE.MeshBasicMaterial({
            color:0xffffff,
           opacity:0.8
        });
        sphereMaterial.map = loader.load('earth.png')
        sphereMaterial.transparent = true
        // sphereMaterial.specular = new THREE.Color(0x00ffff);
        // sphereMaterial.shininess=10
        let sphere = new THREE.Mesh(sphereGeometry,sphereMaterial);
        scene.add(sphere);

        let camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000 );
        camera.position.set(10, 10, 30);
        // camera.lookAt(sphere)
        scene.add(camera)
        
        //建立一个平面
        

        let groundGeometry = new THREE.PlaneGeometry(60,60,50,50);
        let groundMaterial =new THREE.MeshBasicMaterial({
            color:0x888888,
            map:loader.load('timg.jpg')
            //wireframe:true
        })
        
        let ground=new THREE.Mesh(groundGeometry,groundMaterial)
        scene.add(ground)
        // ground.rotation.set(-0.5 * Math.PI, 0, 0)//沿着x轴旋转90度
        ground.rotation.x=-0.5*Math.PI
        ground.position.set(0,-5,-10)


        let orbitControls = new OrbitControls(camera)
        orbitControls.autoRotate = true

        function render () {
           
            renderer.render(scene, camera)
            sphere.rotation.x += 0.005;
            sphere.rotation.y += 0.005;
            requestAnimationFrame(render)
        }
        render()
    }
}
</script>
<style>
#wrap{
    height: 100%;
}
</style>