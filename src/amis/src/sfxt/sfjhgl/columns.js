let {operation, button, dialog, service, api} = require('../../opreate/'), title = '<%= data.sfjh==="否" ? "新增计划" : "修改计划"%>'
module.exports = [
  {
    "name":"xm",
    "label":"姓名"
  },
  {
    "name":"sfzh",
    "label":"身份证号"
  },
  {
    "name":"ryksmc",
    "label":"入院科室"
  },
  {
    "name":"zyts",
    "label":"住院天数"
  },
  {
    "name":"zyh",
    "label":"住院号"
  },
  {
    "name":"ch",
    "label":"床号"
  },
  {
    "name":"cysj",
    "label":"出院时间"
  },
  {
    "name":"jhrq",
    "label":"计划日期"
  },
  operation('操作', [
    button(title, 'dialog', dialog(title,service({schemaApi: api('/web/sfxt/hzsfgl/xzsfjh.json',null,{type: 'schemaApi', api: 'getLocal'})}),{size: 'lgg'}),{visibleOn: "this.sfzt!=='2'"}),
    button('查看计划', 'dialog', dialog('查看计划',service({data: {pageType: 'ck'},schemaApi: api('/web/sfxt/hzsfgl/xzsfjh.json',null,{type: 'schemaApi', api: 'getLocal'})}),{size: 'lgg'}), {visibleOn: "this.sfjh === '是'", className: 'm-l'})
  ])
]