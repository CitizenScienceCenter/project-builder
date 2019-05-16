import Vue from 'vue'
import store from '@/store'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login'
import Discover from '@/components/Discover'
import Project from '@/components/Project/Project'
import ProjectBuilder from '@/components/Project/Builder/ProjectBuilder'
import About from '@/components/About'

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
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/project/:id',
      name: 'project',
      component: Project,
      props: true
    },
    {
      path: '/project/builder/name',
      name: 'project.builder.name',
      component: ProjectBuilder,
      beforeEnter: (to, from, next) => {
        store.commit('project/builder/setCurrentStep', 'name')
        next()
      }
    },
    {
      path: '/project/builder/information',
      name: 'project.builder.information',
      component: ProjectBuilder,
      beforeEnter: (to, from, next) => {
        if (store.state.project.builder.steps.name === true) {
          store.commit('project/builder/setCurrentStep', 'information')
          next()
        } else {
          next({ name: 'project.builder.name' })
        }
      }
    },
    {
      path: '/project/builder/story',
      name: 'project.builder.story',
      component: ProjectBuilder,
      beforeEnter: (to, from, next) => {
        if (store.state.project.builder.steps.name === true && store.state.project.builder.steps.information === true) {
          store.commit('project/builder/setCurrentStep', 'story')
          next()
        } else {
          next({ name: 'project.builder.information' })
        }
      }
    },
    {
      path: '/project/:id/task-presenter',
      name: 'project.task.presenter',
      component: Project,
      props: true,
      beforeEnter: (to, from, next) => {
        // if (store.state.project.builder.steps.name === true && store.state.project.builder.steps.information === true) {
        //   store.commit('project/builder/setCurrentStep', 'story')
        //   next()
        // } else {
        //   next({ name: 'project.builder.information' })
        // }
        next()
      }
    }
  ]
})
