import request from '../utils/request'

export function getEvents(params) {
  return request({
    url: '/api/events',
    method: 'get',
    params
  })
}

export function postEvent(data) {
    return request({
        url: '/api/events',
        method: 'post',
        data
    })
}
