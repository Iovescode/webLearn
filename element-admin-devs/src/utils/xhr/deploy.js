
import config from './config.js'
import api from './api.js'
import remote from './remote.js'

let baseURL
(() => {
  config.hostName.map((item, index) => {
    if (window.location.hostname.includes(item.name)) {
      baseURL = item.value
    }
  })
})()

function forapi(e, url) {
  if (Object.keys(url)) {
    return {
      method: url.match(/(\S*)@/)[1],
      url: remote[e][url]
    }
  } else {
    console.log('api不存在')
  }
}
function forapiCopy(e, url) {
  if (url) {
    return {
      method: url.match(/(\S*)@/)[1],
      url: api[url]
    }
  } else {
    console.log('api不存在223')
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
      return forapiCopy('', url)
    }
  }
}

export default deploy
