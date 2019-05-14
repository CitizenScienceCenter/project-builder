import axios from 'axios'

axios.defaults.headers['Content-Type'] = 'application/json'

export default {
  getProjectTasks (project) {
    return axios.get(process.env.BASE_API_URL + 'task?project_id=' + project.id, {
      data: {}
    })
  }
}
