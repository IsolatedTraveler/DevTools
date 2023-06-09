
const getList = require('../cmd/index.js').getList, options = [
  'print'
]
getList('What do you want to do?', options).then(e => {
  e = e.split(' ')
  var exe = e.shift()
  require(`./opreate`)[exe](...e)
})
