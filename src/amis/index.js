
const getList = require('../cmd/index.js').getList, options = [
  'src',
  'opreate'
]
getList('What do you want to do?', options).then(e => {
  if (e === 'src') {
    require('./src/').then(e => {
      require('../json/opreate').print(e)
    }).catch(e => {throw e})
  } else {
    opreate = require('./opreate/')
    getList('What do you want to do?', Object.keys(opreate)).then(e => {
      opreate[e]()
    }).catch(e => {throw e})
  }
}).catch(e => {throw e})