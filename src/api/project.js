import axios from 'axios'
import slug from 'slug'

axios.defaults.headers['Content-Type'] = 'application/json'

export default {
  getUserProjects (userInfos) {
    return axios.get(process.env.BASE_API_URL + 'project?api_key=' + userInfos.apiKey)
  },
  getAllProjects () {
    return axios.get(process.env.BASE_ENDPOINT_URL, {
      data: {}
    })
  },
  getProjectThumbnail (project) {
    const defaultThumbnail = process.env.BASE_ENDPOINT_URL + '/static/img/placeholder.project.png'

    if (typeof project !== 'undefined' && typeof project.info !== 'undefined' && typeof project.info.thumbnail !== 'undefined') {
      return project.info.thumbnail
        ? process.env.BASE_ENDPOINT_URL + 'uploads/' + (project.info.container ? project.info.container : 'user_' + project.owner_id) + '/' + project.info.thumbnail
        : defaultThumbnail
    }
    return defaultThumbnail
  },
  getProjectById (id) {
    return axios.get(process.env.BASE_API_URL + 'project/' + id, {
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
  getProjectUserProgress (projectId) {
    return axios.get(process.env.BASE_API_URL + 'project/' + projectId + '/userprogress', {
      data: {}
    })
  }
}
