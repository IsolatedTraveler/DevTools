let {group, dialog,form,select, api, text, button, iframe, date, textarea} = require('../../opreate'),
controls = [
  group([
    select('名称', 'page', api('/rest/queryDataBySql/0550002/03',{xtdm: '055', ks: "${ryksid}",
    "value":{
      "label":"${pagemc}",
      "value":"${pageid}",
      "url":"${pageurl}"
    }},{type: 'option',keys: {"label":"mc","value":"id", "url": "url"}}), {require: true,
      "joinValues": false}), 
    text('', 'page.url', {requre:true, className: 'm-l-2', addOn:button('预览', 'dialog', dialog('', iframe('./web/${page.url|url_decode}'), {size: 'lgg'}))})
  ], 'over'),
  select('随访性质', 'sfxz', '${cjList}'),
  date('计划日期', 'jhrq'),
  text('联系电话', 'lxdh', {require: true}),
  textarea('备注', 'bz')
]
module.exports = function(title) {
  return dialog(title,form(controls, {reload:'table',submitText: true,api: api('/rest/commitData/0550002/01', {jhid:"${jhid}", id:"${id}", pageid: "${page.value}", pageurl: "${page.url}", pagemc: "${page.label}", sfxz: "${sfxz}", jhrq: "${jhrq}",bz:"${bz}",lxdh: "${lxdh}", sfjh: "${sfjhdm}"})}))
}