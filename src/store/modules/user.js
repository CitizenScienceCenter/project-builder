import api from '@/api/user'

const errors = {
  GET_PROFILE_UPDATE_OPTIONS_LOADING_ERROR: 'Error during profile update options loading',
  UPDATE_PROFILE_ERROR: 'Error during profile update',
  GET_RESET_API_KEY_OPTIONS_LOADING_ERROR: 'Error during reset api key options loading',
  RESET_API_KEY_ERROR: 'Error during api key reset',
  UPDATE_PASSWORD_ERROR: 'Error during password update',
  UPDATE_AVATAR_ERROR: 'Error during avatar update',
  DELETE_ACCOUNT_ERROR: 'Error during account delete',
  EXPORT_ACCOUNT_DATA_ERROR: 'Error during account data export',
  GET_ACCOUNT_PROFILE_LOADING_ERROR: 'Impossible to get profile data',
  SIGN_OUT_ERROR: 'Impossible to sign out'
}

const state = {
  infos: {},

  logged: false,
  loginOptions: {},

  publishedProjects: [],
  contributedProjects: [],
  draftProjects: [],

  isInProfileEditionMode: false,

  profileUpdateOptions: {},
  resetApiKeyOptions: {}
}

// filter methods on the state data
const getters = {
  isLoggedUserOwnerOfProject: state => (project) => {
    return project.owner_id === state.infos.id
  }
}

// async methods making mutations are placed here
const actions = {
  signIn ({ commit, state, dispatch }, { email, password }) {
    return dispatch('getLoginOptions').then(value => {
      if (value) {
        return api.signIn(state.loginOptions.form.csrf, email, password).then(response => {
          // checks if the user is authenticated (good credentials)
          if (response.data.hasOwnProperty('status') && response.data.status === 'success') {
            commit('setLogged')
            return response.data
          }
          return false
        }).catch(reason => {
          commit('notification/showError', {
            title: 'Error during user sign in', content: reason
          }, { root: true })
          return false
        })
      }
      return false
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
      return false
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
        title: errors.GET_ACCOUNT_PROFILE_LOADING_ERROR, content: reason
      }, { root: true })
      return false
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
          content: 'You are now logged out'
        }, { root: true })
        return response.data
      }
      return false
    }).catch(reason => {
      commit('notification/showError', {
        title: errors.SIGN_OUT_ERROR, content: reason
      }, { root: true })
      return false
    })
  },

  getProfileUpdateOptions ({ commit }, user) {
    return api.getProfileUpdateOptions(user.name).then(value => {
      commit('setProfileUpdateOptions', value.data)
      return value.data
    }).catch(reason => {
      commit('notification/showError', {
        title: errors.GET_PROFILE_UPDATE_OPTIONS_LOADING_ERROR, content: reason
      }, { root: true })
      return false
    })
  },

  updateProfile ({ commit, dispatch, state }, { user, form }) {
    return dispatch('getProfileUpdateOptions', user).then(response => {
      if (response) {
        return api.updateProfile(state.profileUpdateOptions.form.csrf, user.name, form).then(value => {
          commit('notification/showSuccess', {
            title: 'Success', content: 'Your profile has been updated'
          }, { root: true })
          return value.data
        }).catch(reason => {
          commit('notification/showError', {
            title: errors.UPDATE_PROFILE_ERROR, content: reason
          }, { root: true })
          return false
        })
      }
      return false
    })
  },

  getResetApiKeyOptions ({ commit }, user) {
    return api.getResetApiKeyOptions(user.name).then(value => {
      commit('setResetApiKeyOptions', value.data)
      return value.data
    }).catch(reason => {
      commit('notification/showError', {
        title: errors.GET_RESET_API_KEY_OPTIONS_LOADING_ERROR, content: reason
      }, { root: true })
      return false
    })
  },

  resetApiKey ({ commit, dispatch, state }, user) {
    return dispatch('getResetApiKeyOptions', user).then(response => {
      if (response) {
        return api.resetApiKey(state.resetApiKeyOptions.form.csrf, user.name).then(value => {
          // get the new api key generated and display it
          dispatch('getAccountProfile').then(() => {
            commit('notification/showSuccess', {
              title: 'New API Key generated', content: state.infos.api_key
            }, { root: true })
          })
          return value.data
        }).catch(reason => {
          commit('notification/showError', {
            title: errors.RESET_API_KEY_ERROR, content: reason
          }, { root: true })
          return false
        })
      }
      return false
    })
  },

  updateAvatar ({ commit, dispatch }, { user, avatar }) {
    commit('notification/showLoading', 'user/updateAvatar', { root: true })
    return dispatch('getProfileUpdateOptions', user).then(response => {
      if (response) {
        return api.updateAvatar(state.profileUpdateOptions.form.csrf, user.name, avatar).then(value => {
          if ('status' in value.data && value.data.status === 'error') {
            commit('notification/showError', {
              title: 'Error', content: value.data.flash
            }, { root: true })
          } else {
            return dispatch('getAccountProfile').then(() => {
              commit('notification/showSuccess', {
                title: 'Success', content: value.data.flash
              }, { root: true })
              commit('notification/closeLoading', 'user/updateAvatar', { root: true })
              return value.data
            })
          }
          commit('notification/closeLoading', 'user/updateAvatar', { root: true })
          return value.data
        }).catch(reason => {
          commit('notification/showError', {
            title: errors.UPDATE_AVATAR_ERROR, content: reason
          }, { root: true })
          commit('notification/closeLoading', 'user/updateAvatar', { root: true })
          return false
        })
      }
      commit('notification/closeLoading', 'user/updateAvatar', { root: true })
      return false
    })
  },

  updatePassword ({ commit, dispatch }, { user, form }) {
    return dispatch('getProfileUpdateOptions', user).then(response => {
      if (response) {
        return api.updatePassword(state.profileUpdateOptions.form.csrf, user.name, form).then(value => {
          if ('status' in value.data && value.data.status === 'error') {

            commit('notification/showError', {
              title: 'Error', content: value.data.flash
            }, { root: true })

          } else {
            commit('notification/showSuccess', {
              title: 'Success', content: value.data.flash
            }, { root: true })
          }
          return value.data
        }).catch(reason => {
          commit('notification/showError', {
            title: errors.UPDATE_PASSWORD_ERROR, content: reason
          }, { root: true })
          return false
        })
      }
      return false
    })
  },

  deleteAccount ({ commit, dispatch }, user) {
    return api.deleteAccount(user.name).then(value => {
      commit('notification/showSuccess', {
        title: 'Success', content: 'Your account is definitively deleted'
      }, { root: true })
      dispatch('signOut')
      return true
    }).catch(reason => {
      commit('notification/showError', {
        title: errors.DELETE_ACCOUNT_ERROR, content: reason
      }, { root: true })
      return false
    })
  },

  exportAccountData ({ commit }, user) {
    return api.exportAccountData(user.name).then(value => {
      commit('notification/showSuccess', {
        title: 'Success', content: 'You will receive by email all your data...'
      }, { root: true })
      return value.data
    }).catch(reason => {
      commit('notification/showError', {
        title: errors.EXPORT_ACCOUNT_DATA_ERROR, content: reason
      }, { root: true })
      return false
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
  },
  isInProfileEditionMode (state, mode) {
    state.isInProfileEditionMode = mode
  },
  setProfileUpdateOptions (state, options) {
    state.profileUpdateOptions = options
  },
  setResetApiKeyOptions (state, options) {
    state.resetApiKeyOptions = options
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
  errors
}
