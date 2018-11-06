module.exports= {
  prod:{
    NODE_ENV: '"production"',
    ENV_CONFIG: '"prod"',
    BASE_API: '""',
  },
  dev: {
    NODE_ENV: '"development"',
    ENV_CONFIG: '"dev"',
    BASE_API: '"http://dev-api.hfjy.com/mock/112"',// dev-api的地址
  },
  platform: 'ixs_platform',
  INDEXDB: {
    OPEN: true,// 是否开启indexdb
    DB: 'hfjy-xs-Db',//数据库名称
    TABLE: {
      errorDate: '++id,url', // 表明 ：字段名称
      cacheDate: '++id,url,method,remote,disableTime,params,cacheTime,setTime,data'
    },
    ISCollection: false,// 是否开启数据收集
  },
  remote: {
    izj: {
      hostName: [
        { name: 'localhost', value: 'dev-api.hfjy.com/mock/57'},
        { name: 'dev-', value: 'dev-izj.hfjy.com'},
        { name: 'i-', value: 'i-izj.hfjy.com' },
        { name: 'test-', value: 'test-izj.hfjy.com' },
        { name: 'offline-', value: 'offline-izj.hfjy.com' },
        { name: 'izj.', value: 'izj.hfjy.com'}
      ],//环境
      redirect: '/console',//重定向
    },
    ijx: {
      hostName: [
        { name: 'localhost', value: 'dev-api.hfjy.com/mock/108'},
        { name: 'dev-', value: 'dev-ijx.hfjy.com'},
        { name: 'test-', value: 'test-ijx.hfjy.com'},
        { name: 'i-', value: 'i-ijx.hfjy.com'},
        { name: 'ijx.', value: 'ijx.hfjy.com'}
      ],//环境
      redirect: '/console',//重定向
    },
    ixs: {
      hostName: [
        { name: 'localhost', value: 'dev-api.hfjy.com/mock/112'},
        { name: 'dev-', value: 'dev-ixs.hfjy.com'},
        { name: 'i-', value: 'i-ixs.hfjy.com' },
        { name: 'test-', value: 'test-ixs.hfjy.com'},
        { name: 'offline-', value: 'offline-ixs.hfjy.com' },
        { name: 'ixs-', value: 'ixs.hfjy.com' },
        { name: 'ixs-', value: 'ixs-temp.hfjy.com' }
      ],//环境
      redirect: '/sale',//重定向
    },
    iCP: {
      hostName: [
        { name: 'localhost', value: 'dev-api.hfjy.com/mock/57'},
        { name: 'dev-', value: 'test-hjzx.hfjy.com'},
        { name: 'test-', value: 'test-hjzx.hfjy.com'},
        { name: 'i-', value: 'test-hjzx.hfjy.com'},
        { name: 'offline-', value: 'offline-hjzx.hfjy.com'},
        { name: 'hjzx.', value: 'hjzx.hfjy.com' },
        { name: 'hjzx.', value: 'hjzx.hfjy.com'}
      ],
      redirect: '',//重定向
    }
  },
  oldLmsHost: ['i.hfjy.com', 'i.hfjy.com', 'dev-lms.hfjy.com', 'i-lms.hfjy.com', 'i-lms.hfjy.com', 'offline-lms.hfjy.com'], // 线上，开发，测试，离线
  currentHost: ['ixs.', 'ixs-temp', 'dev-', 'test-', 'i-', 'offline-'],
  currentProjectName: 'ixs'
}
