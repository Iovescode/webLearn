# http ---> ctx.js
```
import store from '@/store'
import { getToken } from '@/utils/auth'
import { Message } from 'element-ui'
import db from '@/utils/db/db'
import server from '@/utils/db/server'
import { CacheIndex } from './cache'
import localApi from '../../api/localApi'
import romoteApi from '../../api/remoteApi'
import { deleteEmptyProperty, envFunc } from './utils'
```
1.store 状态库

2.getToken 获取Token

3.Message 全局处理后端message

4.db 缓存存储

5.server db库常用api

6.CacheIndex 缓存处理

7.deleteEmptyProperty 处理value 为空并删除key

8.envFunc 匹配接口 （一般config里面default.js 配置出错在这里查看的到）

```
export async function req(config) {
  if (sessionStorage.getItem('hf.resolver.apiVer')) {
    config.headers['Apiver'] = sessionStorage.getItem('hf.resolver.apiVer')
  }
  // Do something before request is sent
  // 过滤接口的非法使用  
  ```
  ```
  if (/[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?/.test(config.url)) {
    throw new Error('跨域请先设置白名单在 /utils/http/env.js,当前接口' + config.url + '不可用')
  }
  ```

  1.设置不是本平台的api 接口调用

  ```
  if (!config.remote) {
    config.remote = 'ijy'
  }
  ```

 2.设置平台 指定远程api key 值
 ```
  // 设置远程访问url
  if (config.remote) {
    if (romoteApi[config.remote][`${config.method}@${config.url}`]) {
      config.url = romoteApi[config.remote][`${config.method}@${config.url}`]
      config.url = envFunc(config.baseURL, config.url, config.remote)
    } else {
      throw new Error(`请把${config.method}@${config.url}放入romoteApi`)
    }
  } else {
    // 设置本地访问的url
    if (!localApi[config.method + '@' + config.url]) {
      throw new Error(`请把${config.method}@${config.url}放入localApi`)
    } else {
      config.url = localApi[config.method + '@' + config.url]
    }
  }
```
1.判断是否http设置remote值访问 默认走本地接口

2.envFunc 匹配接口 （一般config里面default.js 配置出错在这里查看的到）

```
  // 添加认证
  if (store.getters.token && getToken('auth_x')) {
    config.headers['Authorization'] = 'Bearer ' + store.getters.token // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
    config.headers['Auth-x'] = getToken('auth_x')
    if (config.remote === 'izj') {
      config.headers['ijw-platform'] = store.getters.ijw_platform
    }
```
1.http 发送带token 验证针对不同平台加验证

```
    // 初始化
    const hasUrl = await server.where(config)
```
查寻本地db是否缓存url

```    
    let token_url_statue = store.state[`${config.method}@${config.url}`]
    if (token_url_statue === undefined) {
      token_url_statue = store.state[`${config.method}@${config.url}`] = {
        cacheParams: {},
        disableTime: config.disableTime,
        startTimes: null,
        disabled: false,
        cacheTime: config.cacheTime,
        remote: config.remote,
        cacheMiss: false,
        beforeQueryString: '',
        exclude: config.exclude,
        filterUrl: config.filterUrl
      }
    }
``` 
1.不存在 url 重新赋值http 参数

``` 
    // 缓存请求参数 仅 get
    if (config.method === 'get') {
      token_url_statue.cacheParams = config.params ? config.params : {}
    }

    // 请求地址禁止同一时间内发出多种同一请求
    if (!token_url_statue.disabled || config.isFilterUrl) {
      token_url_statue.disabled = true
    } else {
      Message.warning('操作太过频繁请稍后重试！')
      throw new Error(`${config.url}接口,操作太过频繁请稍后重试！`)
    }
    // disableTime 接口禁用时间内将会结束请求
    if (token_url_statue && token_url_statue.startTimes && config.disableTime) {
      const timeOut = new Date().getTime() - token_url_statue.startTimes
      if (timeOut < config.disableTime * 1000) {
        token_url_statue.disabled = false
        Message.warning('操作太过频繁请稍后重试！')
        throw new Error(`${config.url}接口,操作太过频繁请稍后重试！`)
      }
    }
``` 
1.设置接口频繁调用（接口频繁调用时间大于1秒）

2.接口频繁状态未改变怎么处理 （请思考）

3.可配置跳过接口频繁

 下面是案例

``` 
 this.$http.get(this.secondListUrl, {
        params: { firstLevelDir: row ? row.id : this.ruleForm.secondLevelDir },
        isFilterUrl: true
      }).then(res => {})
``` 
可以尝试是下post 怎么用？

