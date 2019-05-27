import api from '@/api/user'

const state = {
  infos: {},
  logged: false,
  loginOptions: {},
  publishedProjects: [],
  contributedProjects: [],
  draftProjects: []
}

// filter methods on the state data
const getters = {
  // getCsrfToken: state => {
  //   return !!state.loginOptions.form && !!state.loginOptions.form.csrf ? state.loginOptions.form.csrf : 'CSRF NOT AVAILABLE'
  // }
}

// async methods making mutations are placed here
const actions = {
  signIn ({ commit, state }, { email, password }) {
    return api.signIn({ email, password, csrf: state.loginOptions.form.csrf }).then(response => {
      if (response.data.hasOwnProperty('status') && response.data.status === 'success') {
        commit('setLogged')
        return response.data
      }
      return false
    }).catch(reason => {
      commit('notification/showError', {
        title: 'Error during user sign in', content: reason
      }, { root: true })
    })
  },
  getLoginOptions ({ commit }) {
    return api.getLoginOptions().then(value => {
      commit('setLoginOptions', value.data)
      return value.data
    }).catch(reason => {
      commit('notification/showError', {
        title: 'Sign in not available', content: reason
      }, { root: true })
    })
  },
  getAccountProfile ({ commit }) {
    return api.getAccountProfile().then(value => {
      if (value.data.hasOwnProperty('user')) {
        commit('setUserInfos', value.data.user)
        commit('setUserContributedProjects', value.data.projects_contrib)
        commit('setUserDraftProjects', value.data.projects_draft)
        commit('setUserPublishedProjects', value.data.projects_published)
        commit('setLogged')
        return value.data
      }
      commit('setLoggedOut')
      return false
    }).catch(reason => {
      commit('notification/showError', {
        title: 'Impossible to get profile data', content: reason
      }, { root: true })
    })
  },
  signOut ({ commit }) {
    return api.signOut().then(response => {
      if (response.data.hasOwnProperty('status') && response.data.status === 'success') {
        commit('setLoggedOut')
        commit('setUserInfos', {})
        commit('setUserContributedProjects', [])
        commit('setUserDraftProjects', [])
        commit('setUserPublishedProjects', [])
        commit('notification/showInfo', {
          title: 'Signed out',
          content: 'Your are now logged out'
        }, { root: true })
        return response.data
      }
      return false
    }).catch(reason => {
      commit('notification/showError', {
        title: 'Impossible to sign out', content: reason
      }, { root: true })
    })
  }
}

// methods that change the state
const mutations = {
  setLogged (state) {
    state.logged = true
  },
  setLoggedOut (state) {
    state.logged = false
  },
  setLoginOptions (state, options) {
    state.loginOptions = options
  },
  setUserInfos (state, infos) {
    state.infos = infos
  },
  setUserContributedProjects (state, projects) {
    state.contributedProjects = projects
  },
  setUserDraftProjects (state, projects) {
    state.draftProjects = projects
  },
  setUserPublishedProjects (state, projects) {
    state.publishedProjects = projects
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
