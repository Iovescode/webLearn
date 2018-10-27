module.exports = {
  title: '新手文档', // 设置网站标题
  base: '/dataCom/',
  description: 'Just for fun', //描述
  dest: './dist',   // 设置输出目录
  port: 2333, //端口
  themeConfig: { //主题配置
    // 添加导航栏
    nav: [
      { text: '主页', link: '/' }, // 导航条
      { text: '新手文档', link: '/baseComponents/' },
      { text: '项目代码', link: '/code/' },
      {
        text: 'github',
        // 这里是下拉列表展现形式。
        items: [
          { text: 'focus-outside', link: 'https://github.com/TaoXuSheng/focus-outside' },
          { text: 'stylus-converter', link: 'https://github.com/TaoXuSheng/stylus-converter' },
        ]
      }
    ],
    // 为以下路由添加侧边栏
    sidebar:{
      '/baseComponents/': [
        {
          title: '入职指导',
          collapsable: true,
          children: [
            'base/test1',
            'base/test2',
            'base/test3',
            'base/test4',
          ]
        },
        {
          title: '可视化组件',
          collapsable: true,
          children: [
          ]
        },
        {
          title: '工具类组件',
          collapsable: true,
          children: [
          ]
        },
        {
          title: '方法类函数',
          collapsable: true,
          children: [
          ]
        }
      ],
      '/code/': [
        {
          title: 'ijy为例',
          collapsable: true,
          children: [
            'config/test1',
            'config/test2',
            'config/test3'
          ]
        },
        {
          title: 'store',
          collapsable: true,
          children: [
            'store/test1',
            'store/test2'
          ]
        },
        {
          title: 'src--->utils',
          collapsable: true,
          children: [
            'utils/test4',
            'utils/test5'
          ]
        },
        {
          title: 'vue知识库',
          collapsable: false,
          children: [
          ]
        }
      ]
    }
  }
}