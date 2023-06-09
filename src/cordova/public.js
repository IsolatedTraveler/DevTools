const {getList} = require('../cmd'), config = require('./config.json'), {} = require('./opreate')
getList('Please select the project to be released?', Object.keys(config)).then(e => {
  
})