``` 
    // 对于参数过滤，但是排除 ISURLFILTER 属性的接口
    if ((config.params || config.data) && !config.filterUrl) {
      const data = config.params ? config.params : config.data
      const newData = Object.assign({}, data)

      // 如果有传paging对象 则把query里的page删除
      if (config.paging) {
        delete newData.page
        newData.pageSize = config.paging.pageSize
        const nowQueryString = JSON.stringify(newData)
        if (nowQueryString !== token_url_statue.beforeQueryString) {
          newData.page = config.paging.page = '1'
          token_url_statue.beforeQueryString = nowQueryString
        } else {
          newData.page = config.paging.page
        }
      }
      deleteEmptyProperty(newData, 'req', config.url, config.exclude)
      if (process.env.NODE_ENV === 'development') {
        console.log('---------------------------------')
        console.info('接口地址', config.url)
        console.log('实际参数', data)
        console.info('发出参数', newData)
        console.log('---------------------------------')
        console.info('缓存参数', config.url, token_url_statue.cacheParams)
      }
      if (newData && config.params) {
        config.params = newData
      } else {
        config.data = newData
      }
    }
``` 
1.克隆请求参数

2.发送Http 时分页处理

``` 
    // 设置缓存是否过期
    if (config.cacheTime && hasUrl) {
      if (!hasUrl.data || new Date().getTime() - hasUrl.setTime >= config.cacheTime * 1000) {
        token_url_statue.cacheMiss = true
        config.indexDb_cache = false // 缓存过期
      } else {
        config.indexDb_cache = true
        config.cacheKey = token_url_statue
      }
      // 记录http发送
      token_url_statue.startTimes = new Date().getTime()

      // 拉去缓存适配器
      if (config.indexDb_cache && window._ISCATCHE_) {
        config.adapter = function(config) {
          return CacheIndex(config)
        }
      } else {
        config.adapter = undefined
      }
    }

    // 发出请求前记录缓存接口数据
    if (!hasUrl) {
      db.cacheDate.add(
        {
          url: config.url,
          method: config.method,
          remote: config.remote,
          disableTime: config.disableTime,
          params: config.params,
          cacheTime: config.cacheTime,
          setTime: new Date().getTime()
        }
      )
    }
  }
  return config
}
```
1.adapter  什么是适配模式

2.用在这里好吗

3.如果以桥接模式处理设计怎么样



```
export function reqError(error) {
  console.error(error)
}
```
1.发送接口的错误处理

2.有没有建设性的意见，及方案

```
export async function res(response) {
  // 正常流程处理
  if (!response.config.remote) {
    response.config.url = response.config.url.replace(response.config.baseURL, '')
  }
```
1.发送请求时不存在远程baseUrl 代替
```
  // 获取存储的key
  const token_url_statue = store.state[`${response.config.method}@${response.config.url}`]
  const hasUrl = await server.where(response.config)
  // 翻状态结束status
  if (token_url_statue && token_url_statue.disabled) {
    token_url_statue.disabled = false
  }
```
1.token_url_statue.disabled = false 这里就是解决接口频繁未翻状态的处理

```
  // 收集错误
  if (response.data && response.data.code !== '0x000000') {
    db.errorDate.put({ windowHref: location.href, url: response.config.url, method: response.config.method, status: response.status, res: response.data, date: new Date().getTime() })
  }
```
1.data.code！==0x000000 错误收集并储存db库里

```  
  // 正确返回数据处理
  if (response.data.code === '0x000000') {
    // 更新数据存储
    if (token_url_statue && token_url_statue.cacheTime && !response.config.indexDb_cache && hasUrl) {
      db.cacheDate.update(hasUrl.id, { data: response.data, setTime: new Date().getTime() }).then(console.log).catch(console.log)
    }
    if (response.config.method !== 'options') {
      if (process.env.NODE_ENV === 'development') {
        console.log('接收参数', response.config.url, response.data)
      }
    }
    if (response.config.method === 'post') {
      Message.success('操作成功')
    }
    deleteEmptyProperty(response.data.data, 'res', response.config.url)
    return response.data
  }
```  
1.res 成功后的处理

2.复杂请求如 options 处理（options 状态请求不懂请百度）

```  
  // 错误异常处理
  if (/^0x00[1-7]000$/.test(response.data.code)) {
    if (response.data.message) {
      Message.error(response.data.message)
    }
    store.dispatch('FedLogOut').then(() => {
      if (location.hash !== '#/login') {
        setTimeout(() => {
          location.reload()
        }, 2000)
      }
    })
    if (/^0x00[56]000$/.test(response.data.code)) {
      location.reload()
    }
    return Object.assign(response.data, { data: '' })
  } else {
    if (response.data.message) {
      Message.error(response.data.message)
    }
    return Object.assign(response.data, { data: '' })
  }
}
```
1.常见错误处理

2.前端怎么和后端约定好的规则 （不懂请求教）

```
export function resError(error) {
  console.error(error)
}
