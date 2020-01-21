import axios from 'axios'
import config from '@/services/config'

export default {

  get: ({path, headers}) => {
    let host = config.get({key: 'app_host'})
    let url = `${host}${path}`
    let opts = {
      method: 'GET',
      url,
      headers,
    }
    return axios(opts)
  },

  post: ({path, data, headers}) => {
    let host = config.get({key: 'app_host'})
    let url = `${host}${path}`
    let opts = {
      method: 'POST',
      url,
      headers,
      data: data
    }
    return axios(opts)
  }
  
}
