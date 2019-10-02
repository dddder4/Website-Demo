import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import CourseIndex from '@/components/course/Index'
import CourseShow from '@/components/course/Show'
import gather from '@/components/course/gather'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: '/',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/course/index',
      name: 'CourseIndex',
      component: CourseIndex
    },
    {
      path: '/course/show/:coursename',
      name: 'CourseShow',
      component: CourseShow
    },
    {
      path: '/course/:coursename/:chaptername/实验指导',
      name: 'gather',
      component: gather
    }
  ]
})
