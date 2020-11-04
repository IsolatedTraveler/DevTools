const obj = require(`./${e}`), getList = require('../cmd/index.js').getList
getList('Please select the file operation you want to perform?', Object.keys(obj)).then(e => {
  obj[e]()
})