<template>
    <div id="wrap">
       
    </div>
</template>
<script>
// import * as THREE from 'three'
import OrbitControls from 'three-orbitcontrols'
import THREE from '../../utils/mythree.js'  //在mythree.js中对threejs做了一点额外功能的添加
import {openDoor,closeDoor} from '../../utils/Interactions.js'
export default {
    name:'door',
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
        
        camera.position.set(60, 40, 200);
        // camera.lookAt(sphere)
        scene.add(camera)
        camera.lookAt(scene)

        //建立地板
        let groundGeometry = new THREE.PlaneGeometry(400,400,50,50);
        let groundMaterial =new THREE.MeshBasicMaterial({
            color:0x888888,
            //wireframe:true
        });
        let ground =new THREE.Mesh(groundGeometry,groundMaterial);
        ground.name="ground"
        scene.add(ground);
        ground.rotation.x=-0.5*Math.PI
        ground.position.set(0,0,-10)
        
        //轨道控制
        let orbitControls = new OrbitControls(camera)
        orbitControls.autoRotate = true

        //建立墙壁模型
        let loader = new THREE.TextureLoader();
        loader.setPath('static/pic/');

        let wallGeometry = new THREE.BoxGeometry(25,20,1);
        let wallMaterial = new THREE.MeshBasicMaterial({
            color:0xeeeeee,
            map:loader.load('innerwall.jpg')
        })

        let wall1=new THREE.Mesh(wallGeometry,wallMaterial)
        wall1.position.set(-50,10,40)
        scene.add(wall1);
        // let wall2 = new THREE.Mesh(wallGeometry,wallMaterial);
        // wall2.position.set(20,10,40)
        // scene.add(wall2)
        let wall2 = new THREE.Mesh(wallGeometry,wallMaterial);
        wall2.position.set(90,10,40)
        scene.add(wall2)
      
        //建立顶梁
        let beamGeometry = new THREE.BoxGeometry(165,5,1)
        let beamMaterial = new THREE.MeshBasicMaterial({
            color:0x666666,
            map:loader.load('innerwall.jpg')
        })
        let beam1 = new THREE.Mesh(beamGeometry,beamMaterial)
        beam1.position.set(20,22.5,40)
        scene.add(beam1)

        let beam2 = new THREE.Mesh(beamGeometry,beamMaterial);
        beam2.rotation.y=Math.PI/2;
        beam2.position.set(-63,22.5,-42)
        scene.add(beam2)

        let beam3 = new THREE.Mesh(beamGeometry,beamMaterial);
        beam3.rotation.y=Math.PI/2;
        beam3.position.set(103,22.5,-42)
        scene.add(beam3)

        let beam4 = new THREE.Mesh(beamGeometry,beamMaterial);

        beam4.position.set(20,22.5,-124)
        scene.add(beam4)

        //建立小的墙壁拼接块
        let smallwallGeometry = new THREE.BoxGeometry(10,20,1)
        let smallwallMaterial = new THREE.MeshBasicMaterial({
            color:0xeeeeee,
            map:loader.load('innerwall.jpg')
        })
        let smallwall1=new THREE.Mesh(smallwallGeometry,smallwallMaterial);

        smallwall1.position.set(-18,10,40)

        scene.add(smallwall1)
        let smallwall2 = new THREE.Mesh(smallwallGeometry,smallwallMaterial);
        smallwall2.position.set(57.5,10,40)

        scene.add(smallwall2)



        //建立暂时的替代性的墙壁
        let tempwallGeometry= new THREE.BoxGeometry(165,20,1)
        let tempwallMaterial = new THREE.MeshBasicMaterial({
            color:0xeeeeee,
            map:loader.load('innerwall.jpg')
        })
 
        let tempwall1=new THREE.Mesh(tempwallGeometry,tempwallMaterial);
        tempwall1.rotation.y=Math.PI/2;
        tempwall1.position.set(-63,10,-42)
        scene.add(tempwall1)

        let tempwall2 = new THREE.Mesh(tempwallGeometry,tempwallMaterial);
        tempwall2.rotation.y=Math.PI/2;
        tempwall2.position.set(103,10,-42);
        scene.add(tempwall2)

        let tempwall3 = new THREE.Mesh(tempwallGeometry,tempwallMaterial);
        tempwall3.position.set(20,10,-124)
        scene.add(tempwall3)
        //玻璃上下方的墙壁
        let winwallGeometry = new THREE.BoxGeometry(65.6,3,1)
        let winwallMaterial = new THREE.MeshBasicMaterial({
            color:0xeeeeee,
            map:loader.load('innerwall.jpg')
        })
        let winwall1 =new THREE.Mesh(winwallGeometry,winwallMaterial);
        winwall1.position.set(19.8,18.5,40);
        scene.add(winwall1) 
        let winwall2 = new THREE.Mesh(winwallGeometry,winwallMaterial);
        winwall2.position.set(19.8,1.5,40);
        scene.add(winwall2)

        //建立玻璃
        let winGeometry = new THREE.BoxGeometry(65.6,14,1)
        let winMaterial = new THREE.MeshBasicMaterial({
            color: 0x096dd9,  
            opacity:0.3
        })
        winMaterial.transparent = true;

        let win = new THREE.Mesh(winGeometry,winMaterial);
        win.isOpen=false;
        win.isOpened=false;
        win.isanimating=false;
        win.name='window';
        win.speed=Math.PI/90;
        win.startangle=0;
        win.endangle= Math.PI/4;
        win.position.set(19.8,10,40);
        scene.add(win)


        //建立门的模型
        let doorGeometry = new THREE.BoxGeometry(15,20,0.4);
        let doorMaterial = new THREE.MeshBasicMaterial({
            color:0xffffff,
            map:loader.load('door.jpg')
        });

        let door = new THREE.Mesh(doorGeometry,doorMaterial);
        door.isOpen=false;//没有点击开门的时候，isopen是false
        door.isOpened=false;        //门已经完全打开之后 isopened便成为true
        //旋转门有关的参数
        door.name='door'
        door.isanimating=false,
        door.startangle=0;
        door.endangle=(Math.PI/3)*2;
        door.doorSpeed = Math.PI/30;
        door.doorAxis=new THREE.Vector3(0,1,0)
        door.doorPoint = new THREE.Vector3(-23.3,0,40)  ;
        door.position.set(-30,10,40)
     
        scene.add(door)

        let door2 =new THREE.Mesh(doorGeometry,doorMaterial)
        door2.position.set(70,10,40)
        door2.name='door'
        door2.startangle=0;
        door2.endangle= (Math.PI/3)*2;
        door2.doorSpeed=Math.PI/30 ;
        door2.doorAxis=new THREE.Vector3(0,1,0)
        door2.doorPoint = new THREE.Vector3(77.3,0,40)  ;
        scene.add(door2)
        //
        //建立组
        // let group = new THREE.Object3D();
        // group.add(door);
        // scene.add(group)

        //建立货仓
        let storegroundGeometry = new THREE.BoxGeometry(25,1,15)    //仓库箱子的地板
        let storegroundMaterial = new THREE.MeshBasicMaterial({
            color:0xeeeeee,
            map:loader.load('33.jpg')
        })
        let storeground = new THREE.Mesh(storegroundGeometry,storegroundMaterial);
        storeground.name="group"
        let storeground2 = new THREE.Mesh(storegroundGeometry,storegroundMaterial);
        storeground2.position.set(0,20,0)
        storeground2.name="group"
        // storeground.position.set(0,0.5,-50)
        // scene.add(storeground)

        let storebackwallGeometry = new THREE.BoxGeometry(25,20,1)  //仓库箱子后面的那块板

        let storebackwall = new THREE.Mesh(storebackwallGeometry,storegroundMaterial);
        storebackwall.position.set(0,10,-7)
        storebackwall.name="group"
        // scene.add(storebackwall)
         
        let storesidewallGeometry = new THREE.BoxGeometry(1,20,15);
        let storesidewall1 =new THREE.Mesh(storesidewallGeometry,storegroundMaterial);
        storesidewall1.name="group"
        storesidewall1.position.set(-12,10,0)
        let storesidewall2 =new THREE.Mesh(storesidewallGeometry,storegroundMaterial);
        storesidewall2.position.set(12,10,0)
        storesidewall2.name="group"




        let group = new THREE.Object3D();
        // group.add(storeground)
        storeground.add(storeground2)
        storeground.add(storebackwall)
        storeground.add(storesidewall1)
        storeground.add(storesidewall2)
        // storeground.position.set(0,0.5,-50)
        group.position.set(0,0.5,-50)
        group.add(storeground)
        scene.add(group)

        //玻璃门;
        let storedoor = new THREE.Mesh(storebackwallGeometry,winMaterial);
        storedoor.position.set(0,10,7);
        storedoor.name="door";
        storedoor.isanimating=false,
        storedoor.startangle=0;
        storedoor.endangle=(Math.PI/3)*2;
        storedoor.doorSpeed = Math.PI/30;
        storedoor.doorAxis=new THREE.Vector3(0,1,0)
        storedoor.doorPoint = new THREE.Vector3(12.5,0,7.5)  ; //这个坐标相对于它的父元素group
        group.add(storedoor)

        //抽屉
        let drawerGeometry = new THREE.BoxGeometry(23,1,14)   
        let drawerMaterial = new THREE.MeshBasicMaterial({
            color: 0x444444,  
           
        })
        let drawer = new THREE.Mesh(drawerGeometry,drawerMaterial);
        drawer.name="drawer";
        drawer.isanimating=false
        drawer.isOpen=false;
        drawer.isOpened=false;
        drawer.startlen=0;
        drawer.endlen=8;
        drawer.speed=1;
        drawer.position.set(0,10,0);
        group.add(drawer)
        //建立交互
        let target;
        var intersected
        
        let mouse = new THREE.Vector2();
        function onDocumentMouseDown(e){
            e.preventDefault();
    
            camera.lookAt(scene.position)
            mouse.x=(e.clientX/window.innerWidth)*2-1;
            mouse.y=-(e.clientY/window.innerHeight)*2+1;

           
  
            let vector = new THREE.Vector3(mouse.x,mouse.y,0.5).unproject(camera);
            let raycaster = new THREE.Raycaster(camera.position,vector.sub(camera.position).normalize())
            // let raycaster = new THREE.Raycaster();
            // camera.updateMatrixWorld();
            raycaster.setFromCamera(mouse,camera)

            let intersects = raycaster.intersectObjects(scene.children,true)


            if (intersects.length > 0) {
                
                //选中第一个射线相交的物体
                //let SELECTED = intersects[0].object;
                 
                intersected = intersects[0].object;
      
                // console.log(intersected)
                
                if(intersected.name=='door'){
                
                    // if(!isanimating){
                    //     (!isanimating)&&(target=intersected)
                    //     //isopen的状态应该是 1、门关着的时候（isopened为false） 为false，点击开门，这时候变为true；2,门已经开了（isopened为true），这时候如果不点击关门
                    //     if(intersected.isOpen&&!intersected.isOpened||intersected.isOpened&&!intersected.isOpen)return
                    //     intersected.isOpen=!intersected.isOpen
                    // }
                    (!intersected.isanimating)&&(target=intersected)
                    
                    //isopen的状态应该是 1、门关着的时候（isopened为false） 为false，点击开门，这时候变为true；2,门已经开了（isopened为true），这时候如果不点击关门
                    if(intersected.isOpen&&!intersected.isOpened||intersected.isOpened&&!intersected.isOpen)return
                    intersected.isOpen=!intersected.isOpen

                }else if(intersected.name=='window'){
                    (!intersected.isanimating)&&(target=intersected)
                   
                    if(intersected.isOpen&&!intersected.isOpened||intersected.isOpened&&!intersected.isOpen)return
                    intersected.isOpen=!intersected.isOpen
                }else if(intersected.name=='drawer'){
                    (!intersected.isanimating)&&(target=intersected)
                   
                    if(intersected.isOpen&&!intersected.isOpened||intersected.isOpened&&!intersected.isOpen)return
                    intersected.isOpen=!intersected.isOpen
                }
            }
            
            
        }
        function onWindowResize() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize( window.innerWidth, window.innerHeight );
        }
        //开关门

        document.getElementById("wrap").addEventListener('mousedown',onDocumentMouseDown,false)
        window.addEventListener( 'resize', onWindowResize, false );

        
        //由于render渲染函数一直在反复执行，所以出于性能考虑，应该把一些初始的变量定义在外面以防重复定义
        var startangle = door.startangle                  //门的初始角度状态
        var endangle = door.endangle   //门打开后的最终角度状态
        let doorSpeed= door.doorSpeed  ;
        let doorAxis=door.doorAxis  ;
        let doorPoint =door.doorPoint  ;
        let connectDrawer;//用来处理仓库门相关的抽屉
        function dooranimate(obj){
            //如果门的parent是group的时候，将相应的drawer赋值给connectDrawer
            if(obj.parent==group&&!connectDrawer){
                for(let item of obj.parent.children){
                    (item.name=="drawer")&&(connectDrawer=item)  
                }
            }    


            if(obj.isOpen){
              
                //这里有两种情况，第一种点击的门是storedoor，另一种是door
                // if(obj.parent==group){

                // }else{
                //     if(startangle<endangle&&!obj.isOpened){
                //         obj.isanimating=true
                //         startangle += obj.doorSpeed
                //         //开门的状态

                //         openDoor(obj.doorAxis,obj.doorPoint,obj.doorSpeed,obj) 
                //     }else{
                //         //门已经打开，还未关门的状态
                //         obj.isanimating=false
                //         obj.isOpened=true 
                //         startangle=obj.startangle
                        
                //     } 
                // }
                if(startangle<endangle&&!obj.isOpened){
                    obj.isanimating=true
                    startangle += obj.doorSpeed
                    //开门的状态

                    openDoor(obj.doorAxis,obj.doorPoint,obj.doorSpeed,obj) 

                    
                }else{
                    //门已经打开，还未关门的状态
                    obj.isanimating=false
                    obj.isOpened=true 
                    startangle=obj.startangle
                    if(obj.parent==group){
                        // connectDrawer.isOpen=!connectDrawer.isOpen
                        if(connectDrawer.position.z<connectDrawer.endlen){
                            connectDrawer.position.z+=connectDrawer.speed
                            connectDrawer.isanimating=true;
                            
                        }else{
                            connectDrawer.isanimating=false;
                            return connectDrawer.isOpened=true
                        }
                    }
                }         
            }else{  // 如果没有开门的情况 也就是一开始的初始情况 会一直刷新
     
       
                if(obj.isOpened){
                    //如果已经打开门， 那么isOpened会变成true 这时候是关门动画
                    // endangle -= doorSpeed


                    // if(obj.parent==group&&!connectDrawer){
                    //     for(let item of obj.parent.children){
                    //         (item.name=="drawer")&&(connectDrawer=item)  //如果门的parent是group的时候，将相应的drawer赋值给connectDrawer
                    //     }
                    // }       


                    //有三种情况，一种是打开的门不是storedoor而是一般的door， 第二种是打开的是storedooor但是storedoor的connectDrawer并没有打开，第三种是打开的是storedoor并且相对应的connectDrawer已经打开了

                    if(obj.parent==group){
                        if(connectDrawer.isOpened){
                            //打开的是storedoor并且connectDrawer也打开了
                            if(connectDrawer.position.z>connectDrawer.startlen){
                                connectDrawer.position.z -= connectDrawer.speed;
                                connectDrawer.isanimating=true
                            }else{
                                connectDrawer.isanimating=false
                                connectDrawer.isOpened=false 
                            
                            }


                        }else{
                            //打开的是storedoor但是connectDrawer并没有打开
                            if(endangle>0){
                                endangle -= obj.doorSpeed
                                obj.isanimating=true
                                //正在关门的状态
                                closeDoor(obj.doorAxis,obj.doorPoint,-obj.doorSpeed,obj)   
                            }else{
                                //门已经关闭，还没开门的状态
                                obj.isanimating=false
                                obj.isOpened=false    
                                endangle=obj.endangle 
                            
                            } 
                        }

                    }else{
                        //打开的不是storedoor的情况
                        if(endangle>0){
                        endangle -= obj.doorSpeed
                        obj.isanimating=true
                        //正在关门的状态
                        closeDoor(obj.doorAxis,obj.doorPoint,-obj.doorSpeed,obj)   
                        
                    
                        }else{
                            //门已经关闭，还没开门的状态
                            obj.isanimating=false
                            obj.isOpened=false    
                            endangle=obj.endangle 
                        
                        } 
                    }
                    // if(endangle>0){
                    //     endangle -= obj.doorSpeed
                    //     obj.isanimating=true
                    //     //正在关门的状态
                    //     closeDoor(obj.doorAxis,obj.doorPoint,-obj.doorSpeed,obj)   
                    //     //判断把托盘关回去
                        
                    
                    // }else{
                    //     //门已经关闭，还没开门的状态
                    //     obj.isanimating=false
                    //     obj.isOpened=false    
                    //     endangle=obj.endangle 
                       
                    // } 
                    
                    
                }else{   //这里是没有打开过门的状态 一直持续刷新
                    // console.log(startangle)
                    // startangle = 0                      
                    // endangle = (Math.PI/3)*2
                }                    
            }
        }

        

        function windowanimate(obj){
           
            if(obj.isOpen){
                
                if(obj.rotation.x>(-obj.endangle)){
                    obj.rotation.x-=obj.speed
                    obj.isanimating=true
                }else{
                    obj.isanimating=false
                    return obj.isOpened=true;
                }

            }else{
                if(obj.rotation.x<obj.startangle){
                    obj.rotation.x +=obj.speed
                    obj.isanimating=true
                }else{
                    obj.isanimating=false
                    return obj.isOpened=false
                }
               
            }
        }
        function draweranimate(obj){
            if(obj.isOpen){
                //这时候drawer开始拉出来
                // obj.translate
                
                if(obj.position.z<obj.endlen){
                    obj.position.z+=obj.speed
                    obj.isanimating=true;
                    
                }else{
                    obj.isanimating=false;
                    return obj.isOpened=true
                }
            }else{
                if(obj.isOpened){
                    if(obj.position.z>obj.startlen){
                        obj.position.z -= obj.speed;
                        obj.isanimating=true
                    }else{
                        obj.isanimating=false
                        return obj.isOpened=false 
                    }
                }

            }
        }


        //渲染函数，一直在重复执行
        function render(){
            requestAnimationFrame(render)
            renderer.render(scene,camera);  
            if(target&&target.name=='door'){
                dooranimate(target)
            }else if(target&&target.name=='window'){
                windowanimate(target)
            }else if(target&&target.name=="drawer"){
                draweranimate(target)
                
            }else if(target&&target.name=="storedoor"){
                storedooranimate(target)
            }
            
            

        }
        render()
        

        
        // function opendoor(xAxis,point){
        //     // let xAxis = new THREE.Vector3(0,1,0)
        //     // let point = new THREE.Vector3(7.4,1,0)   
      
        //     door.rotateAroundWorldAxis(point,xAxis,Math.PI/180)   
            
        // }
        // function closedoor(){
        //     let xAxis = new THREE.Vector3(0,1,0)
        //     let point = new THREE.Vector3(7.4,1,0)       
        //     door.rotateAroundWorldAxis(point,xAxis,-Math.PI/180)  
            
        // }
        // Rotate an object around an arbitrary axis in object space
        // var rotObjectMatrix;
        // function rotateAroundObjectAxis(object, axis, radians) {
        //     rotObjectMatrix = new THREE.Matrix4();
        //     rotObjectMatrix.makeRotationAxis(axis.normalize(), radians);

        //     // old code for Three.JS pre r54:
        //     // object.matrix.multiplySelf(rotObjectMatrix);      // post-multiply
        //     // new code for Three.JS r55+:
        //     object.matrix.multiply(rotObjectMatrix);
           
        //     // old code for Three.js pre r49:
        //     // object.rotation.getRotationFromMatrix(object.matrix, object.scale);
        //     // old code for Three.js r50-r58:
        //     // object.rotation.setEulerFromRotationMatrix(object.matrix);
        //     // new code for Three.js r59+:
        //     object.rotation.setFromRotationMatrix(object.matrix);
        // }
        // var rotWorldMatrix;
        // function rotateAroundWorldAxis(object,axis,radians){
        //     rotWorldMatrix = new THREE.Matrix4();
        //     rotWorldMatrix.makeRotationAxis(axis.normalize(),radians);
        //     rotWorldMatrix.multiply(object.matrix);
        //     object.matrix=rotWorldMatrix;
        //     object.rotation.setFromRotationMatrix(object.matrix);

        //     // var rotationMatrix = new THREE.Matrix4();
        //     // rotationMatrix.makeRotationAxis( axis.normalize(), radians );
        //     // var currentPos = new THREE.Vector4(object.position.x, object.position.y, object.position.z, 1);
        //     // var newPos = currentPos.applyMatrix4(rotationMatrix);
        //     // object.position.x = newPos.x;
        //     // object.position.y = newPos.y;
        //     // object.position.z = newPos.z;
        // }
        


        // THREE.Object3D.prototype.rotateAroundWorldAxis = function() {

        //     // rotate object around axis in world space (the axis passes through point)
        //     // axis is assumed to be normalized
        //     // assumes object does not have a rotated parent

        //     var q = new THREE.Quaternion();
        //     console.log(0)
        //     return function rotateAroundWorldAxis( point, axis, angle) {
                
               
                
        //         q.setFromAxisAngle( axis, angle );

        //         this.applyQuaternion( q );

        //         this.position.sub( point );
        //         this.position.applyQuaternion( q );
        //         this.position.add( point );
                
        //         return this
        //     }

        // }();       
    },
    methods: {
        
    }
}
</script>
<style>
#wrap{
    /* height: 50%; */
    display: inline-block
}
</style>
