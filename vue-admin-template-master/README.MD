## 常用命令

* npm i 安装npm包
* npm run dev 开发环境调试
* npm run build:prod 项目打包
* npm run lint 代码校验
* npm run cli 创建路由导航  (1.请输入router的Url: demo/index  2.请输入菜单名称(如果不出现在菜单请写 hide):  教师列表（或者hide)

---------------------------------------

## 目录结构

```
├── index.html
├── build                   # webpack 配置文件
├── config                  # 环境变量
├── script                  # cli 创建router
└── src
    ├── main.js             # 入口文件
    ├── components          # 自定义组件
    ├── directive           # 自定义指令
    ├── filters             # 自定义过滤器
    ├── icons               # 图片
    ├── lang                # 字典
    ├── router              # 路由
    ├── store               # vuex
    ├── styles              # 样式
    ├── views               # 视图文件
    └── utils
        ├── api             # 接口api
        ├── collection      # 事件监听
        ├── db              # indexedDB
        ├── http            # 接口拦截
        └── validate.js     # 常用校验
```
