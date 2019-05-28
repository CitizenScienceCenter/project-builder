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

  getTaskPresenterImportationOptions (projectShortName) {
    return axios.get(process.env.BASE_ENDPOINT_URL + 'project/' + projectShortName + '/tasks/taskpresentereditor?template=basic', {
      data: {},
      withCredentials: true
    })
  },

  saveTaskPresenter (csrf, projectShortName, editor) {
    return axios.post(process.env.BASE_ENDPOINT_URL + 'project/' + projectShortName + '/tasks/taskpresentereditor', {
      editor
    }, {
      withCredentials: true,
      headers: {
        'X-CSRFToken': csrf
      }
    })
  },

  getNewTask (projectId) {
    return axios.get(process.env.BASE_API_URL + 'project/' + projectId + '/newtask', {
      data: {}
    })
  },

  saveTaskRun (taskRun) {
    return axios.post(process.env.BASE_API_URL + 'taskrun', taskRun)
  },

  getAmazonS3TasksImportationOptions (projectShortName) {
    return axios.get(process.env.BASE_ENDPOINT_URL + 'project/' + projectShortName + '/tasks/import?type=s3', {
      data: {},
      withCredentials: true
    })
  },

  importAmazonS3Tasks (csrf, project, bucket, files) {
    return axios.post(process.env.BASE_ENDPOINT_URL + 'project/' + project.short_name + '/tasks/import?type=s3', {
      bucket: bucket,
      form_name: 's3',
      ...files.reduce((result, item, index) => {
        result['files-' + index] = item
        return result
      }, {})
    }, {
      withCredentials: true,
      headers: {
        'X-CSRFToken': csrf
      }
    })
  }
}
