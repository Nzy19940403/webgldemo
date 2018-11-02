import Vue from 'vue'
import Router from 'vue-router'
import mytest from '@/components/mytest'
import Cube from '../components/cube'
import Sphere from '../components/sphere'
import Door from '../components/door'
import Raytest from '../components/raytest'

Vue.use(Router)

let router=new Router({
  routes: [
    {
      path: '/mytest',
      name: 'mytest',
      component: mytest,
      
    },
    {
      path:'/cube',
      name:'cube',
      component:Cube
    },
    {
      path:'/sphere',
      name:'sphere',
      component:Sphere
    },
    {
      path:'/door',
      name:'door',
      component:Door
    },
    {
      path:'/raytest',
      name:"raytest",
      component:Raytest
    }
  ]
})

export default  router