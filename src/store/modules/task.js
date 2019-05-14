import api from '@/api/task'

const errors = {
  GET_PROJECT_TASKS_LOADING_ERROR: 'Error during project tasks loading'
}

const state = {
  selectedProjectTasks: []
}

// filter methods on the state data
const getters = {

}

// async methods making mutations are placed here
const actions = {
  getProjectTasks ({ commit }, project) {
    api.getProjectTasks(project).then(value => {
      commit('setSelectedProjectTasks', value.data)
    }).catch(reason => {
      commit('notification/showError', {
        title: errors.GET_PROJECT_TASKS_LOADING_ERROR, content: reason
      }, { root: true })
    })
  }
}

// methods that change the state
const mutations = {
  setSelectedProjectTasks (state, tasks) {
    state.selectedProjectTasks = tasks
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
