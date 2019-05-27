import axios from 'axios'

axios.defaults.headers['Content-Type'] = 'application/json'

export default {
  signIn ({ email, password, csrf }) {
    return axios.post(process.env.BASE_ENDPOINT_URL + 'account/signin', {
      email, password, csrf: csrf
    }, {
      withCredentials: true,
      headers: {
        'X-CSRFToken': csrf
      }
    })
  },
  getLoginOptions () {
    return axios.get(process.env.BASE_ENDPOINT_URL + 'account/signin', {
      data: {},
      withCredentials: true
    })
  },
  getAccountProfile () {
    return axios.get(process.env.BASE_ENDPOINT_URL + 'account/profile', {
      data: {},
      withCredentials: true
    })
  },
  signOut () {
    return axios.get(process.env.BASE_ENDPOINT_URL + 'account/signout', {
      data: {},
      withCredentials: true
    })
  }
}
