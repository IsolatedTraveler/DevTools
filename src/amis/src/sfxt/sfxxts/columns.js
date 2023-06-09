let {operation, button,api} = require('../../opreate')
module.exports = [ {
  "name": "xm",
  "label": "姓名"
},
{
  "name": "sfzh",
  "label": "身份证号"
},
{
  "name": "ryksmc",
  "label": "入院科室"
},
{
  "name": "zyts",
  "label": "住院天数"
},
{
  "name": "zyh",
  "label": "住院号"
},
{
  "name": "ch",
  "label": "床号"
},
{
  "name": "cysj",
  "label": "出院时间"
},
  {
    "name":"lxdh",
    "label":"联系电话"
  },
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
    button('短信通知','ajax',api('', {id: "${id}"}), {confirmText: '是否短信通知 ${xm} 随访信息？', visibleOn: 'this.zt=== "0"'}),
    button('微信通知','ajax',api('', {id: "${id}"}), {confirmText: '是否微信通知 ${xm} 随访信息？', visibleOn: 'this.zt=== "0"', className: 'm-l'})
  ])
]