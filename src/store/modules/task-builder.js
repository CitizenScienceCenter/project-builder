const errors = {

}

const materials = {
  image: 'image',
  sound: 'sound',
  video: 'video',
  pdf: 'pdf',
  tweet: 'tweet'
}

const jobs = {
  classify: 'classify',
  describe: 'describe',
  count: 'count'
}

// global state for this module
const state = {
  task: {
    material: null, // the kind of data (image, sound, video)
    job: null, // the kind of task (classify, describe...)
    template: null, // configuration of the task
    source: null // selected source
  },
  currentStep: 'material',
  steps: {
    material: false,
    job: false,
    template: false,
    source: false,
    summary: false
  },
  materials: materials,
  jobs: jobs,
  materialJobs: {
    [materials.image]: [
      jobs.classify,
      jobs.describe,
      jobs.count
    ],
    [materials.sound]: [
      jobs.classify,
      jobs.describe
    ],
    [materials.pdf]: [
      jobs.describe
    ],
    [materials.tweet]: [
      jobs.classify,
      jobs.describe
    ],
    [materials.video]: [
      jobs.classify,
      jobs.describe
    ]
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
  setCurrentStep (state, step) {
    state.currentStep = step
  },
  setStep (state, { step, value }) {
    state.steps = { ...state.steps, [step]: value }
  },
  setTaskMaterial (state, material) {
    state.task = { ...state.task, material }
  },
  setTaskJob (state, job) {
    state.task = { ...state.task, job }
  },
  setTaskTemplate (state, template) {
    state.task.template = template
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
