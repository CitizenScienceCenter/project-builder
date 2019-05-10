import { uuid } from '@/helper'

const state = {
  errorNotifications: [],
  infoNotifications: [],
  successNotifications: []
}

// filter methods on the state data
const getters = {
  // isDisplayed: (state) => (message) => {
  //   return state.errorMessages.find(value => {
  //     return value === message
  //   }) !== null
  // }
}

// async methods making mutations are placed here
const actions = {

}

// methods that change the state
const mutations = {
  showError (state, {title, content}) {
    state.errorNotifications.push({ id: uuid(), message: {title, content} })
  },
  closeError (state, id) {
    state.errorNotifications = state.errorNotifications.filter(value => {
      return value.id !== id
    })
  },
  showSuccess (state, {title, content}) {
    state.successNotifications.push({ id: uuid(), message: {title, content} })
  },
  closeSuccess (state, id) {
    state.successNotifications = state.successNotifications.filter(value => {
      return value.id !== id
    })
  },
  showInfo (state, {title, content}) {
    state.infoNotifications.push({ id: uuid(), message: {title, content} })
  },
  closeInfo (state, id) {
    state.infoNotifications = state.infoNotifications.filter(value => {
      return value.id !== id
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
