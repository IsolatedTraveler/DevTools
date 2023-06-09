
const getList = require('../cmd/index.js').getList, options = [
  'public',
  'deleteNull',
  'copy',
  'rename'
]
getList('What do you want to do?', options).then(e => {
  require(`./${e}.js`)
})
