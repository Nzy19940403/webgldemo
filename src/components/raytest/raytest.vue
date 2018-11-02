<template>
    <div id="wrap">
        
    </div>
</template>

<script>
import  THREE from '../../utils/mythree.js'
export default {
    name:'raytest',
    mounted(){
        let scene = new THREE.Scene();
        
        let renderer = new THREE.WebGLRenderer({
            antialias:true
        });
        renderer.setClearColor(0xEEEEEE)
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize(window.innerWidth,window.innerHeight);
        document.getElementById("wrap").appendChild(renderer.domElement);

        let camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
        camera.position.set(10,10,10)
        scene.add(camera)

        renderer.render(scene,camera)
    }
}
</script>
<style>
#wrap{
    height: 100%;
}
</style>