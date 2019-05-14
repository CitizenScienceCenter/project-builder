import axios from 'axios'

axios.defaults.headers['Content-Type'] = 'application/json'

export default {
  signIn ({ email, password, csrf }) {
    return axios.post(process.env.BASE_ENDPOINT_URL + 'account/signin', {
      email, password
    }, {
      headers: {
        'X-CSRFToken': csrf
      }
    })
  },
  getAuthOptions () {
    return axios.get(process.env.BASE_ENDPOINT_URL + 'account/signin', {
      data: {}
    })
  },

}
