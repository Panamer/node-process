const { promisify } = require('util')
const figlet = promisify(require('figlet'))
const clear = require('clear')
const chalk = require('chalk')
const open = require('open')
const log = content => console.log(chalk.green(content))

const spawn = async (...args) => {
  const { spawn } = require('child_process')
  return new Promise(resolve => {
    const proc = spawn(...args)
    proc.stdout.pipe(process.stdout)
    proc.stderr.pipe(process.stderr)
    proc.on('close', () => {
      resolve()
    })
  })
}

const { clone } = require('./download')


module.exports = async name => {
  clear()
  const data = await figlet('V u e  3 . 0')
  log(data)
  // 创建项目
  log(`🚀🚀🚀创建项目 ${name}`)
  // clone 
  await clone('github:su37josephxia/vue-template', name)
  log('安装依赖')
  await spawn('yarn', ['install'], { cwd: `${name}` })
  log(chalk.green(
    `安装安成
    To get start:
      ===================
      cd ${name}
      npm run serve
      =================== `
  ))

  await spawn('npm', ['run', 'serve'], { cwd: `${name}` })
  open('http://localhost:8080')
}
open('http://localhost:8080')