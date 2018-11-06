export default function deleteEmptyProperty(object, type) {
  for (const i in object) {
    // 过滤登陆接口
    let value
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
      deleteEmptyProperty(value, type)
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
function isEmpty(object) {
  for (const name in object) {
    return false
  }
  return true
}
