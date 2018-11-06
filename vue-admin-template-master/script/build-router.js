const Generator = require('yeoman-generator')
// const mkdirp = require('mkdirp')
const yosay = require('yosay')
const chalk = require('chalk')
const cli = require('./cli')
module.exports = class extends Generator {
  // note: arguments and options should be defined in the constructor.
  constructor(args, opts) {
    super(args, opts)
    // this.argument('appname', { type: String, required: true })

    // And you can then accstartess it later; e.g.
    this.log('')
  }
  initializing() {
    const message = chalk.bgBlack.bold('\n开始添加router\n')
    this.log(yosay(message))
  }
  prompting() {
    return this.prompt([
      {
        type: 'input',
        name: 'url',
        message: '请输入router的Url',
        default: this.name
      }, {
        type: 'input',
        name: 'isMenu',
        message: '请输入菜单名称(如果不出现在菜单请写 hide)？',
        default: this.name
      }]
    ).then(answers => {
      this.log('router', JSON.stringify(answers))
      console.log(cli.add([answers.url, answers.isMenu]))
    })
  }
}

// module.exports = class extends Generator {
//   constructor(args, opts) {
//     super(args, opts);
//   }
//   initializing() {
//     const message = chalk.bgBlack.bold('\n请正确添加router\n')
//     this.log(yosay(message))
//   }
//   prompting() {
//     // 目录
//     const prompts = [
//       {
//         type: 'input',
//         name: 'name',
//         message: '请输入router',
//         default: this.name
//       }, {
//         type: 'input',
//         name: 'routerParame',
//         message: '请输入router参数',
//         default: this.name
//       }, {
//         type: 'confirm',
//         name: 'isMenu',
//         message: '请确认是否添加在菜单栏？',
//         default: true
//       }, {
//         type: 'confirm',
//         name: 'isOP',
//         message: '请确认是否有权限限制？',
//         default: true
//       }]
//     this.prompt(prompts, answers => {
//       this.log(answers)
//     }).bind(this)
//   }
//   configuring() {
//     this.config.save()
//   }
//   selfFunction() {

//   }
//   writing() {
//   }

// }
