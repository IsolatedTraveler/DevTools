
const getList = require('./src/cmd/index.js').getList, options = [
  'publicVersion',
  'git',
  'json',
  'amis',
  'babel',
  'excel',
  'file',
  'sql'

]
getList('What do you want to do?', options).then(e => {
  require(`./src/${e}/`)
}).catch(e => {throw e})
