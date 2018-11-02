import axios from 'axios'
import qs from 'qs'
import { Message } from 'element-ui'

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
  // 隐藏loading
  // console.log(response)
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
  // 隐藏loading
  // 统一判断后端返回的错误码
  if (res.data.errCode === '000002') {
    Message.warning('网络异常')
  } else if (res.data.errCode !== '000002' && res.data.errCode !== '000000') {
    Message.warning('网络异常')
  }
}

// let headerConfig=
const httpServer = (opts, data) => {
  const Public = { // 公共参数
    // 'srAppid': ''
    'remote': 'izj'
  }

  const httpDefaultOpts = { // http默认配置
    method: opts.method,
    baseURL: 'http://dev-api.hfjy.com',
    url: opts.url,
    timeout: 10000,
    params: Object.assign(Public, data),
    data: qs.stringify(Object.assign(Public, data)),
    headers: opts.method === 'get' ? {
      'X-Requested-With': 'XMLHttpRequest',
      'Accept': 'application/json',
      'Content-Type': 'application/json; charset=UTF-8'
    } : {
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }
  }
  // if(httpDefaultOpts.params.remote === 'izj') {
  //   httpDefaultOpts.url = 'www.baidu.com'
  // }

  if (opts.method === 'get') {
    // console.log(opts)
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
