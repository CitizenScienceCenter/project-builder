import Vue from 'vue'
import store from '@/store'
import Router from 'vue-router'
import Home from '@/components/Home.vue'
import Login from '@/components/Login.vue'
import Discover from '@/components/Discover.vue'
import Project from '@/components/Project/Project.vue'
import ProjectBuilder from '@/components/Project/Builder/ProjectBuilder.vue'
import About from '@/components/About.vue'
import TaskBuilder from '@/components/Task/Builder/TaskBuilder.vue'
import TemplateRenderer from '@/components/Task/TemplateRenderer.vue'
import Profile from '@/components/Profile/Profile.vue'
import TaskPresenterMenu from '@/components/Project/Menu/TaskMenu/Presenter/TaskPresenterMenu.vue'
import TaskPresenterEditor from '@/components/Project/Menu/TaskMenu/Presenter/TaskPresenterEditor.vue'
import TaskList from '@/components/Project/Menu/TaskMenu/TaskList.vue'
import TaskImporterMenu from '@/components/Project/Menu/TaskMenu/Importer/TaskImporterMenu.vue'
import Registration from '@/components/Registration/Registration.vue'
import TaskExporterMenu from '@/components/Project/Menu/TaskMenu/Exporter/TaskExporterMenu.vue'
import TaskSettingsMenu from '@/components/Project/Menu/TaskMenu/Settings/TaskSettingsMenu.vue'
import DeleteTaskSetting from '@/components/Project/Menu/TaskMenu/Settings/DeleteTaskSetting.vue'
import TaskSchedulerSetting from '@/components/Project/Menu/TaskMenu/Settings/TaskSchedulerSetting.vue'
import TaskRedundancySetting from '@/components/Project/Menu/TaskMenu/Settings/TaskRedundancySetting.vue'
import TaskPrioritySetting from '@/components/Project/Menu/TaskMenu/Settings/TaskPrioritySetting.vue'
import FlickrCallback from '@/components/Task/Builder/FlickrCallback.vue'

