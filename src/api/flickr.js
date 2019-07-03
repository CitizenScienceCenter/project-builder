import axios from 'axios'

axios.defaults.headers['Content-Type'] = 'application/json'

export default {
  getAlbums () {
    return axios.get(process.env.BASE_ENDPOINT_URL + 'flickr/albums', {
      data: {},
      withCredentials: true
    })
  }
}
