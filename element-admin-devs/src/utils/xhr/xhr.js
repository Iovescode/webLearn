import axios from 'axios'
import qs from 'qs'
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

const httpServer = (opts, data) => {
  const httpDefault = {
    baseURL: '',
    remote: 'api' && data.remote,
    params: data.params,
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
        deploy.successState(res)
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
