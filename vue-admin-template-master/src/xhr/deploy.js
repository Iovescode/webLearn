import config from '@/../config/config.js'
import api from '@/../src/api/api.js'
import remote from '@/../src/api/remote.js'
import { Message } from 'element-ui'
import store from '@/store'

function hostName(e) {
  config.hostName.map((item, index) => {
    if (window.location.hostname.includes(item.name)) {
      return item.value.replace('izj', e)
    }
  })
}

function forapi(e, url) {
  if (remote[e] && remote[e][url]) {
    return {
      method: url.match(/(\S*)@/)[1],
      url: remote[e][url],
      baseURL: hostName(e)
    }
  } else {
    throw new Error(`请把${url}放入romoteApi`)
  }
}
function forapiCopy(e, url) {
  if (api[url]) {
    return {
      method: url.match(/(\S*)@/)[1],
      url: api[url],
      baseURL: hostName(e)
    }
  } else {
    throw new Error(`请把${url}放入localApi`)
  }
}

const deploy = {
  headers() {
    return {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Auth': '21231251',
      'Auth-x': store.getters.token
    }
  },
  mapping(e, url) {
    if (config.remote.includes(e)) {
      return forapi(e, url)
    } else {
      return forapiCopy('', url)
    }
  },
  baseURL(e) {
    // return hostName(e)
    config.hostName.map((item, index) => {
      if (window.location.hostname === item.name) {
        return 'http://' + item.value
      }
    })
  },
  errorState(response) {
    if (response && (response.status === 200 || response.status === 304 || response.status === 400)) {
      return response
    }
  },
  successState(res, httpDefaultOpts) {
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
}

export default deploy
