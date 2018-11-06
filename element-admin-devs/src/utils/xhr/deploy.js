
import config from './config.js'
import api from './api.js'
import remote from './remote.js'
import deleteEmptyProperty from './utils.js'
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
    throw new Error(`请把${url}放入romoteApi`)
  }
}
function forapiCopy(e, url) {
  if (api[url]) {
    return {
      method: url.match(/(\S*)@/)[1],
      url: api[url]
    }
  } else {
    throw new Error(`请把${url}放入localApi`)
  }
}
const deploy = {
  opt: {
    baseURL: '' || baseURL,
    timeout: 10000,
    deployGet: {
      'token': '99c29e21933e96fda1dd'
    },
    deployPost: {
      'X-Requested-With': 'XMLHttpRequest'
    }
  },
  mapping: function(e, url) {
    if (config.remote.includes(e)) {
      return forapi(e, url)
    } else {
      return forapiCopy('', url)
    }
  },
  parameter: function(e) {
    return deleteEmptyProperty(e, 'req')
  }
}

export default deploy
