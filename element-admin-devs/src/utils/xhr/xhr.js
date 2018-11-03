import axios from 'axios'
import qs from 'qs'
import { Message } from 'element-ui'
import deploy from './deploy.js'
axios.interceptors.request.use(config => {
  return config
}, error => {
  return Promise.reject(error)
})

axios.interceptors.response.use(response => {
  return response
}, error => {
  return Promise.resolve(error.response)
})

function errorState(response) {
  // 如果http状态码正常，则直接返回数据
  if (response && (response.status === 200 || response.status === 304 || response.status === 400)) {
    return response
    // 如果不需要除了data之外的数据，可以直接 return response.data
  } else {
    Message.warning('网络异常')
    throw new Error('接口,操作太过频繁请稍后重试！')
  }
}

function successState(res) {
  // 统一判断后端返回的错误码
  if (res.data.errCode === '000002') {
    Message.warning('网络异常')
  } else if (res.data.errCode !== '000002' && res.data.errCode !== '000000') {
    Message.warning('网络异常')
  }
}
const httpServer = (opts, data) => {
  const httpDefault = {
    method: opts.method,
    url: opts.url,
    remote: data.remote,
    params: data.params,
    data: qs.stringify(data.params),
    headers: opts.method === 'get' ? deploy.opt.deployGet : deploy.opt.deployPost
  }
  const httpDefaultOpts = Object.assign({}, httpDefault, deploy.opt)
  httpDefaultOpts.baseURL = '' || deploy.mapping(httpDefaultOpts.remote)
  if (opts.method === 'get') {
    delete httpDefaultOpts.data
  } else {
    delete httpDefaultOpts.params
  }

  const promise = new Promise(function(resolve, reject) {
    axios(httpDefaultOpts).then(
      (res) => {
        successState(res)
        resolve(res)
      }
    ).catch(
      (response) => {
        errorState(response)
        reject(response)
      }
    )
  })
  return promise
}
export default httpServer
