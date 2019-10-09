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

//import { i18n } from '../i18n.js';

Vue.use(Router)

const router = new Router({
  mode: 'history',
  scrollBehavior () {
    return { x: 0, y: 0 }
  },
  routes: [
    {
      path: '/:lang',
      component: { render (c) { return c('router-view') } },
      children: [
        {
          path: '',
          name: 'home',
          component: Home
        },
        {
          path: 'login',
          name: 'login',
          component: Login
        },
        {
          path: 'register',
          name: 'register',
          component: Registration
        },
        {
          path: 'logout',
          name: 'logout',
          beforeEnter: (to, from, next) => {
            store.dispatch('user/signOut').then(signedOut => {
              if (signedOut) {
                next({ name: 'home' })
              }
            })
          }
        },
        {
          path: 'discover',
          name: 'discover',
          component: Discover,
         meta: {i18n: 'navigation-discover', nav: true}
        },
        {
          path: 'about',
          name: 'about',
          component: About,
          meta: {i18n: 'navigation-about', nav: true}
        },
        {
          path: 'profile',
          name: 'profile',
          component: Profile,
          beforeEnter: (to, from, next) => {
            store.commit('user/isInProfileEditionMode', false)
            next()
          }
        },
        {
          path: 'profile/edit',
          name: 'profile.edition',
          component: Profile,
          beforeEnter: (to, from, next) => {
            store.commit('user/isInProfileEditionMode', true)
            next()
          }
        },

        // Project related pages

        {
          path: 'project/:id',
          name: 'project',
          component: Project,
          props: true,
          beforeEnter: (to, from, next) => {
            const selectedProjectId = store.state.project.selectedProject.id
            if (parseInt(selectedProjectId) !== parseInt(to.params.id)) {
              store.commit('project/menu/setCurrentTab', store.state.project.menu.tabs.info)
            }
            next()
          }
        },
        {
          path: 'project/:id/task-importers',
          name: 'project.task.importers',
          component: TaskImporterMenu,
          props: true
        },
        {
          path: 'project/:id/task-exporters',
          name: 'project.task.exporters',
          component: TaskExporterMenu,
          props: true
        },
        {
          path: 'project/:id/task-settings',
          name: 'project.task.settings',
          component: TaskSettingsMenu,
          props: true
        },
        {
          path: 'project/:id/task-settings/delete',
          name: 'project.task.settings.delete',
          component: DeleteTaskSetting,
          props: true
        },
        {
          path: 'project/:id/task-settings/scheduler',
          name: 'project.task.settings.scheduler',
          component: TaskSchedulerSetting,
          props: true
        },
        {
          path: 'project/:id/task-settings/redundancy',
          name: 'project.task.settings.redundancy',
          component: TaskRedundancySetting,
          props: true
        },
        {
          path: 'project/:id/task-settings/priority',
          name: 'project.task.settings.priority',
          component: TaskPrioritySetting,
          props: true
        },
        {
          path: 'project/:id/task-presenter',
          name: 'project.task.presenter',
          component: TemplateRenderer,
          props: true
        },
        {
          path: 'project/:id/task-presenter/settings',
          name: 'project.task.presenter.settings',
          component: TaskPresenterMenu,
          props: true
        },
        {
          path: 'project/:id/task-presenter/editor',
          name: 'project.task.presenter.editor',
          component: TaskPresenterEditor,
          props: true
        },
        {
          path: 'project/:id/tasks',
          name: 'project.tasks.list',
          component: TaskList,
          props: true
        },

        // Project builder steps

        {
          path: 'project/builder/name',
          name: 'project.builder.name',
          component: ProjectBuilder,
          beforeEnter: (to, from, next) => {
            store.commit('project/builder/setCurrentStep', 'name')
            next()
          }
        },
        {
          path: 'project/builder/information',
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
          path: 'project/builder/story',
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
          path: 'project/builder/end',
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
          path: 'project/:id/task/builder/material',
          name: 'task.builder.material',
          component: TaskBuilder,
          props: true,
          beforeEnter: (to, from, next) => {
            store.commit('task/builder/setCurrentStep', 'material')
            next()
          }
        },
        {
          path: 'project/:id/task/builder/job',
          name: 'task.builder.job',
          component: TaskBuilder,
          props: true,
          beforeEnter: (to, from, next) => {
            if (store.state.task.builder.steps.material === true) {
              store.commit('task/builder/setCurrentStep', 'job')
              next()
            } else {
              next({ name: 'task.builder.material', params: { id: to.params.id } })
            }
          }
        },
        {
          path: 'project/:id/task/builder/template',
          name: 'task.builder.template',
          component: TaskBuilder,
          props: true,
          beforeEnter: (to, from, next) => {
            if (store.state.task.builder.steps.job === true) {
              store.commit('task/builder/setCurrentStep', 'template')
              next()
            } else {
              next({ name: 'task.builder.job', params: { id: to.params.id } })
            }
          }
        },
        {
          path: 'project/:id/task/builder/source',
          name: 'task.builder.source',
          component: TaskBuilder,
          props: true,
          beforeEnter: (to, from, next) => {
            if (store.state.task.builder.steps.template === true) {
              store.commit('task/builder/setCurrentStep', 'source')
              next()
            } else {
              next({ name: 'task.builder.template', params: { id: to.params.id } })
            }
          }
        },
        {
          path: 'project/:id/task/builder/summary',
          name: 'task.builder.summary',
          props: true,
          component: TaskBuilder,
          beforeEnter: (to, from, next) => {
            if (store.state.task.builder.steps.source === true) {
              store.commit('task/builder/setCurrentStep', 'summary')
              next()
            } else {
              next({ name: 'task.builder.source', params: { id: to.params.id } })
            }
          }
        },
        {
          path: 'flickr/callback',
          name: 'flickr.callback',
          props: true,
          component: FlickrCallback
        }
      ]
    }

  ]
})

const publicRoutes = [
  'home', 'login', 'register', 'logout', 'discover', 'about', 'project', 'project.task.presenter'
]

router.beforeEach((to, from, next) => {

  let filteredPath = to.path.split('/').filter(element => element.length > 0);
  if( filteredPath.length > 0 && filteredPath[0].length === 2 ) {
    //console.log( 'url has language: '+ to.params.lang);
    let language = to.params.lang;
    store.dispatch("settings/setLanguage", language);
    //i18n.locale = language;


    if (store.state.user.logged) {
      // user already logged (getAccountProfile already done) so he can access all the routes
      next()
    } else {
      // test if the user can be logged with his session if not already logged
      store.dispatch('user/getAccountProfile').then(() => {
        // can go next also if not logged and if the route is public
        if (store.state.user.logged || publicRoutes.includes(to.name)) {
          next()
        } else {
          // if the route needs to be logged the user is redirected
          store.commit('notification/showInfo', {
            title: 'Not authenticated',
            content: 'You must be logged to access this page'
          })
          from.name !== null ? next(false) : next({ name: 'login' })
        }
      }).catch(() => {
        next({ name: 'home' })
      })
    }



  }
  else {
    //console.log('redirect to');
    //console.log( '/'+ i18n.locale + to.path );
    //next( '/'+ i18n.locale + to.path );
  }



})

export default router
