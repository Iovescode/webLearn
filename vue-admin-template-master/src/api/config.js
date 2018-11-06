module.exports = {
  thirdParty: ['15558005800', '13566552025'],
  platform: 'ijx_platform',
  INDEXDB: {
    OPEN: true,
    DB: 'hfjy-jx-Db',
    TABLE: [
      {
        errorDate: '++id,url',
        cacheDate: '++id,url,method,remote,disableTime,params,cacheTime,setTime,data'
      },
      {
        paperDate: '++id,paperId,paperInfo'
      }
    ]
  },
  hostName: [
    { name: 'localhost', value: 'http://dev-api.hfjy.com', oldLmsHost: 'i.hfjy.com' },
    { name: 'dev-', value: 'dev-izj.hfjy.com', oldLmsHost: 'dev-lms.hfjy.com' },
    { name: 'test-', value: 'i-izj.hfjy.com', oldLmsHost: 'i-lms.hfjy.com' },
    { name: 'i-', value: 'i-izj.hfjy.com', oldLmsHost: 'i-lms.hfjy.com' },
    { name: 'offline-', value: 'offline-izj.hfjy.com', oldLmsHost: 'offline-lms.hfjy.com' },
    { name: 'izj.', value: 'izj.hfjy.com', oldLmsHost: 'i-lms.hfjy.com' }
  ],
  remote: ['izj', 'ijx'],
  oldIPCHost: ['http://lms-upload.hfjy.com/file', 'https://test-lms-upload.hfjy.com/file'] // 线上，开发，测试，离线
}

