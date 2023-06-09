let data = require('./data'), tableFilter = require('./tableFilter'), crud = require('../../opreate/crud'), columns = require('./columns'),
crudApiData = require('./crudApiData')
module.exports = {
  type: 'page',
  data,
  body: [
    tableFilter,
    crud('table', '/rest/queryDataBySql/0550002/04', crudApiData, columns)
  ]
}