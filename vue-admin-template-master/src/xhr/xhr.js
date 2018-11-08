import axios from 'axios'
import qs from 'qs'
import deploy from './deploy.js'
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

const httpServer = (opts, data) => {
  const parameters = deleteEmptyProperty(data.params, 'req')
  const httpDefault = {
    cancelToken: new CancelToken(c => {
      cancel = c
    }),
    baseURL: 'http://localhost:3001',
    remote: 'api' && data.remote,
    params: parameters,
    data: qs.stringify(data.params),
    headers: deploy.opt.deployGet
  }
  let httpDefaultOpts = Object.assign({}, httpDefault, deploy.opt)
  httpDefaultOpts.method = deploy.mapping(httpDefaultOpts.remote, opts).method
  httpDefaultOpts.url = deploy.mapping(httpDefaultOpts.remote, opts).url
  httpDefaultOpts = Object.assign({}, httpDefaultOpts.url)
  console.log(httpDefaultOpts)
  httpDefaultOpts.baseURL = deploy.mapping(httpDefaultOpts.remote, opts).baseURL
  if (httpDefaultOpts.method === 'get') {
    delete httpDefaultOpts.data
  } else {
    delete httpDefaultOpts.params
  }

  const promise = new Promise(function(resolve, reject) {
    axios(httpDefaultOpts).then(
      (res) => {
        deploy.successState(res, httpDefaultOpts)
        resolve(res)
      }
    ).catch(
      (response) => {
        deploy.errorState(response)
        reject(response)
      }
    )
  })
  return promise
}
export default httpServer
