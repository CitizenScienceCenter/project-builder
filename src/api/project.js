import axios from 'axios'

export default {
  getProjects () {
    return axios.get(process.env.BASE_API_URL + 'project?api_key=' + process.env.API_KEY, {
      responseType: 'json'
    })
  },
  getProjectThumbnail (project) {
    return process.env.BASE_ENDPOINT_URL + 'uploads/user_' + project.owner_id + '/' + project.info.thumbnail
  }
}
