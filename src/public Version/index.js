
const getList = require('../cmd/index.js').getList, options = [
  'cordova',
  'vue',
  'file'
]
getList('What do you want to do?', options).then(e => {
  require(`../${e}/public`)
})
