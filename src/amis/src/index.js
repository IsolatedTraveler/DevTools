const getList = require('../../cmd/index.js').getList, options = [
  'cs',
  'hzbs',
  'sfxt',
  'chjl'
]
module.exports =  getList('What do you want to do?', options).then(e => {
  return require(`./${e}/`)
}).catch(e => {throw e})