let data = require('./data'), showPersoninfo = require('./showPersoninfo'), crud = require('../../opreate/crud'), columns = require('./columns'), headerToolbar = require('./headerTools')
module.exports = {
  type: 'page',
  data,
  body: [
    showPersoninfo,
    crud('table', '/rest/queryDataBySql/0550002/02', {jhid: "${id}", pageType: '${pageType}'}, columns, {headerToolbar,footerToolbar:[]})
  ]
}