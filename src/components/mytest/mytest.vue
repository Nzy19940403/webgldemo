<template>
    <div id="kk">
        <!-- <div class="options">
            <button @click="enableMove">{{test}}</button>
        </div> -->

    </div>
</template>
<script>
import * as THREE from 'three'
import OrbitControls from 'three-orbitcontrols'

export default {
    name:'mytest',

    // data () {
    //     return {
    //         moveable:false,
    //         test:'moveable'
    //     }
    // },
    // methods: {
    //     enableMove(){
    //         this.moveable=!this.moveable     
    //     }
    // },
    // watch: {
    //     moveable:{
    //         handler(){
    //             if(this.moveable==false){
    //                 this.test='moveable'
    //             }else{
    //                 this.test='immoveable'
    //             }
    //         }
    //     }
    // },
    // created () {
        
    // },
    mounted (){
        // console.log(this.$parent.$refs.test.$mystats)




        // let stats = this.$parent.$refs.test.$mystats
        // //正方体的投影尝试
        // //创建场景
        // let scene = new THREE.Scene();
        // scene.fog = new THREE.Fog(0xffffff, 100);
        
        // //创建一个渲染器
        // let renderer = new THREE.WebGLRenderer({
        //     antialias:true,//抗锯齿
        //     alpha: true
        // });
        
        // //设置渲染器的大小
        // //renderer.setSize( 300, 200 );
        // renderer.setSize( window.innerWidth, window.innerHeight );
        // renderer.setClearColor(0x000000)

        // //把一个canvas插入指定div中
        // let box=document.getElementById("kk")
        // box.appendChild( renderer.domElement );
        
        // //创建一个摄像机 正交摄像机 
        // let camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000 );
        //  camera.position.set(10, 10, 30);
        // // camera.position.z = 8;
        // camera.lookAt(new THREE.Vector3(0, 0, 0))
        // scene.add(camera);

        // //建立一个正方体物体
        // let cubeGeometry = new THREE.BoxGeometry( 4, 4, 4 );
        // let cubeMaterial = new THREE.MeshLambertMaterial({ 
        //     color: 0x096dd9,  
        //    // emissive: 0xff0000     
        // });
        // let cube = new THREE.Mesh( cubeGeometry, cubeMaterial );  
        // cube.position.set(0,-2,0)
        // //添加正方体的边框
        // // let cubeBorder = new THREE.EdgesHelper( cube,0x333333 );     
        // // scene.add(cubeBorder)
        // let cubeEdges = new THREE.EdgesGeometry(cubeGeometry,0.1);
        // let edgeMtl=new THREE.LineBasicMaterial({
        //     // color:0xadc6ff
        //     color:0x000000
        // })
        // let cubeLine= new THREE.LineSegments(cubeEdges,edgeMtl)
        // cube.add(cubeLine)
        // scene.add(cube);

        // //建立一个球
        // let sphereGeometry=new THREE.SphereGeometry(3,20,20)
        // let sphereMaterial =new THREE.MeshNormalMaterial({
        //     wireframe:true,
        // })

        // let sphere = new THREE.Mesh(sphereGeometry,sphereMaterial);
        // sphere.position.set(0,2.5,0)
        // //sphere.position.set(6,2,-6)
        // sphere.castShadow=true
        // scene.add(sphere)
        


        // // let lightHelper = new THREE.SpotLightHelper( spotLight );
		// // scene.add( lightHelper );









        // //建立一个平面
        

        // let groundGeometry = new THREE.PlaneGeometry(60,60,50,50);
        // let groundMaterial =new THREE.MeshLambertMaterial({
        //     color:0xffffff,
        //     //wireframe:true
        // })
        // let ground=new THREE.Mesh(groundGeometry,groundMaterial)
        // scene.add(ground)
        // // ground.rotation.set(-0.5 * Math.PI, 0, 0)//沿着x轴旋转90度
        // ground.rotation.x=-0.5*Math.PI
        // ground.position.set(0,-4,-10)
        


        // //设置光源
        
        // //THREE.SpotLight(hex, intensity, distance, angle, exponent)
        // //exponent是光强在偏离target的衰减指数，缺省值是10。
        // var spotLight = new THREE.SpotLight(0xffffff,1,1000,Math.PI / 4,25);
        
        // // 并不是所有类型的光源能产生投影，不能产生投影的光源有：环境光（AmbientLight）、半球光（HemisphereLight）
        // spotLight.castShadow = true
        
        // // 设置该灯光的阴影的质量
        // spotLight.shadow.mapSize.width = 1024
        // spotLight.shadow.mapSize.height = 1024

        // // spotLight.position.set(30, 60, 40);
        // spotLight.position.set(15,15,22)
        // spotLight.target=cube

        // scene.add(spotLight);
        // //设置阴影  
        // renderer.shadowMap.enabled=true;//允许阴影投射
        // renderer.shadowMap.type=THREE.PCFSoftShadowMap//设置阴影类型
        
        // // 平面和立方体都能接受阴影
        // ground.receiveShadow = true
        // cube.receiveShadow = true
        // cube.castShadow = true


        // let orbitControls = new OrbitControls(camera)
        // orbitControls.autoRotate = true

        // // var stats = new Stats();
        // // stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
        // // stats.domElement.style.position = 'absolute'; //绝对坐标
        // // stats.domElement.style.left = '0px';// (0,0)px,左上角
        // // stats.domElement.style.top = '50px'
        // //document.body.appendChild( stats.dom );
        // stats.end()
        
        // function render () {
        //     renderer.render(scene, camera)
        //     stats.begin()
        //     stats.end()
        //     requestAnimationFrame(render)
        // }
        // render()


     
			var camera, scene, raycaster, renderer;
			var mouse = new THREE.Vector2(), INTERSECTED;
			var radius = 100, theta = 0;
			init();
			// animate();
			function init() {
		
				// container.appendChild( info );
				camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 10000 );
				scene = new THREE.Scene();
				scene.background = new THREE.Color( 0xf0f0f0 );
				var light = new THREE.DirectionalLight( 0xffffff, 1 );
				light.position.set( 1, 1, 1 ).normalize();
				scene.add( light );
				var geometry = new THREE.BoxBufferGeometry( 20, 20, 20 );
				for ( var i = 0; i < 500; i ++ ) {
					var object = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial( { color: Math.random() * 0xffffff } ) );
					object.position.x = Math.random() * 800 - 400;
					object.position.y = Math.random() * 800 - 400;
					object.position.z = Math.random() * 800 - 400;
					object.rotation.x = Math.random() * 2 * Math.PI;
					object.rotation.y = Math.random() * 2 * Math.PI;
					object.rotation.z = Math.random() * 2 * Math.PI;
					object.scale.x = Math.random() + 0.5;
					object.scale.y = Math.random() + 0.5;
					object.scale.z = Math.random() + 0.5;
					scene.add( object );
				}
				raycaster = new THREE.Raycaster();
				renderer = new THREE.WebGLRenderer();
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				document.getElementById("kk").appendChild( renderer.domElement );
				// stats = new THREE.Stats();
				// container.appendChild( stats.dom );
				document.addEventListener( 'mousedown', onDocumentMouseMove, false );
				//
				window.addEventListener( 'resize', onWindowResize, false );
			}
			function onWindowResize() {
				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();
				renderer.setSize( window.innerWidth, window.innerHeight );
			}
			function onDocumentMouseMove( event ) {
				event.preventDefault();
				mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
                mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
                camera.lookAt( scene.position );
				camera.updateMatrixWorld();
				// find intersections
				raycaster.setFromCamera( mouse, camera );
				var intersects = raycaster.intersectObjects( scene.children );
				if ( intersects.length > 0 ) {
					if ( INTERSECTED != intersects[ 0 ].object ) {
						if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );
						INTERSECTED = intersects[ 0 ].object;
						INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
						INTERSECTED.material.emissive.setHex( 0xff0000 );
					}
				} else {
					if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );
					INTERSECTED = null;
				}
			}
			//
			// function animate() {
			// 	requestAnimationFrame( animate );
			// 	render();
			// 	// stats.update();
			// }
			function render() {
				// theta += 0.1;
				// camera.position.x = radius * Math.sin( THREE.Math.degToRad( theta ) );
				// camera.position.y = radius * Math.sin( THREE.Math.degToRad( theta ) );
				// camera.position.z = radius * Math.cos( THREE.Math.degToRad( theta ) );
				// camera.lookAt( scene.position );
				// camera.updateMatrixWorld();
				// // find intersections
				// raycaster.setFromCamera( mouse, camera );
				// var intersects = raycaster.intersectObjects( scene.children );
				// if ( intersects.length > 0 ) {
				// 	if ( INTERSECTED != intersects[ 0 ].object ) {
				// 		if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );
				// 		INTERSECTED = intersects[ 0 ].object;
				// 		INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
				// 		INTERSECTED.material.emissive.setHex( 0xff0000 );
				// 	}
				// } else {
				// 	if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );
				// 	INTERSECTED = null;
                // }
                requestAnimationFrame(render)
				renderer.render( scene, camera );
			}
            render()


    
    },
    destroyed(){

    }
}
</script>
<style>
#kk{
    height: 100%;
    position: relative;
}

.options{
    position:absolute
}
</style>
