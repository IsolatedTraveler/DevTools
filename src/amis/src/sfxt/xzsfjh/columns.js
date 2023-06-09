let {operation, button,iframe,dialog} = require('../../opreate/')
module.exports = [
  {
    "name":"pagemc",
    "label":"随访名称"
  },
  {
    "name":"sfxz",
    "label":"随访性质"
  },
  {
    "name":"jhrq",
    "label":"计划日期"
  },
  {
    "name":"lxdh",
    "label":"联系电话"
  },
  {
    "name":"sftzmc",
    "label":"是否通知"
  },
  {
    "name":"tzfs",
    "label":"通知方式"
  },
  {
    "name":"ztmc",
    "label":"随访状态"
  },
  {
    "name":"bz",
    "label":"备注"
  }, 
  operation('操作',[
    button('修改', 'dialog', require('./editRow')('修改随访记录'), {visibleOn: 'this.ztmc === "待执行" && this.type !== "ck"'}),
    button('预览表单', 'dialog', dialog('预览表单',iframe('./web/${pageurl|url_decode}'), {size: 'lgg'})  , {className: 'm-l'})
  ])
]