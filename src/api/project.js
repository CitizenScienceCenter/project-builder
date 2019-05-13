import axios from 'axios'

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
    return project.info.thumbnail ? process.env.BASE_ENDPOINT_URL + 'uploads/' + (project.info.container ? project.info.container : 'user_' + project.owner_id) + '/' + project.info.thumbnail
      : process.env.BASE_ENDPOINT_URL + '/static/img/placeholder.project.png'
  }
}
