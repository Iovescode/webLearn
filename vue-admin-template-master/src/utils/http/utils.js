import config from '@/../config/default'
export function deleteEmptyProperty(object, type, url) {
  for (var i in object) {
    // 过滤登陆接口
    var value
    if (type === 'req' && i.includes('_')) {
      object[camelCase(i)] = object[i]
      delete object[i]
      value = object[camelCase(i)]
    } else {
      value = object[i]
    }

    if (typeof value === 'object') {
      if (Array.isArray(value)) {
        if (value.length === 0) {
          if (type === 'req') {
            delete object[camelCase(i)]
          }
          continue
        }
      }
      deleteEmptyProperty(value, type, url)
      if (isEmpty(value)) {
        delete object[camelCase(i)]
      }
    } else {
      if (type === 'req') {
        if (value === '' || value === null || value === undefined) {
          delete object[camelCase(i)]
        } else {
          if (value.constructor === String) {
            // 首尾去除空格
            object[camelCase(i)] = value.replace(/(^\s*)|(\s*$)/g, '')
          }
        }
      } else if (type === 'res') {
        if (value.constructor === String) {
          // 首尾去除空格 转驼峰
          object[i] = value.replace(/(^\s*)|(\s*$)/g, '')
        } else {
          object[i] = value.constructor === Number ? String(object[i]) : value
        }
      }
    }
  }
  return object
}
// 下划线转驼峰
function camelCase(string) {
  return string.replace(/_([a-z])/g, (all, letter) => {
    return letter.toUpperCase()
  })
}
// 判断空
export function isEmpty(object) {
  for (var name in object) {
    return false
  }
  return true
}
// 匹配正确的接口地址
export function envFunc(baseURL, url, remote) {
  if (!remote) {
    throw new Error('请确认你要访问的远程接口')
  } else {
    // 配置远程访问地址的环境变量
    const envMap = {}
    const remoteMap = {}
    for (const [key, value] of Object.entries(config.remote)) {
      envMap[key] = []
      // 设置远程访问白名单以及后端接口关键字
      remoteMap[key] = value.redirect
      value.hostName.forEach(val => {
        envMap[key].push(val.value)
      })
    }

    if (remoteMap[remote] === undefined) {
      throw new Error('请确认你要访问的远程host是否存在于白名单')
    }
    const hasHost = envMap[config.currentProjectName].indexOf(location.hostname)
    // 设置本地调试访问转向到api平台
    if (location.host.includes('localhost')) {
      return 'http://' + envMap[remote][0] + remoteMap[remote] + url
    }
    if (hasHost !== -1) {
      return `http://${envMap[remote][hasHost]}${remoteMap[remote]}${url}`
    }
  }
}
