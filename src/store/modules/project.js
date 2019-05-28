import api from '../../api/project'
import builder from './project-builder'

const errors = {
  GET_ALL_PROJECTS_LOADING_ERROR: 'Error during projects loading',
  GET_USER_PROJECTS_LOADING_ERROR: 'Error during user projects loading',
  GET_PROJECT_LOADING_ERROR: 'Error during project loading',
  POST_PROJECT_ERROR: 'Error during project creation',
  GET_PROJECT_USER_PROGRESS_LOADING_ERROR: 'Error during project user progress loading',
  GET_FEATURED_PROJECTS_LOADING_ERROR: 'Error during featured projects loading',
  GET_CATEGORIES_LOADING_ERROR: 'Error during categories loading',
  UPLOAD_PROJECT_AVATAR_ERROR: 'Error during project avatar upload',
  GET_PROJECT_UPDATE_OPTIONS_LOADING_ERROR: 'Error during project update options loading',
  GET_PUBLISH_PROJECT_OPTIONS_LOADING_ERROR: 'Error during project publish options loading',
  PUBLISH_PROJECT_ERROR: 'Error during project publishing',
  GET_PROJECT_STATS_LOADING_ERROR: 'Error during project stats loading'
}

// global state for this module

const state = {
  // project lists
  categories: [],
  projects: [],
  featuredProjects: [],
  userProjects: [],

  // selected project data
  selectedProject: {},
  selectedProjectUserProgress: { done: 0, total: 0 },
  selectedProjectStats: {},

  // form options
  projectCreationOptions: {},
  projectUpdateOptions: {},
  publishProjectOptions: {}
}

// filter methods on the state data
const getters = {
  getProjectsWithCategory: state => ({id}) => {
    return state.projects.filter(project => {
      return project.category_id === id
    })
  },
  getUserProgressInPercent: state => {
    return state.selectedProjectUserProgress.done / state.selectedProjectUserProgress.total * 100
  }
}

// async methods making mutations are placed here
const actions = {

  getUserProjects ({ commit, rootState }) {
    return api.getUserProjects(rootState.user.infos.api_key).then(value => {
      commit('setUserProjects', value.data)
      return value.data
    }).catch(reason => {
      commit('notification/showError', {
        title: errors.GET_USER_PROJECTS_LOADING_ERROR, content: reason
      }, { root: true })
    })
  },

  getCategories ({ commit }) {
    return api.getCategories().then(value => {
      commit('setCategories', value.data)
      return value.data
    }).catch(reason => {
      commit('notification/showError', {
        title: errors.GET_FEATURED_PROJECTS_LOADING_ERROR, content: reason
      }, { root: true })
    })
  },

  getAllProjects ({ commit }) {
    return api.getAllProjects().then(value => {
      commit('setProjects', value.data)
      return value.data
    }).catch(reason => {
      commit('notification/showError', {
        title: errors.GET_ALL_PROJECTS_LOADING_ERROR, content: reason
      }, { root: true })
      return false
    })
  },

  getFeaturedProjects ({ commit }) {
    return api.getFeaturedProjects().then(value => {
      commit('setFeaturedProjects', value.data.projects)
      return value.data
    }).catch(reason => {
      commit('notification/showError', {
        title: errors.GET_FEATURED_PROJECTS_LOADING_ERROR, content: reason
      }, { root: true })
    })
  },

  getProject ({ commit, state, rootState }, id) {
    return api.getProjectById(id, rootState.user.infos.api_key).then(value => {
      commit('setSelectedProject', value.data)
      return state.selectedProject
    }).catch(reason => {
      commit('notification/showError', {
        title: errors.GET_PROJECT_LOADING_ERROR, content: reason
      }, { root: true })
      return false
    })
  },

  createProject ({ commit, state, rootState }, builder) {
    return api.createProject(rootState.user.infos.api_key, builder).then(value => {
      commit('setSelectedProject', value.data)
      return state.selectedProject
    }).catch(reason => {
      commit('notification/showError', {
        title: errors.POST_PROJECT_ERROR, content: reason
      }, { root: true })
      return false
    })
  },

  getUserProgress ({ commit }, project) {
    return api.getProjectUserProgress(project.id).then(value => {
      commit('setSelectedProjectUserProgress', value.data)
      return value.data
    }).catch(reason => {
      commit('notification/showError', {
        title: errors.GET_PROJECT_USER_PROGRESS_LOADING_ERROR, content: reason
      }, { root: true })
      return false
    })
  },

  getProjectUpdateOptions ({ commit }, project) {
    return api.getProjectUpdateOptions(project.short_name).then(value => {
      commit('setProjectUpdateOptions', value.data)
      return value.data
    }).catch(reason => {
      commit('notification/showError', {
        title: errors.GET_PROJECT_UPDATE_OPTIONS_LOADING_ERROR, content: reason
      }, { root: true })
      return false
    })
  },

  uploadAvatar ({ commit, state, dispatch }, { project, image }) {
    return dispatch('getProjectUpdateOptions', project).then(response => {
      if (response) {
        return api.uploadAvatar(state.projectUpdateOptions.upload_form.csrf, project.short_name, image).then(value => {
          // nothing to commit
          return value.data
        }).catch(reason => {
          commit('notification/showError', {
            title: errors.UPLOAD_PROJECT_AVATAR_ERROR, content: reason
          }, { root: true })
          return false
        })
      }
      return false
    })
  },

  getPublishProjectOptions ({ commit }, project) {
    return api.getPublishProjectOptions(project.short_name).then(value => {
      commit('setPublishProjectOptions', value.data)
      return value.data
    }).catch(reason => {
      commit('notification/showError', {
        title: errors.GET_PUBLISH_PROJECT_OPTIONS_LOADING_ERROR, content: reason
      }, { root: true })
      return false
    })
  },

  publishProject ({ commit, state, dispatch }, project) {
    return dispatch('getPublishProjectOptions', project).then(response => {
      if (response) {
        return api.publishProject(state.publishProjectOptions.csrf, project.short_name).then(value => {
          commit('updateSelectedProject', { published: true })
          commit('notification/showSuccess', {
            title: 'Project published!', content: 'The project ' + project.name + ' is now public'
          }, { root: true })
          return value.data
        }).catch(reason => {
          commit('notification/showError', {
            title: errors.PUBLISH_PROJECT_ERROR, content: reason
          }, { root: true })
          return false
        })
      }
      return false
    })
  },

  getStatistics ({ commit }, project) {
    return api.getStatistics(project.short_name).then(value => {
      commit('setSelectedProjectStats', value.data)
      return value.data
    }).catch(reason => {
      commit('notification/showError', {
        title: errors.GET_PROJECT_STATS_LOADING_ERROR, content: reason
      }, { root: true })
      return false
    })
  }
}

// methods that change the state
const mutations = {
  setCategories (state, categories) {
    state.categories = categories
  },
  setProjects (state, projects) {
    state.projects = projects
  },
  setFeaturedProjects (state, projects) {
    state.featuredProjects = projects
  },
  setUserProjects (state, projects) {
    state.userProjects = projects
  },
  setSelectedProject (state, project) {
    state.selectedProject = project
  },
  updateSelectedProject (state, projectData) {
    state.selectedProject = { ...state.selectedProject, ...projectData }
  },
  setSelectedProjectUserProgress (state, progress) {
    state.selectedProjectUserProgress = progress
  },
  setProjectUpdateOptions (state, options) {
    state.projectUpdateOptions = options
  },
  setPublishProjectOptions (state, options) {
    state.publishProjectOptions = options
  },
  setSelectedProjectStats (state, stats) {
    state.selectedProjectStats = stats
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
