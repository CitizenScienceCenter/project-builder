import axios from 'axios'

axios.defaults.headers['Content-Type'] = 'application/json'

export default {
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
  },

  getGoogleDocsTasksImportationOptions (projectShortName) {
    return axios.get(process.env.BASE_ENDPOINT_URL + 'project/' + projectShortName + '/tasks/import?type=gdocs', {
      data: {},
      withCredentials: true
    })
  },

  importGoogleDocsTasks (csrf, projectShortName, link) {
    return axios.post(process.env.BASE_ENDPOINT_URL + 'project/' + projectShortName + '/tasks/import?type=gdocs', {
      googledocs_url: link
    }, {
      withCredentials: true,
      headers: {
        'X-CSRFToken': csrf
      }
    })
  },

  getLocalCsvTasksImportationOptions (projectShortName) {
    return axios.get(process.env.BASE_ENDPOINT_URL + 'project/' + projectShortName + '/tasks/import?type=localCSV', {
      data: {},
      withCredentials: true
    })
  },

  importLocalCsvTasks (csrf, projectShortName, file) {
    const data = new FormData()
    data.append('file', file)

    return axios.post(process.env.BASE_ENDPOINT_URL + 'project/' + projectShortName + '/tasks/import?type=localCSV&response_format=json', data, {
      withCredentials: true,
      headers: {
        'Content-Type': 'multipart/form-data',
        'X-CSRFToken': csrf
      }
    })
  },

  getOnlineCsvTasksImportationOptions (projectShortName) {
    return axios.get(process.env.BASE_ENDPOINT_URL + 'project/' + projectShortName + '/tasks/import?type=csv', {
      data: {},
      withCredentials: true
    })
  },

  importOnlineCsvTasks (csrf, projectShortName, link) {
    return axios.post(process.env.BASE_ENDPOINT_URL + 'project/' + projectShortName + '/tasks/import?type=csv', {
      csv_url: link
    }, {
      withCredentials: true,
      headers: {
        'X-CSRFToken': csrf
      }
    })
  }

}
