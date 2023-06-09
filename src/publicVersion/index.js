
const getList = require('../cmd/index.js').getList, options = [
  'file',
  'cordova',
  'vue'
]
getList('What do you want to do?', options).then(e => {
  require(`../${e}/public`)
}).catch(e => {throw e})
