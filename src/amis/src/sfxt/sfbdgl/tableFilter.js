let {form, group,dialog, select,api,buttonGroup, button} = require('../../opreate/'), edit = require('./edit')
module.exports = form([
  group([
    select('科室', 'ks', api('/rest/queryDataBySql/0550000/02',null,{type: 'option', keys: {label: 'mc', value: 'id'}, addOptions: [{label: '不限', value:''}]})),
    select('场景', 'cj', api('assignOptions',{options: "${cjList}"},{api:'staticFetch',addOptions: [{label: '不限', value:''}]})),
    buttonGroup([
      button('新增', 'dialog',dialog('随访页面绑定', edit)),
      button('查询', '', '', {type: 'submit', className: 'm-l'})
    ])
  ])
], {submitText: true,target: 'table', label: "2"})