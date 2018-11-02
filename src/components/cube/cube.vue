<template>
    <div id="wrap">
        
    </div>
</template>
<script>
import * as THREE from 'three'
import OrbitControls from 'three-orbitcontrols'
import Stats from 'stats.js'
export default {
    name:'cube',
    mounted () {
         //正方体的投影尝试
        //创建场景
       
        let scene = new THREE.Scene();
    
        //创建一个渲染器
        let renderer = new THREE.WebGLRenderer({
            antialias:true,//抗锯齿
            alpha: true
        });
        
        //设置渲染器的大小

        renderer.setSize( window.innerWidth, window.innerHeight );
        renderer.setClearColor(0xEEEEEE)

        //把一个canvas插入指定div中
        let box=document.getElementById("wrap")
        box.appendChild( renderer.domElement );
        
        //创建一个摄像机 正交摄像机 
        let camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000 );
        camera.position.set(10, 10, 30);
        // camera.position.z = 8;
        camera.lookAt(new THREE.Vector3(0, 0, 0))
        scene.add(camera);

        //建立一个正方体物体
        let loader = new THREE.TextureLoader();
        loader.setPath('static/pic/')

        let texture = loader.load(
            '1.jpg',)
        let cubeGeometry = new THREE.BoxGeometry( 6, 6, 6 );
        let cubeMaterial = new THREE.MeshLambertMaterial({ 
            //color: 0x00ff00,  
            map:texture   
        });
        cubeMaterial.bumpMap = texture
        //bumpScale 凹凸贴图对材料有多大影响。典型的范围是0-1。默认为1。
        cubeMaterial.bumpScale=0.03

        let cube = new THREE.Mesh( cubeGeometry, cubeMaterial );  
        scene.add(cube)

        //建立一个平面
        

        let groundGeometry = new THREE.PlaneGeometry(60,60,50,50);
        let groundMaterial =new THREE.MeshLambertMaterial({
            // color:0xffffff,
            map:loader.load('timg.jpg')
            //wireframe:true
        })

        
        groundMaterial.bumpMap=loader.load('timg.jpg');
        groundMaterial.bumpScale=0.01


        let ground=new THREE.Mesh(groundGeometry,groundMaterial)
        scene.add(ground)
        // ground.rotation.set(-0.5 * Math.PI, 0, 0)//沿着x轴旋转90度
        ground.rotation.x=-0.5*Math.PI
        ground.position.set(0,-5,-10)


        //设置光源
        


        //THREE.SpotLight(hex, intensity, distance, angle, exponent)
        //exponent是光强在偏离target的衰减指数，缺省值是10。
        var spotLight = new THREE.SpotLight(0xffffff,1,1000,Math.PI / 4,25);
        
        // 并不是所有类型的光源能产生投影，不能产生投影的光源有：环境光（AmbientLight）、半球光（HemisphereLight）
        spotLight.castShadow = true
        
        // 设置该灯光的阴影的质量
        spotLight.shadow.mapSize.width = 1024
        spotLight.shadow.mapSize.height = 1024

        // spotLight.position.set(30, 60, 40);
        spotLight.position.set(15,15,22)
        spotLight.target=cube

        scene.add(spotLight);
        //设置阴影  
        renderer.shadowMap.enabled=true;//允许阴影投射
        renderer.shadowMap.type=THREE.PCFSoftShadowMap//设置阴影类型
        
        // 平面和立方体都能接受阴影
        ground.receiveShadow=true
        cube.receiveShadow = true
        cube.castShadow = true

        let orbitControls = new OrbitControls(camera)
        orbitControls.autoRotate = true
        let stats = this.$parent.$refs.test.$mystats
        stats.end()
        function render () {
            
            renderer.render(scene, camera)
            stats.begin()
            cube.rotation.x += 0.005;
            cube.rotation.y += 0.01;
            stats.end()
            requestAnimationFrame(render)
        }
        render()




        // var camera, scene, renderer;
        // var mesh,texture;
        // function start(){
        //     init();
        //     animate();
        // }
        // start()
        // function init() {
        //     camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
        //     camera.position.z = 40;
        //     scene = new THREE.Scene();
            
        //     texture = new THREE.TextureLoader().load('static/pic/timg.jpg')

         
        //     console.log(texture)
        //     var geometry = new THREE.BoxBufferGeometry( 20, 20, 20 );
        //     var material = new THREE.MeshBasicMaterial({ 
        //        map:texture,
        //     // color:0xffffff 
        //     });
          
        //     mesh = new THREE.Mesh( geometry, material );
        //     scene.add( mesh );
        //     renderer = new THREE.WebGLRenderer({ antialias: true });
        //     renderer.setClearColor(0xeeeeee);
        //     renderer.setPixelRatio( window.devicePixelRatio );
        //     renderer.setSize( window.innerWidth, window.innerHeight );
        //     document.getElementById("wrap").appendChild(renderer.domElement);



        //     //设置光源
        
        //     //THREE.SpotLight(hex, intensity, distance, angle, exponent)
        //     //exponent是光强在偏离target的衰减指数，缺省值是10。
        //     var spotLight = new THREE.SpotLight(0xffffff,1,1000,Math.PI / 4,25);
            
        //     // 并不是所有类型的光源能产生投影，不能产生投影的光源有：环境光（AmbientLight）、半球光（HemisphereLight）
        //     spotLight.castShadow = true
            
        //     // 设置该灯光的阴影的质量
        //     spotLight.shadow.mapSize.width = 1024
        //     spotLight.shadow.mapSize.height = 1024

        //     // spotLight.position.set(30, 60, 40);
        //     spotLight.position.set(60,60,100)
        //     spotLight.target=mesh

        //     scene.add(spotLight);
        //     //设置阴影  
        //     renderer.shadowMap.enabled=true;//允许阴影投射
        //     renderer.shadowMap.type=THREE.PCFSoftShadowMap//设置阴影类型
            
        //     // 平面和立方体都能接受阴影
        //     mesh.receiveShadow = true
        //     mesh.castShadow = true
 
        // }


        // function animate() {
        //     // texture.needsUpdate = true;
        //     requestAnimationFrame( animate );
        //     mesh.rotation.x += 0.005;
        //     mesh.rotation.y += 0.01;
        //     renderer.render( scene, camera );
        // }



    }
}
</script>
<style>
#wrap{
    height: 100%;
}
</style>
