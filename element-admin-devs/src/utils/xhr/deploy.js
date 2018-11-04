
import config from './config.js'
import api from './api.js'
import remote from './remote.js'
import { Message } from 'element-ui'
let baseURL
(() => {
  config.hostName.map((item, index) => {
    if (window.location.hostname.includes(item.name)) {
      baseURL = 'http://' + item.value
    }
  })
})()
function forapi(e, url) {
  if (e) {
    for (const item in remote) {
      if (e === item) {
        for (const key in remote[item]) {
          if (key === url) {
            return {
              method: key.match(/(\S*)@/)[1],
              url: remote[item][key]
            }
          }
        }
      }
    }
  } else {
    for (const item in api) {
      if (url === item) {
        return {
          method: item.match(/(\S*)@/)[1],
          url: api[item]
        }
      }
    }
  }
}
const deploy = {
  opt: {
    baseURL: '' || baseURL,
    timeout: 10000,
    deployGet: {
      'X-Requested-With': 'XMLHttpRequestfffggcjyvyjtfvfytfvfty',
      'Accept': '*/*',
      'Content-Type': 'application/json; charset=UTF-8',
      'token': '99c29e21933e96fda1dd'
    },
    deployPost: {
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }
  },
  mapping: function(e, url) {
    if (config.remote.includes(e)) {
      return forapi(e, url)
    } else {
      return forapi('', url)
    }
  },
  errorState(response) {
    console.log(response)
    // 如果http状态码正常，则直接返回数据
    if (response && (response.status === 200 || response.status === 304 || response.status === 400)) {
      return response
      // 如果不需要除了data之外的数据，可以直接 return response.data
    } else {
      Message.warning(response.data.message)
    }
  },
  successState(res) {
    // 统一判断后端返回的错误码
    if (res.data.code === 200) {
      Message.warning(res.data.message)
    } else if (res.data.code !== '000002' && res.data.code !== '000000') {
      Message.warning('网络异常')
    }
  }
}

export default deploy
