import axios from 'axios'

export default {
  getProjects () {
    return axios.get(process.env.BASE_API_URL + 'project?api_key=' + process.env.API_KEY, {
      responseType: 'json'
    })
  }
}
