let data = require('./data'), tableFilter = require('./tableFilter'), {crud, button, api} = require('../../opreate/'), columns = require('./columns')
, crudApiData = require('./crudApiData')
module.exports = {
  type: 'page',
  data,
  body: [
    tableFilter,
    crud('table', '/rest/queryDataBySql/0550002/04', crudApiData, columns, {headerToolbar:['bulkActions'], bulkActions: [
      button('批量短信通知','ajax',api('/rest/commitData/0550002/04', {rows: '${rows|filter:zt:equals:"0"'}),{confirmText: '是否批量短信通知选中用户随访信息？'}),
      button('批量微信通知','ajax',api('/rest/commitData/0550002/04', {rows: '${rows|filter:zt:equals:"0"}'}),{confirmText: '是否批量微信通知选中用户随访信息？'})
    ]})
  ]
}