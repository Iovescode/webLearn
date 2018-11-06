import axios from 'axios'
import { req, reqError, res, resError } from '@/utils/http/ctx'
import instance from '@/utils/http/instance'
// create an axios instance
const service = axios.create(instance)
// request interceptor
service.interceptors.request.use(config => {
  return req(config)
}, error => {
  reqError(error)
})

// respone interceptor
service.interceptors.response.use(response => {
  return res(response)
}, error => {
  resError(error)
})

export default service
