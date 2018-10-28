# src --->api

instance.js 文件
```
// axios 的配置文件
import Config from '@/../config/default'
import Qs from 'qs'
``` 
1.Qs 不懂请百度

```
const config = {
  baseURL: process.env.NODE_ENV === 'production' ? window.location.origin + Config['remote'][Config.currentProjectName]['redirect'] : process.env.BASE_API + Config['remote'][Config.currentProjectName]['redirect'], // api的base_url
  transformRequest: [(data) => {
    return Qs.stringify(data)
  }],
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
}
if (location.hostname === 'dev.hfjy.com') {
  config.baseURL = 'http://dev-ijx.hfjy.com' + Config['remote'][Config.currentProjectName]['redirect']
}
export default config

```
1.currentProjectName default.js配置请查看

2.process.env.NODE_ENV webpack4 配置请查看
