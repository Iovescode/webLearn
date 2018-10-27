# 

项目结构目录
```
### node 版本支持7.9以上

├── package.json
├── build (vue-cli 相关配置文件)
├── config (对于配置文件)
├── script (对于执行脚本)
├── static (静态资源)
├── src
|   ├── main.js
│   ├── router
│   |   └── index.js(路由)
│   ├── utils
│   |   |—— api
|   |   |    └── localApi.js (接口注册)
|   |   |── collection (数据采集)
|   |   |—— db (indexDb)
|   |   |—— http (axios)
│   ├── styles (sass)
│   |
│   ├── store (vuex)
│   |
│   ├── lang (中英文)
│   |
│   ├── views (可选)
│   |   └── home.tpl
|   |—— icon (图标)
|   |
│   ├── filter
│   |
│   ├── compontents（公共组件库）
│   |
│   ├── directive（自定义封装指令）
```

webpack 设置了文件打包后都会有当前事件戳 方便查看代码是否推上去了

jenkins 自动发布就是解决手动推代码造成失误