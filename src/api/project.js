import axios from 'axios'
import slug from 'slug'

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
  getProjectsWithCategory ({ id }) {
    return axios.get(process.env.BASE_API_URL + 'project?category_id=' + id)
  },
  getProjectById (id, apiKey) {
    return axios.get(process.env.BASE_API_URL + 'project/' + id + '?api_key=' + apiKey, {
      data: {}
    })
  },
  // eslint-disable-next-line camelcase
  getUserProjects ({ api_key }) {
    // eslint-disable-next-line camelcase
    return axios.get(process.env.BASE_API_URL + 'project?api_key=' + api_key)
  },
  getProjectUserProgress (projectId) {
    return axios.get(process.env.BASE_API_URL + 'project/' + projectId + '/userprogress', {
      data: {}
    })
  },
  // getProjectThumbnail (project) {
  //   const defaultThumbnail = process.env.BASE_ENDPOINT_URL + '/static/img/placeholder.project.png'
  //
  //   if (typeof project !== 'undefined' && typeof project.info !== 'undefined' && typeof project.info.thumbnail !== 'undefined') {
  //     return project.info.thumbnail
  //       ? process.env.BASE_ENDPOINT_URL + 'uploads/' + (project.info.container ? project.info.container : 'user_' + project.owner_id) + '/' + project.info.thumbnail
  //       : defaultThumbnail
  //   }
  //   return defaultThumbnail
  // },
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
  }
}
