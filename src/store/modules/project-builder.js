import Vue from 'vue'

const errors = {

}

// global state for this module
const state = {
  title: '',
  shortDescription: '',
  picture: '',
  croppedPicture: '',
  cropData: {},
  story: {
    whatWhy: '',
    how: '',
    who: '',
    keepTrack: ''
  },
  currentStep: 'name',
  steps: {
    name: false,
    information: false,
    story: false
  }
}

// filter methods on the state data
const getters = {

}

// async methods making mutations are placed here
const actions = {

}

// methods that change the state
const mutations = {
  setTitle (state, title) {
    state.title = title
  },
  setPicture (state, picture) {
    state.picture = picture
  },
  setCroppedPicture (state, picture) {
    state.croppedPicture = picture
  },
  setCropData (state, data) {
    state.cropData = data
  },
  setShortDescription (state, description) {
    state.shortDescription = description
  },
  setStory (state, { whatWhy, how, who, keepTrack }) {
    state.story = {
      whatWhy, how, who, keepTrack
    }
  },
  setCurrentStep (state, step) {
    state.currentStep = step
  },
  setStep (state, { step, value }) {
    state.steps = {...state.steps, [step]: value}
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
