const getList = require('../../cmd/index.js').getList, options = [
  'xzsfjh',
  'sfjhgl',
  'sfxxts',
  'hzsfgl',
  'sfbdgl',
  'info',
  'tyhfbd',
  'sftjfx'
]
module.exports =  getList('What do you want to do?', options).then(e => {
  return require(`./${e}/`)
}).catch(e => {throw e})