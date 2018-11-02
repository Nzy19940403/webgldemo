<template>
  <div id="app">
    <stats ref="test"></stats>
    <div class="options">
      <router-link to="/mytest"><button>mytest</button></router-link>
      <router-link to="/cube"><button>cube</button></router-link>
      <router-link to="/sphere"><button>sphere</button></router-link>
      <router-link to="/door"><button>door</button></router-link>
      <router-link to="/raytest"><button>raytest</button></router-link>
    </div>
      
  <transition name="fade" mode="out-in">
      <router-view></router-view>   
  </transition>
  </div>
</template>

<script>
import stats from './components/stats'
import Vue from 'vue';

export default {
  name: 'App',
  components:{
    stats
  }
}
</script>

<style>
#app{
  position: relative;
  height: 100%;
}
.options{
  position:absolute;
  z-index: 100;
}
html,body{
    margin: 0;
    overflow: hidden;
    height: 100%;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s ease;
}
.fade-enter, .fade-leave-active {
  opacity: 0
}

.slide-left-enter, .slide-right-leave-active {
  opacity: 0;
  -webkit-transform: translate(30px, 0);
  transform: translate(30px, 0);
}
.slide-left-leave-active, .slide-right-enter {
  opacity: 0;
  -webkit-transform: translate(-30px, 0);
  transform: translate(-30px, 0);
}
</style>
