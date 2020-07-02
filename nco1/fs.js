const fs = require('fs')
const path = require('path');
const log = require('log')

const filePath = (l = '/conf.js') => {
  return path.resolve(__dirname + l)
}
// 同步调用 这里拿到的是一个buffer
const data = fs.readFileSync(filePath("/conf.js"))
// 通过下面转换 就得到文件内的文字了
const res = Buffer.from(data).toString('utf-8')



// 异步调用
fs.readFile(filePath("/conf.js"), (err, data) => {
  if (err) throw err;
  // console.log(data)
})
log("baiba")

// promisify
const { promisify } = require('util')
const readFile = promisify(fs.readFile)
// readFile(filePath('/conf.js')).then(data => console.log(data))


// fs promises API node v10
const fsp = require('fs').promises;
fsp
  .readFile(filePath())
  .then(data => console.log(data))
  .catch(err => console.log(err))
