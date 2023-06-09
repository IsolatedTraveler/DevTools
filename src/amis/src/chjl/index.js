const getList = require('../../../cmd/').getList, options = [
  'ygxxlr',
  'xmxxlr',
  'chjl'
]
module.exports =  getList('What do you want to do?', options).then(e => {
  return require(`./${e}/`)
}).catch(e => {throw e})