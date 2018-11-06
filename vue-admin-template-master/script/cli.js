let program
const fs = require('fs-extra')

function createVueSass(directory, name) {
  return fs.readFile(`src/views/${directory}/${name}.vue`, 'utf8', (err, data) => {
    if (err) return console.error(err)
    const fileDate = data.replace(/name:(.*)/, `name: '${name.replace('.vue', '')}',`)
    const files = fileDate.replace(/sassURL/, `../../styles/${directory}/${name}.sass`)
    const outPutVuePromise = outPutVue(directory, name, files)
    const outPutSassPromise = outPutSass(directory, name)
    Promise.all([outPutVuePromise, outPutSassPromise])
  })
}

function outPutVue(directory, name, files) {
  return fs.outputFile(`src/views/${directory}/${name}.vue`, files, err => {
    if (err) {
      throw new Error(err)
    }
    console.log('vue模板生成成功')
  })
}

function outPutSass(directory, name) {
  return fs.outputFile(`src/styles/${directory}/${name}.sass`, `// src/views/${directory}/${name}.vue`, err => {
    if (err) {
      throw new Error(err)
    }
    console.log('sass模板生成成功')
  })
}

function addRouter(path, name) {
  return `{
    path: '/${path}',
    component: Layout,
    redirect: '${name}',
    hidden: ${program[1] === 'hide' ? 'true' : false},
    children: [{
      path: '${name}',
      component: _import('${path}/${name}'),
      name: '${path}${name}',
      meta: { title: '${path}${name}', icon: 'form' }
    }]
  },
  // router-auto不能删除`
}

function modifyRouter(directory, name) {
  return fs.readFile('src/router/index.js', 'utf-8', (error, data) => {
    if (error) {
      throw new Error(error)
    }
    const datas = data.replace('// router-auto不能删除', addRouter(directory, name))
    updateRouter(datas)
  })
}

function updateRouter(datas) {
  return fs.outputFile('src/router/index.js', datas, error => {
    if (error) {
      throw new Error(error)
    }
    console.log('路由生成成功')
  })
}

function modifyZh() {
  return fs.readFile('src/lang/zh.js', 'utf-8', (error, data) => {
    if (error) {
      throw new Error(error)
    }
    const datafiles = data.replace('// routerName不能删除', `${program[0].replace('/', '')}: '${program[1] === 'hide' ? '' : program[1]}',\r\n    // routerName不能删除'`)
    updateZh(datafiles)
  })
}

function updateZh(datafiles) {
  return fs.outputFile('src/lang/zh.js', datafiles, error => {
    if (error) {
      throw new Error(error)
    }
    console.log('路由名称生成成功')
    if (program[1] === 'hide') {
      console.log('这个路由不会出现在菜单里面')
    }
  })
}

function example(directory, name) {
  try {
    console.log(`目录是：${directory}/${name}`)

    fs.copy('config/template.vue', `src/views/${directory}/${name}.vue`)
      .then(() => {
        const createVuePromise = createVueSass(directory, name)
        const addRouterPromise = modifyRouter(directory, name)
        const modifyZhPromise = modifyZh()

        Promise.all([createVuePromise, addRouterPromise, modifyZhPromise])
      })
      .catch(err => {
        console.log(err)
      })
  } catch (err) {
    console.error(err)
  }
}

function ensuerDir() {
  return fs.ensureDir('src/views/' + program[0].split('/')[0]).then(() => {
    console.log('目录正确开始插入模板')
    example(program[0].split('/')[0], program[0].split('/')[1])
  })
}

function add(arg) {
  console.log(arg)
  program = arg
  if (!arg[1]) {
    console.log('请输入正确参数如: npm run cli 路径/文件名 路由名称')
    return
  }
  return new Promise((resolve, reject) => {
    if (/[a-z]\/[a-z]/.test(arg)) {
      ensuerDir()
    } else {
      reject('请输入正确参数如: npm run cli 路径/文件名 路由名称')
    }
  })
}

exports = module.exports = { add }
// 使用方式 例如 npm run cli app/demo 实例
// app指的是文件夹demo是文件名称 实例是路由名称
// 如果把实例改为hide则该路由不会自动注册到菜单里面 npm run cli app/index hide
