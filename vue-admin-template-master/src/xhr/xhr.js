import axios from 'axios'
import qs from 'qs'
import deploy from './deploy.js'
import { Message } from 'element-ui'
import deleteEmptyProperty from './utils.js'
let cancel
const promiseArr = {}
const CancelToken = axios.CancelToken
// 请求拦截器
axios.interceptors.request.use(config => {
  // 发起请求时，取消掉当前正在进行的相同请求
  if (promiseArr[config.url]) {
    promiseArr[config.url]('操作取消')
    promiseArr[config.url] = cancel
  } else {
    promiseArr[config.url] = cancel
  }
  return config
}, error => {
  return Promise.reject(error)
})

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
  }
}
function successState(res, httpDefaultOpts) {
  if (res !== undefined) {
    if (res.data.code === '0x000000') {
      Message.success(res.data.message)
    } else if (res.data.code !== '000002' && res.data.code !== '000000') {
      Message.warning('网络异常')
    }
  } else {
    Message.warning('操作太过频繁请稍后重试！')
    throw new Error(`${httpDefaultOpts.url}接口,操作太过频繁请稍后重试！`)
  }
}
const httpServer = (opts, data) => {
  const parameters = deleteEmptyProperty(data.params, 'req')
  const httpDefault = {
    cancelToken: new CancelToken(c => {
      cancel = c
    }),
    baseURL: '',
    remote: 'api' && parameters,
    params: parameters,
    data: qs.stringify(data.params),
    headers: opts.method === 'get' ? deploy.opt.deployGet : deploy.opt.deployPost
  }
  const httpDefaultOpts = Object.assign({}, httpDefault, deploy.opt)
  httpDefaultOpts.method = deploy.mapping(httpDefaultOpts.remote, opts).method
  httpDefaultOpts.url = deploy.mapping(httpDefaultOpts.remote, opts).url

  if (httpDefaultOpts.method === 'get') {
    delete httpDefaultOpts.data
  } else {
    delete httpDefaultOpts.params
  }

  const promise = new Promise(function(resolve, reject) {
    axios(httpDefaultOpts).then(
      (res) => {
        successState(res, httpDefaultOpts)
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