import {
  i18n
} from '../i18n.js'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  scrollBehavior () {
    return {
      x: 0,
      y: 0
    }
  },
  routes: [{
    path: '/:lang',
    component: {
      render (c) {
        return c('router-view')
      }
    },
    children: [{
      path: '',
      name: 'home',
      component: Home,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: 'login',
      name: 'login',
      component: Login,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: 'register',
      name: 'register',
      component: Registration,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: 'logout',
      name: 'logout',
      beforeEnter: (to, from, next) => {
        store.dispatch('c3s/user/logout').then(signedOut => {
          if (signedOut) {
            next({ name: 'home' })
          }
        })
      },
      meta: {
        requiresAuth: true
      }
    },
    {
      path: 'discover',
      name: 'discover',
      component: Discover,
      meta: {
        i18n: 'navigation-discover',
        nav: true,
        requiresAuth: false
      }
    },
    {
      path: 'about',
      name: 'about',
      component: About,
      meta: {
        i18n: 'navigation-about',
        nav: false,
        requiresAuth: false
      }
    },
    {
      path: 'profile',
      name: 'profile',
      component: Profile,
      beforeEnter: (to, from, next) => {
        store.commit('user/isInProfileEditionMode', false)
        next()
      },
      meta: {
        i18n: 'navigation-profile',
        nav: false,
        requiresAuth: true
      }
    },
    {
      path: 'profile/edit',
      name: 'profile.edition',
      component: Profile,
      beforeEnter: (to, from, next) => {
        store.commit('user/isInProfileEditionMode', true)
        next()
      },
      meta: {
        i18n: 'profile-edit',
        nav: false
      }
    },
    {
      path: 'builder/name',
      name: 'project.builder.name',
      component: ProjectBuilder,
      beforeEnter: (to, from, next) => {
        store.commit('project/builder/setCurrentStep', 'name')
        next()
      },
      meta: {
        nav: false,
        requiresAuth: true
      }
    },
    {
      path: 'builder/information',
      name: 'project.builder.information',
      component: ProjectBuilder,
      beforeEnter: (to, from, next) => {
        console.log(store.state)
        if (store.state.project.builder.steps.name === true) {
          store.commit('project/builder/setCurrentStep', 'information')
          next()
        } else {
          next({
            name: 'project.builder.name'
          })
        }
      },
      meta: {
        nav: false,
        requiresAuth: true
      }
    },
    {
      path: 'builder/story',
      name: 'project.builder.story',
      component: ProjectBuilder,
      beforeEnter: (to, from, next) => {
        if (store.state.project.builder.steps.name === true && store.state.project.builder.steps.information === true) {
          store.commit('project/builder/setCurrentStep', 'story')
          next()
        } else {
          next({
            name: 'project.builder.information'
          })
        }
      },
      meta: {
        nav: false,
        requiresAuth: true
      }
    },
    {
      path: 'builder/end',
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
          next({
            name: 'project.builder.story'
          })
        }
      },
      meta: {
        nav: false,
        requiresAuth: true
      }
    },
    {
      path: 'project/:pid',
      name: 'project',
      component: Project,
      props: true,
      beforeEnter: (to, from, next) => {
        // TODO use project ID to make pid the `currentProject` in the store
        next()
      },
      children: [{
        path: 'task-importers',
        name: 'project.task.importers',
        component: TaskImporterMenu,
        props: true,
        meta: {
          nav: false,
          requiresAuth: false
        }
      },
      {
        path: 'task-exporters',
        name: 'project.task.exporters',
        component: TaskExporterMenu,
        props: true,
        meta: {
          nav: false,
          requiresAuth: false
        }
      },
      {
        path: 'task-settings',
        name: 'project.task.settings',
        component: TaskSettingsMenu,
        props: true,
        meta: {
          nav: false,
          requiresAuth: false
        }
      },
      {
        path: 'task-settings/delete',
        name: 'project.task.settings.delete',
        component: DeleteTaskSetting,
        props: true,
        meta: {
          nav: false,
          requiresAuth: false
        }
      },
      {
        path: 'task-settings/scheduler',
        name: 'project.task.settings.scheduler',
        component: TaskSchedulerSetting,
        props: true,
        meta: {
          nav: false,
          requiresAuth: false
        }
      },
      {
        path: 'task-settings/redundancy',
        name: 'project.task.settings.redundancy',
        component: TaskRedundancySetting,
        props: true,
        meta: {
          nav: false,
          requiresAuth: false
        }
      },
      {
        path: 'task-settings/priority',
        name: 'project.task.settings.priority',
        component: TaskPrioritySetting,
        props: true,
        meta: {
          nav: false,
          requiresAuth: false
        }
      },
      {
        path: 'task-presenter',
        name: 'project.task.presenter',
        component: TemplateRenderer,
        props: true
      },
      {
        path: 'task-presenter/settings',
        name: 'project.task.presenter.settings',
        component: TaskPresenterMenu,
        props: true,
        meta: {
          nav: false,
          requiresAuth: false
        }
      },
      {
        path: 'task-presenter/editor',
        name: 'project.task.presenter.editor',
        component: TaskPresenterEditor,
        props: true,
        meta: {
          nav: false,
          requiresAuth: false
        }
      },
      {
        path: 'tasks',
        name: 'project.tasks.list',
        component: TaskList,
        props: true
      },
      {
        path: 'task/builder/material',
        name: 'task.builder.material',
        component: TaskBuilder,
        props: true,
        beforeEnter: (to, from, next) => {
          store.commit('task/builder/setCurrentStep', 'material')
          next()
        },
        meta: {
          nav: false,
          requiresAuth: true
        }
      },
      {
        path: 'task/builder/job',
        name: 'task.builder.job',
        component: TaskBuilder,
        props: true,
        beforeEnter: (to, from, next) => {
          if (store.state.task.builder.steps.material === true) {
            store.commit('task/builder/setCurrentStep', 'job')
            next()
          } else {
            next({
              name: 'task.builder.material',
              params: {
                id: to.params.id
              }
            })
          }
        },
        meta: {
          nav: false,
          requiresAuth: false
        }
      },
      {
        path: 'task/builder/template',
        name: 'task.builder.template',
        component: TaskBuilder,
        props: true,
        beforeEnter: (to, from, next) => {
          if (store.state.task.builder.steps.job === true) {
            store.commit('task/builder/setCurrentStep', 'template')
            next()
          } else {
            next({
              name: 'task.builder.job',
              params: {
                id: to.params.id
              }
            })
          }
        },
        meta: {
          nav: false,
          requiresAuth: false
        }
      },
      {
        path: 'task/builder/source',
        name: 'task.builder.source',
        component: TaskBuilder,
        props: true,
        beforeEnter: (to, from, next) => {
          if (store.state.task.builder.steps.template === true) {
            store.commit('task/builder/setCurrentStep', 'source')
            next()
          } else {
            next({
              name: 'task.builder.template',
              params: {
                id: to.params.id
              }
            })
          }
        },
        meta: {
          nav: false,
          requiresAuth: false
        }
      },
      {
        path: 'task/builder/summary',
        name: 'task.builder.summary',
        props: true,
        component: TaskBuilder,
        beforeEnter: (to, from, next) => {
          if (store.state.task.builder.steps.source === true) {
            store.commit('task/builder/setCurrentStep', 'summary')
            next()
          } else {
            next({
              name: 'task.builder.source',
              params: {
                id: to.params.id
              }
            })
          }
        },
        meta: {
          nav: false,
          requiresAuth: false
        }
      }
      ]
    }
    ]
  },
  {
    path: '/flickr/callback',
    name: 'flickr.callback',
    props: true,
    component: FlickrCallback
  }
  ]
})

router.beforeEach((to, from, next) => {
  const filteredPath = to.path.split('/').filter(element => element.length > 0)
  if (filteredPath.length > 0 && filteredPath[0].length === 2) {
    const language = to.params.lang
    store.dispatch('settings/setLanguage', language)
    i18n.locale = language
    if (to.matched.some(record => record.meta.requiresAuth)) {
      // TODO validate user
      if (store.state.c3s.user.currentUser) {
        next()
      } else {
        router.push( {name:'login'} )
      }
    } else {
      next()
    }
  } else {
    next('/' + i18n.locale + to.path)
  }
})

export default router
