import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login'
import Discover from '@/components/Discover'
import Project from '@/components/Project'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/discover',
      name: 'discover',
      component: Discover
    },
    {
      path: '/project/:id',
      name: 'project',
      component: Project,
      props: true
    }
  ]
})
