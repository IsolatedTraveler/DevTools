(()=>{
  'use strict';
  const {checkCommand,commandExe} = require('./common.js')
  const config = require('./config.js')
  let params = process.argv.slice(2)
  checkCommand(params,config).then(res=>{
    commandExe(params,res,'./tools/')
  })
})()