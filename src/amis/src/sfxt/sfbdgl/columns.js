let {operation, button, dialog} = require('../../opreate/'), eidt = require('./edit')
const iframe = require('../../opreate/iframe')
module.exports = [
    {
      "name":"mc",
      "label":"名称"
    },
    {
      "name":"ksmc",
      "label":"科室名称"
    },
    {
      "name":"cj",
      "label":"使用场景"
    },
    {
      "name":"sm",
      "label":"说明"
    },
  operation('操作', [
    button('修改', 'dialog', dialog('修改随访绑定页面', eidt)),
    button('预览', 'dialog', dialog('预览',iframe('./web/${url|url_decode}?pagetype=show'), {size: 'lgg'}), {className: 'm-l'})
  ])
]