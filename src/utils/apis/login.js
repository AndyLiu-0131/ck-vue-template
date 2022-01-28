import request from '../request'

export function pcLogin(params) {
  return request({
    url: '/sys-user-manager/pcLogin',
    method: 'POST',
    data: params
  })
}
export function changePassword(params) {
  return request({
    url: '',
    method: 'POST',
    data: params
  })
}
