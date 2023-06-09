const { form, group, text, api, crud, dialog, operation, button } = require('../../../opreate')
const g = [
  text('代码', 'dm',{required: true}),
  text('项目', 'mc',{required: true})
], o = {reload: 'xmList', api: api('/rest/commitData/000003/5', {dm: "${dm}", mc: "${mc}"})}
const form1 = form([
  group(g)
], o)
module.exports = {
  type: 'page',
  body: [
    form1, 
    crud('xmList', '/rest/queryDataBySql/000003/5', { pageNumber:"${page}",pageSize:"${perPage}"}, [
      {
        label: "代码",
        name: "dm"
      }, {
        label: '名称',
        name: 'mc'
      }, operation('操作', [
        button('修改', 'dialog', dialog('修改', form(g, o)))
      ])
    ])
  ]
}