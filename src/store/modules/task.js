import api from '@/api/task'
import builder from './task-builder'

import { buildTemplateFromModel } from '@/helper'

import ImageTemplate from '@/components/Task/Template/Image/ImageCountTemplate'
import BasicTemplate from '@/components/Task/Template/BasicTemplate'

const errors = {
  GET_PROJECT_TASKS_LOADING_ERROR: 'Error during project tasks loading',
  GET_PROJECT_TASK_PRESENTER_LOADING_ERROR: 'Error during project task presenter loading',
  GET_CURRENT_TASK_LOADING_ERROR: 'Error during current task loading',
  POST_TASK_RUN_ERROR: 'Error when saving the task run',
  GET_AMAZON_S3_IMPORTER_OPTIONS_LOADING_ERROR: 'Error when loading amazon s3 options',
  POST_AMAZON_S3_TASKS_ERROR: 'Error when importing amazon s3 tasks',
  GET_TASK_PRESENTER_IMPORTATION_OPTIONS_LOADING_ERROR: 'Error when loading task presenter importation options',
  POST_TASK_PRESENTER_ERROR: 'Error during task presenter importation'
}

const state = {
  // tasks list of the selected project
  projectTasks: [],

  usingTemplate: null,

  // the currently loaded task presenter
  taskPresenter: '',

  // the current task showed in the task presenter
  currentTask: {
    info: {}
  },

  templates: {
    basic: 'basic',
    sound: 'sound',
    image: 'image',
    video: 'video',
    geocoding: 'geocoding',
    document: 'document'
  },

  // contain data required to send forms
  taskPresenterImportationOptions: {},
  amazonS3TasksImportationOptions: {}
}

// filter methods on the state data
const getters = {

}

// async methods making mutations are placed here
const actions = {
  getProjectTasks ({ commit }, project) {
    return api.getProjectTasks(project.id).then(value => {
      commit('setProjectTasks', value.data)
      return value.data
    }).catch(reason => {
      commit('notification/showError', {
        title: errors.GET_PROJECT_TASKS_LOADING_ERROR, content: reason
      }, { root: true })
      return false
    })
  },

  getTaskPresenter ({ commit, state }, { project, template }) {
    if (template === null) {
      return api.getTaskPresenter(project.short_name).then(value => {
        // checks if a task presenter is already set
        if (value.data.hasOwnProperty('form') && value.data.form.hasOwnProperty('editor')) {
          commit('setTaskPresenter', value.data.form.editor)
          return value.data
        }
        return false
      }).catch(reason => {
        commit('notification/showError', {
          title: errors.GET_PROJECT_TASK_PRESENTER_LOADING_ERROR, content: reason
        }, { root: true })
        return false
      })
    } else {
      switch (template) {
        case state.templates.image:
          commit('setTaskPresenter', buildTemplateFromModel(ImageTemplate, {}))
          break
        case state.templates.sound:
          break
        case state.templates.video:
          break
        case state.templates.document:
          break
        case state.templates.geocoding:
          break
        default:
          commit('setTaskPresenter', buildTemplateFromModel(BasicTemplate, {}))
          break
      }
      return true
    }
  },

  getTaskPresenterImportationOptions ({ commit }, project) {
    return api.getTaskPresenterImportationOptions(project.short_name).then(value => {
      commit('setTaskPresenterImportationOptions', value.data)
      return value.data
    }).catch(reason => {
      commit('notification/showError', {
        title: errors.GET_TASK_PRESENTER_IMPORTATION_OPTIONS_LOADING_ERROR, content: reason
      }, { root: true })
      return false
    })
  },

  saveTaskPresenter ({ commit, state, dispatch }, { project, template }) {
    return dispatch('getTaskPresenterImportationOptions', project).then(response => {
      if (response) {
        return api.saveTaskPresenter(
          state.taskPresenterImportationOptions.form.csrf,
          project.short_name,
          template
        ).then(value => {
          if ('status' in value.data && value.data.status === 'success') {
            commit('setTaskPresenter', template)
            return value.data
          }
          return false
        }).catch(reason => {
          commit('notification/showError', {
            title: errors.POST_TASK_PRESENTER_ERROR, content: reason
          }, { root: true })
          return false
        })
      }
      return false
    })
  },

  getNewTask ({ commit, rootState }, project) {
    return api.getNewTask(project.id).then(value => {
      commit('setCurrentTask', value.data)
      return value.data
    }).catch(reason => {
      commit('notification/showError', {
        title: errors.GET_CURRENT_TASK_LOADING_ERROR, content: reason
      }, { root: true })
      return false
    })
  },

  saveTaskRun ({ commit }, taskRun) {
    return api.saveTaskRun(taskRun).then(value => {
      // no commit
      return value.data
    }).catch(reason => {
      commit('notification/showError', {
        title: errors.POST_TASK_RUN_ERROR, content: reason
      }, { root: true })
      return false
    })
  },

  getAmazonS3TasksImportationOptions ({ commit }, project) {
    return api.getAmazonS3TasksImportationOptions(project.short_name).then(value => {
      commit('setAmazonS3TasksImportationOptions', value.data)
      return value.data
    }).catch(reason => {
      commit('notification/showError', {
        title: errors.GET_AMAZON_S3_IMPORTER_OPTIONS_LOADING_ERROR, content: reason
      }, { root: true })
      return false
    })
  },

  importAmazonS3Tasks ({ commit, state, dispatch }, { project, bucket, files }) {
    return dispatch('getAmazonS3TasksImportationOptions', project).then(response => {
      if (response) {
        return api.importAmazonS3Tasks(
          state.amazonS3TasksImportationOptions.form.csrf,
          project,
          bucket,
          files
        ).then(value => {
          // no commit required
          return value.data
        }).catch(reason => {
          commit('notification/showError', {
            title: errors.POST_AMAZON_S3_TASKS_ERROR, content: reason
          }, { root: true })
          return false
        })
      }
      return false
    })
  }
}

// methods that change the state
const mutations = {
  setProjectTasks (state, tasks) {
    state.projectTasks = tasks
  },
  setTaskPresenter (state, presenter) {
    state.taskPresenter = presenter
  },
  setCurrentTask (state, task) {
    state.currentTask = task
  },
  setAmazonS3TasksImportationOptions (state, options) {
    state.amazonS3TasksImportationOptions = options
  },
  setTaskPresenterImportationOptions (state, options) {
    state.taskPresenterImportationOptions = options
  },
  setUsingTemplate (state, template) {
    state.usingTemplate = template
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
  modules: {
    builder
  }
}
