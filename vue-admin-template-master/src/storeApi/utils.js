import request from '@/utils/request'

export function getNewTime() {
  return request({
    url: 'teacher_getDate', // 获取当前服务器时间
    method: 'get'
  })
}

export function phoneAddLog(data) {
  return request({
    url: 'student_phoneLog', // 查看手机号日志
    method: 'post',
    data
  })
}

export function isMobile() {
  if (/AppleWebKit.*Mobile/i.test(navigator.userAgent) || (/MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/.test(navigator.userAgent))) {
    if (window.location.href.indexOf('?mobile') < 0) {
      try {
        if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
          return true
        } else if (/iPad/i.test(navigator.userAgent)) {
          return true
        } else {
          return true
        }
      } catch (e) {
        console.log('判断错误')
      }
    }
  }
  return false
}

export function getCallPhoneStatus(callId) {
  return request({
    url: 'call_callStatus',
    method: 'get',
    params: {
      callId
    },
    remote: 'iCP',
    isFilterUrl: true
  })
}
