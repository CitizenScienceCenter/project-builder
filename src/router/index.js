import Vue from 'vue'
import store from '@/store'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login'
import Discover from '@/components/Discover'
import Project from '@/components/Project/Project'
import ProjectBuilder from '@/components/Project/Builder/ProjectBuilder'
import About from '@/components/About'
import TaskBuilder from '@/components/Task/Builder/TaskBuilder'

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

    // Project related pages

    {
      path: '/project/:id',
      name: 'project',
      component: Project,
      props: true
    },
    {
      path: '/project/:id/task-presenter',
      name: 'project.task.presenter',
      component: Project,
      props: true,
      beforeEnter: (to, from, next) => {
        next()
      }
    },

    // Project builder steps

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
      path: '/project/builder/end',
      name: 'project.builder.end',
      component: ProjectBuilder,
      beforeEnter: (to, from, next) => {

        if (store.state.project.builder.steps.name === true &&
          store.state.project.builder.steps.information === true &&
          store.state.project.builder.steps.story === true) {

          store.dispatch('project/builder/reset')
          store.commit('project/builder/setCurrentStep', 'end')

          next()
        } else {
          next({ name: 'project.builder.story' })
        }
      }
    },

    // Task builder steps

    {
      path: '/task/builder/material',
      name: 'task.builder.material',
      component: TaskBuilder,
      beforeEnter: (to, from, next) => {
        store.commit('task/builder/setCurrentStep', 'material')
        next()
      }
    },
    {
      path: '/task/builder/job',
      name: 'task.builder.job',
      component: TaskBuilder,
      beforeEnter: (to, from, next) => {
        if (store.state.task.builder.steps.material === true) {
          store.commit('task/builder/setCurrentStep', 'job')
          next()
        } else {
          next({ name: 'task.builder.material' })
        }
      }
    },
    {
      path: '/task/builder/template',
      name: 'task.builder.template',
      component: TaskBuilder,
      beforeEnter: (to, from, next) => {
        if (store.state.task.builder.steps.job === true) {
          store.commit('task/builder/setCurrentStep', 'template')
          next()
        } else {
          next({ name: 'task.builder.job' })
        }
      }
    },
    {
      path: '/task/builder/source',
      name: 'task.builder.source',
      component: TaskBuilder,
      beforeEnter: (to, from, next) => {
        if (store.state.task.builder.steps.template === true) {
          store.commit('task/builder/setCurrentStep', 'source')
          next()
        } else {
          next({ name: 'task.builder.template' })
        }
      }
    },
    {
      path: '/task/builder/summary',
      name: 'task.builder.summary',
      component: TaskBuilder,
      beforeEnter: (to, from, next) => {
        if (store.state.task.builder.steps.source === true) {
          store.commit('task/builder/setCurrentStep', 'summary')
          next()
        } else {
          next({ name: 'task.builder.source' })
        }
      }
    }

  ]
})
