#!/usr/bin/env node
const program = require('commander')
program.version(require('../package.json').version)

program
  .command('init <name>')
  .description('init your project by name')
  .action(
    require('../lib/init.js')
  )
program
  .command('refresh')
  .description('refresh routers...')
  .action(require('../lib/refresh'))
program
  .command('serve')
  .description('serve')
  .action(require('../lib/serve'))

program.parse(process.argv)
