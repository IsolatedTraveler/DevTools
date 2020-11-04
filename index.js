
const getList = require('./src/cmd/index.js').getList, options = [
  'sql',
  'public Version'
]
getList('What do you want to do?', options).then(e => {
  require(`./src/${e}/`)
})
