import axios from 'axios'
import slug from 'slug'
import { dataURItoBlob } from '@/helper'

axios.defaults.headers['Content-Type'] = 'application/json'

export default {
  getCategories () {
    return axios.get(process.env.BASE_API_URL + 'category')
  },

  getAllProjects () {
    return axios.get(process.env.BASE_API_URL + 'project')
  },

  getFeaturedProjects () {
    return axios.get(process.env.BASE_ENDPOINT_URL + 'project/category/featured/', {
      data: {},
      withCredentials: true
    })
  },

  getProjectsWithCategory (categoryId) {
    return axios.get(process.env.BASE_API_URL + 'project?category_id=' + categoryId)
  },

  getProjectById (id, apiKey) {
    return axios.get(process.env.BASE_API_URL + 'project/' + id + '?api_key=' + apiKey, {
      data: {}
    })
  },

  // eslint-disable-next-line camelcase
  getUserProjects (apiKey) {
    // eslint-disable-next-line camelcase
    return axios.get(process.env.BASE_API_URL + 'project?api_key=' + apiKey)
  },

  getProjectUserProgress (projectId) {
    return axios.get(process.env.BASE_API_URL + 'project/' + projectId + '/userprogress', {
      data: {}
    })
  },

  getProjectCreationOptions () {
    return axios.get(process.env.BASE_ENDPOINT_URL + 'project/new', {
      data: {}
    })
  },

  createProject (apiKey, { name, shortDescription, longDescription }) {
    return axios.post(process.env.BASE_API_URL + 'project?api_key=' + apiKey, {
      name: name,
      short_name: slug(name, { lower: true, replacement: '_' }),
      description: shortDescription,
      long_description: longDescription
    })
  },

  getProjectUpdateOptions (projectShortName) {
    return axios.get(process.env.BASE_ENDPOINT_URL + 'project/' + projectShortName + '/update', {
      data: {},
      withCredentials: true
    })
  },

  uploadAvatar (csrf, projectShortName, file) {
    const formData = new FormData()
    formData.append('btn', 'Upload')
    formData.append('avatar', dataURItoBlob(file))

    return axios.post(process.env.BASE_ENDPOINT_URL + 'project/' + projectShortName + '/update?response_format=json', formData, {
      withCredentials: true,
      headers: {
        'Content-Type': 'multipart/form-data',
        'X-CSRFToken': csrf
      }
    })
  }
}
