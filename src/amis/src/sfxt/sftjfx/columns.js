let {operation, button,iframe,dialog} = require('../../opreate')
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
  "name": "cyzd",
  "label": "出院诊断"
},
{
  "name": "zyysxm",
  "label": "主治医生"
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
    "name":"sfrq",
    "label":"回访日期"
  },
  {
    "name":"sfysxm",
    "label":"回访人"
  }
]