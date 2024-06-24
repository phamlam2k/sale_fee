#!/usr/bin/env node

const spawn = require('cross-spawn')

const script = process.argv[2]

const args = process.argv.slice(3)

switch (script) {
  case 'start': {
    const result = spawn.sync('node', ['scripts/start.js'].concat(args), {
      stdio: 'inherit'
    })
    process.exit(result.status)
  }
  case 'build': {
    const result = spawn.sync('node', ['scripts/build.js'].concat(args), {
      stdio: 'inherit'
    })
    process.exit(result.status)
  }
  default:
    console.log(`Unknown script "${script}".`)
    break
}
