<template>
    <div id="ww"></div>
</template>

<script>
import Stats from 'stats.js'
export default {
    name:'stats',
    mounted(){
        let stats = new Stats()
        stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
        stats.domElement.style.position = 'absolute'; //绝对坐标
        stats.domElement.style.left = '0px';// (0,0)px,左上角
        stats.domElement.style.top = '50px'
        this.$mystats=stats
        document.getElementById("ww").appendChild( stats.dom );
    }
}
</script>
<style>
#ww{
    /* height: 500px;
    width: 100px; */
}
</style>
