import api from '@/api/aws'

const errors = {
  GET_BUCKET_LINKS_ERROR: 'Error during bucket links loading'
}

// all the types of data available for a task
const materials = {
  image: 'image',
  sound: 'sound',
  video: 'video',
  pdf: 'pdf',
  tweet: 'tweet'
}

// all the types of jobs available
const jobs = {
  classify: 'classify',
  describe: 'describe',
  count: 'count'
}

// the list of sources available to import links
const sources = {
  dropbox: 'dropbox',
  amazon: 'amazon',
  flickr: 'flickr'
}

// global state for this module
const state = {
  // the state of the user edited task
  task: {
    material: null, // the kind of data (image, sound, video)
    job: null, // the kind of task (classify, describe...)
    template: null, // configuration of the task
    source: null, // contains the selected source (dropbox, flickr...)
    sourceContent: null // contains the links got from the source
  },
  // steps info
  currentStep: 'material',
  steps: {
    material: false,
    job: false,
    template: false,
    source: false,
    summary: false
  },
  // global vars
  materials: materials,
  jobs: jobs,
  sources: sources,
  // available jobs for each material type
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
  },
  // available sources for each material type
  materialSources: {
    [materials.image]: [
      sources.amazon,
      sources.dropbox,
      sources.flickr
    ],
    [materials.sound]: [
      sources.amazon,
      sources.dropbox
    ],
    [materials.pdf]: [
      sources.amazon,
      sources.dropbox
    ],
    [materials.tweet]: [

    ],
    [materials.video]: [
      sources.amazon,
      sources.dropbox
    ]
  },
  // available extensions for each material type
  materialExtensions: {
    [materials.image]: [
      '.jpg', '.jpeg', '.png'
    ],
    [materials.sound]: [
      '.mp3', '.aac'
    ],
    [materials.pdf]: [
      '.pdf'
    ],
    [materials.tweet]: [

    ],
    [materials.video]: [
      '.mp4'
    ]
  },
  // aws s3 bucket
  bucket: {
    name: '',
    links: []
  },
  loaders: {
    GET_BUCKET_LINKS: 'task-builder/GET_BUCKET_LINKS'
  }
}

// filter methods on the state data
const getters = {
  getBucketLinksWithExtensions: (state) => (extensions) => {
    return state.bucket.links.filter(value => {
      for (let extension of extensions) {
        if (value.endsWith(extension)) {
          return true
        }
      }
      return false
    })
  }
}

// async methods making mutations are placed here
const actions = {
  getBucketLinks ({ state, commit }, bucketName) {
    const id = state.loaders.GET_BUCKET_LINKS
    commit('notification/showLoading', id, { root: true })

    return api.getBucketLinks(bucketName).then(value => {
      commit('notification/closeLoading', id, { root: true })
      const links = value.data.map(link => {
        return 'https://' + bucketName + '.s3.amazonaws.com/' + link
      })
      commit('setBucketLinks', links)
    }).catch(reason => {
      commit('notification/closeLoading', id, { root: true })
      commit('notification/showError', {
        title: errors.GET_BUCKET_LINKS_ERROR, content: reason
      }, { root: true })
    })
  }
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
    state.task = { ...state.task, template }
  },
  setTaskSource (state, source) {
    state.task = { ...state.task, source }
  },
  setTaskSourceContent (state, content) {
    state.task = { ...state.task, sourceContent: content }
  },
  setBucketName (state, name) {
    state.bucket = { ...state.bucket, name }
  },
  setBucketLinks (state, links) {
    state.bucket = { ...state.bucket, links }
  },
  deleteBucketLink (state, link) {
    state.bucket = {
      ...state.bucket,
      links: state.bucket.links.filter(value => {
        return value !== link
      })
    }
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
