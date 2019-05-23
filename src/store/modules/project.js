import api from '../../api/project'
import builder from './project-builder'

const errors = {
  GET_ALL_PROJECTS_LOADING_ERROR: 'Error during projects loading',
  GET_USER_PROJECTS_LOADING_ERROR: 'Error during user projects loading',
  GET_PROJECT_LOADING_ERROR: 'Error during project loading',
  POST_PROJECT_ERROR: 'Error during project creation',
  GET_PROJECT_USER_PROGRESS_LOADING_ERROR: 'Error during project user progress loading'
}

// global state for this module

const state = {
  userProjects: [],
  categories: [],
  categoriesProjects: {},
  topProjects: [],

  selectedProject: {},
  selectedProjectUserProgress: { done: 0, total: 0 },

  projectCreationOptions: {}
}

// filter methods on the state data
const getters = {
  thumbnail: () => project => {
    return api.getProjectThumbnail(project)
  },
  getProjectsFor: state => category => {
    return state.categoriesProjects[category.short_name]
  },
  getFeaturedProjects: state => {
    let featuredProjects = []

    if (state.categoriesProjects) {
      featuredProjects = Object.values(state.categoriesProjects).reduce((previousValue, currentValue) => {
        let result = currentValue.filter(project => {
          return project.featured
        })
        return previousValue.concat(result)
      }, [])
    }
    return featuredProjects
  },
  getUserProgressInPercent: state => {
    return state.selectedProjectUserProgress.done / state.selectedProjectUserProgress.total * 100
  }
}

// async methods making mutations are placed here
const actions = {
  getAllPublishedProjects ({ commit }) {
    api.getAllProjects().then(value => {
      commit('setProjects', value.data)
    }).catch(reason => {
      commit('notification/showError', {
        title: errors.GET_ALL_PROJECTS_LOADING_ERROR, content: reason
      }, { root: true })
    })
  },
  getUserProjects ({ commit, rootState }) {
    api.getUserProjects(rootState.user.infos).then(value => {
      commit('setUserProjects', value.data)
    }).catch(reason => {
      commit('notification/showError', {
        title: errors.GET_USER_PROJECTS_LOADING_ERROR, content: reason
      }, { root: true })
    })
  },
  getProject ({ commit, state, rootState }, id) {
    return api.getProjectById(id).then(value => {
      commit('setSelectedProject', value.data)
      return state.selectedProject
    }).catch(reason => {
      commit('notification/showError', {
        title: errors.GET_PROJECT_LOADING_ERROR, content: reason
      }, { root: true })
    })
  },
  createProject ({ commit, state, rootState }, builder) {
    return api.createProject(rootState.user.infos.apiKey, builder).then(value => {
      commit('setSelectedProject', value.data)
      return state.selectedProject
    }).catch(reason => {
      commit('notification/showError', {
        title: errors.POST_PROJECT_ERROR, content: reason
      }, { root: true })
      return false
    })
  },
  getProjectCreationOptions ({ commit, state, rootState }) {
    return api.getProjectCreationOptions().then(value => {
      commit.setProjectCreationOptions(value.data)
      console.log(value.data)
    })
  },
  getUserProgress ({ commit }, project) {
    return api.getProjectUserProgress(project.id).then(value => {
      commit('setSelectedProjectUserProgress', value.data)
    }).catch(reason => {
      commit('notification/showError', {
        title: errors.GET_PROJECT_USER_PROGRESS_LOADING_ERROR, content: reason
      }, { root: true })
    })
  }
}

// methods that change the state
const mutations = {
  setProjects (state, features) {
    state.categoriesProjects = features.categories_projects
    state.categories = features.categories
    state.topProjects = features.top_projects
  },
  setUserProjects (state, projects) {
    state.userProjects = projects
  },
  setSelectedProject (state, project) {
    state.selectedProject = project
  },
  setProjectCreationOptions (state, options) {
    state.projectCreationOptions = options
  },
  setSelectedProjectUserProgress (state, progress) {
    state.selectedProjectUserProgress = progress
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
  errors,
  modules: {
    builder
  }
}
