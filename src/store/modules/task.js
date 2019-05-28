import api from '@/api/task'
import builder from './task-builder'

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

  // the currently loaded task presenter
  taskPresenter: '',

  // the current task showed in the task presenter
  currentTask: {},

  // contain data required to send froms
  taskPresenterImportationOptions: {},
  amazonS3TasksImportationOptions: {}
}

// filter methods on the state data
const getters = {

}

// async methods making mutations are placed here
const actions = {
  getProjectTasks ({ commit }, project) {
    api.getProjectTasks(project.id).then(value => {
      commit('setProjectTasks', value.data)
    }).catch(reason => {
      commit('notification/showError', {
        title: errors.GET_PROJECT_TASKS_LOADING_ERROR, content: reason
      }, { root: true })
    })
  },
  getTaskPresenter ({ commit }, project) {
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
  saveTaskPresenter ({ commit, state }, {project, template}) {
    return api.saveTaskPresenter(
      state.taskPresenterImportationOptions.form.csrf,
      project.short_name,
      template
    ).then(value => {
      return value.data
    }).catch(reason => {
      commit('notification/showError', {
        title: errors.POST_TASK_PRESENTER_ERROR, content: reason
      }, { root: true })
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
    })
  },
  saveTaskRun ({ commit }, taskRun) {
    return api.saveTaskRun(taskRun).then(value => {
      return value.data
    }).catch(reason => {
      commit('notification/showError', {
        title: errors.POST_TASK_RUN_ERROR, content: reason
      }, { root: true })
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
  importAmazonS3Tasks ({ commit, state }, { project, bucket, links }) {
    return api.importAmazonS3Tasks(
      state.amazonS3TasksImportationOptions.form.csrf,
      project,
      bucket,
      links
    ).then(value => {
      return value.data
    }).catch(reason => {
      commit('notification/showError', {
        title: errors.POST_AMAZON_S3_TASKS_ERROR, content: reason
      }, { root: true })
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
