const getList = require('../cmd/index.js').getList, options = [
  'create',
  'select'
]
getList('Please select the SQL operation you want to perform?', options).then(e => {
  let obj = require(`./${e}`)
  getList('Please select the SQL operation you want to perform?', Object.keys(obj)).then(e => {
    obj[e]()
  })
})
