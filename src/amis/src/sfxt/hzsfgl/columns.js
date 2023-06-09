let {operation, button,iframe,dialog} = require('../../opreate/')
let edit = require('../xzsfjh/editRow')('新增')
edit.body.api.data.id = ''
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
    button('新增', 'dialog', edit),
    button('随访', 'dialog', dialog('随访',{
      "type":"service",
      "schemaApi":{
        "url":"/web/sfxt/jcsjgl/sfbd/grsfjl.json",
        "method":"post",
        "api":"getLocal",
        "type":"schemaApi"
      }
    },{size: 'lgg',actions:[]}) , {className: 'm-l'}),
    button('查看', 'dialog', dialog('查看',iframe('./web/sfxt/jcsjgl/sfbd/grsfjl.html?pageType=show&jhid=${jhid}&id=${id}'), {size: 'lgg',actions:[]})  , {className: 'm-l'})
  ])
]