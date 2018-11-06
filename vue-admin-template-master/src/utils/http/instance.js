// axios 的配置文件
import Config from '@/../config/default.js'
import Qs from 'qs'

const config = {
  baseURL: process.env.NODE_ENV === 'production' ? window.location.origin + Config['remote'][Config.currentProjectName]['redirect'] : process.env.BASE_API + Config['remote'][Config.currentProjectName]['redirect'], // api的base_url
  transformRequest: [(data) => {
    return Qs.stringify(data)
  }],
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
}
export default config
