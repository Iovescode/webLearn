
function obj2String(obj, arr = [], idx = 0) {
  for (const item in obj) {
    arr[idx++] = [item, obj[item]]
  }
  return new URLSearchParams(arr).toString()
}
function commonFetcdh(url, options, method = 'GET') {
  const searchStr = obj2String(options)
  let initObj = {}
  if (method === 'GET') { // 如果是GET请求，拼接url
    url += '?' + searchStr
    initObj = {
      method: method,
      credentials: 'include'
    }
  } else {
    initObj = {
      method: method,
      credentials: 'include',
      headers: new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      }),
      body: searchStr
    }
  }
  fetch(url, initObj).then((res) => {
    return res.json()
  }).then((res) => {
    return res
  })
}

function GET(url, options) {
  return commonFetcdh(url, options, 'GET')
}

function POST(url, options) {
  return commonFetcdh(url, options, 'POST')
}

GET('https://www.baidu.com/search/error.html', { a: 1, b: 2 })
POST('https://www.baidu.com/search/error.html', { a: 1, b: 2 })
