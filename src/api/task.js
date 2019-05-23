import axios from 'axios'

axios.defaults.headers['Content-Type'] = 'application/json'

export default {
  getProjectTasks (projectId) {
    return axios.get(process.env.BASE_API_URL + 'task?project_id=' + projectId, {
      data: {}
    })
  },
  getTaskPresenter (projectShortName) {
    return axios.get(process.env.BASE_ENDPOINT_URL + 'project/' + projectShortName + '/tasks/taskpresentereditor', {
      withCredentials: true,
      data: {}
    })
  },
  getNewTask (projectId) {
    return axios.get(process.env.BASE_API_URL + 'project/' + projectId + '/newtask', {
      data: {}
    })
  },
  saveTaskRun (taskRun) {
    return axios.post(process.env.BASE_API_URL + 'taskrun', taskRun)
  }
}
