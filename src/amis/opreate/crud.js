let api = require('./api')
module.exports = function(name, url, apiData, columns = [], other ={}) {
  let {bulkActions, footerToolbar = ["switch-per-page", "pagination"] , headerToolbar = []} = other, crudData = {
    type: 'crud',
    name,
    syncLocation: false,
    api: api(url, apiData, 'crud'),
    headerToolbar,
    footerToolbar,
  }
  if (bulkActions) {
    crudData.bulkActions =bulkActions
  }
  crudData.columns = columns
  return crudData
}