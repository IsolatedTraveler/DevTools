let  tableFilter = require('./tableFilter'), crud = require('../../opreate/crud'), columns = require('./columns'),
crudApiData = require('./crudApiData')
module.exports = {
  type: 'page',
  body: [
    tableFilter,
    crud('table', '/rest/queryDataBySql/0550002/04', crudApiData, columns)
  ]
}