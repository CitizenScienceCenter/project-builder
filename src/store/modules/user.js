import api from '@/api/user'

const state = {
  infos: {
    id: 2,
    apiKey: '3120c4af-757b-4958-8ab9-9765c88f8d56'
  },
  logged: false,
  authOptions: {}
}

// filter methods on the state data
const getters = {
  getCsrfToken: state => {
    return !!state.authOptions.form && !!state.authOptions.form.csrf ? state.authOptions.form.csrf : 'CSRF NOT AVAILABLE'
  }
}

// async methods making mutations are placed here
const actions = {
  signIn ({ commit, state }, { email, password }) {
    api.signIn({ email, password, csrf: state.authOptions.form.csrf }).then(value => {
      commit('setLogged')
    }).catch(reason => {
      commit('notification/showError', {
        title: 'Error during user sign in', content: reason
      }, { root: true })
    })
  },
  getAuthOptions ({ commit }) {
    api.getAuthOptions().then(value => {
      commit('setAuthOptions', value.data)
    }).catch(reason => {
      commit('notification/showError', {
        title: 'Signin not available', content: reason
      }, { root: true })
    })
  }
}

// methods that change the state
const mutations = {
  setLogged (state) {
    state.logged = true
  },
  setAuthOptions (state, options) {
    state.authOptions = options
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
