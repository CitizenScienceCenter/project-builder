import api from '@/api/task'
import builder from './task-builder'

const errors = {
  GET_PROJECT_TASKS_LOADING_ERROR: 'Error during project tasks loading',
  GET_PROJECT_TASK_PRESENTER_LOADING_ERROR: 'Error during project task presenter loading',
  GET_CURRENT_TASK_LOADING_ERROR: 'Error during current task loading',
  POST_TASK_RUN_ERROR: 'Error when saving the task run'
}

const state = {
  projectTasks: [],
  taskPresenter: '',
  // the current task showed in the task presenter
  currentTask: {}
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
    api.getTaskPresenter(project.short_name).then(value => {
      commit('setTaskPresenter', value.data.form.editor)
    }).catch(reason => {
      commit('notification/showError', {
        title: errors.GET_PROJECT_TASK_PRESENTER_LOADING_ERROR, content: reason
      }, { root: true })
    })
  },
  getNewTask ({ commit, rootState }, project) {
    return api.getNewTask(project.id).then(value => {
      commit('setCurrentTask', value)
      return value
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
