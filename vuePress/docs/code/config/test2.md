# config ---> default.js 

default.js  非常重要

 ```
  prod: {
    NODE_ENV: '"production"',
    ENV_CONFIG: '"prod"',
    BASE_API: '""'
  },
  dev: {
    NODE_ENV: '"development"',
    ENV_CONFIG: '"dev"',
    // BASE_API: '"http://dev-ijx.hfjy.com"' // dev-api的地址
    BASE_API: '"http://test-ijx.hfjy.com"' // test-api的地址
    // BASE_API: '"http://dev-api.hfjy.com/mock/108"' // dev-api的地
  },
  ```
prod 生产环境的配置，BASE_API：生产api 配置 

dev  本地开发，BASE_API：开发api 配置
  ```
  thirdParty: ['15558005800', '13566552025'],
  ```
thirdParty 为第三方平台访问提供账号 

  ```
  platform: 'ijx_platform',
  ```
platform  平台设置 

ijx_platform 登陆后保存平台验证，请查看Network Request Headers

  ```
  INDEXDB: {
    OPEN: true, // 是否开启indexdb
    DB: 'hfjy-jx-Db', // 数据库名称
    TABLE: [
      {
        errorDate: '++id,url', // 表名 ：字段名称
        cacheDate: '++id,url,method,remote,disableTime,params,cacheTime,setTime,data'
      },
      {
        paperDate: '++id,paperId,paperInfo'
      }
    ]
  },
   ISCollection: false, // 是否开启数据收集
  ```
INDEXDB 库配置

  ```
  remote: {
    izj: {
      hostName: [
        { name: 'localhost', value: 'dev-api.hfjy.com/mock/57' },
        { name: 'dev-', value: 'dev-izj.hfjy.com' },
        { name: 'test-', value: 'i-izj.hfjy.com' },
        { name: 'i-', value: 'i-izj.hfjy.com' },
        { name: 'offline-', value: 'offline-izj.hfjy.com' },
        { name: 'temp-', value: 'temp-ijx.hfjy.com' },
        { name: 'izj.', value: 'izj.hfjy.com' }
      ], // 环境
      redirect: '/console' // 重定向
    },
    ijx: {
      hostName: [
        { name: 'localhost', value: 'dev-api.hfjy.com/mock/108' },
        { name: 'dev-', value: 'dev-ijx.hfjy.com' },
        { name: 'test-', value: 'test-ijx.hfjy.com' },
        { name: 'i-', value: 'i-ijx.hfjy.com' },
        { name: 'offline-', value: 'offline-ijx.hfjy.com' },
        { name: 'temp-', value: 'temp-ijx.hfjy.com' },
        { name: 'ijx.', value: 'ijx.hfjy.com' }
      ], // 环境
      redirect: '/education' // 重定向
    },
    ijy: {
      hostName: [
        { name: 'localhost', value: 'test-ijy.hfjy.com' },
        { name: 'dev-', value: 'dev-ijy.hfjy.com' },
        { name: 'test-', value: 'test-ijy.hfjy.com' },
        { name: 'i-', value: 'i-ijy.hfjy.com' },
        { name: 'offline-', value: 'offline-ijy.hfjy.com' },
        { name: 'temp-', value: 'ijy.hfjy.com' },
        { name: 'ijx.', value: 'ijy.hfjy.com' }
      ], // 环境
      redirect: '/education' // 重定向
    },
    ijw: {
      hostName: [
        { name: 'localhost', value: 'dev-api.hfjy.com/mock/108' },
        { name: 'dev-', value: 'dev-ijw.hfjy.com' },
        { name: 'test-', value: 'test-ijw.hfjy.com' },
        { name: 'i-', value: 'i-ijw.hfjy.com' },
        { name: 'offline-', value: 'offline-ijw.hfjy.com' },
        { name: 'temp-', value: 'temp-ijx.hfjy.com' },
        { name: 'ijx.', value: 'ijw.hfjy.com' }
      ], // 环境
      redirect: '/education' // 重定向
    },
    ixs: {
      hostName: [
        { name: 'localhost', value: 'dev-api.hfjy.com/mock/57' },
        { name: 'dev-', value: 'dev-ixs.hfjy.com' },
        { name: 'test-', value: 'test-ixs.hfjy.com' },
        { name: 'i-', value: 'i-ixs.hfjy.com' },
        { name: 'offline-', value: 'offline-ixs.hfjy.com' },
        { name: 'temp-', value: 'temp-ijx.hfjy.com' },
        { name: 'ixs.', value: 'ixs.hfjy.com' }
      ], // 环境
      redirect: '/console' // 重定向
    },
    iCP: {
      hostName: [
        { name: 'localhost', value: 'dev-api.hfjy.com/mock/57' },
        { name: 'dev-', value: 'test-hjzx.hfjy.com' },
        { name: 'test-', value: 'test-hjzx.hfjy.com' },
        { name: 'offline-', value: 'offline-hjzx.hfjy.com' },
        { name: 'temp-', value: 'temp-ijx.hfjy.com' },
        { name: 'hjzx.', value: 'hjzx.hfjy.com' }
      ],
      redirect: '' // 重定向
    }
  },
  ```
remote 远程访问子域名配置 

izj ，ijx,ijy, iCP 这是远程api 平台

下面是案例


```
return this.$http.get('student_getStudentInfos', { remote: 'izj', params: { student_intention_id: this.rosterId }})
return this.$http.post('call_intentionAndReason', {}, { remote: 'iCP' })      
 ```       

redirect api路由配置
  ```
  oldLmsHost: ['i.hfjy.com', 'dev-lms.hfjy.com', 'i-lms.hfjy.com', 'offline-lms.hfjy.com', 'i-lms.hfjy.com'], // 线上，开发，测试，离线
  currentHost: ['izj.', 'dev-', 'i-', 'offline-', 'temp-'],
  ```
 iframe 嵌套子域名配置关系一一对应
  ```
  oldIPCHost: ['http://lms-upload.hfjy.com/file', 'https://test-lms-upload.hfjy.com/file'], // 线上，开发，测试，离线
  ```
 文件上传子域名配置
  ```
  currentProjectName: 'ijx'
  ```

  现有平台设置使用

