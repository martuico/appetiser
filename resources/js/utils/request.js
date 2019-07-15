import axios from 'axios'
import store from '../store'
// import { getToken } from '@/utils/auth'


const service = axios.create({
  baseURL: process.env.BASE_API,
  timeout: 60 * 4 * 1000
})

service.interceptors.request.use(
  config => {
    // if (store.getters.token) {
    //   config.headers['Authorization'] = 'Bearer ' + getToken()
    // }
    return config
  },
  error => {
    console.log('interceptors.request.use', error) // for debug
    Promise.reject(error)
  }
)
service.interceptors.response.use(
  response => {
    if (response.status !== 200 && response.status !== 204) {
      const res = response.data


      return Promise.reject(res.error)
    } else {
      return response.data
    }
  },
  error => {
    // console.log('[request error]', error)
    // var err = error.response.data.error

    // if (err.message == 'Expired token') {
    //   store.dispatch('FedLogOut').then(() => {
    //     location.reload()
    //   })
    // }
    return Promise.reject(error)
  }

)

export default service
