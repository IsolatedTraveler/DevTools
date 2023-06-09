const {form,api, group, select, textarea,text, button, iframe,dialog} = require("../../opreate/");
module.exports = form([
    text('名称', 'mc'),
    text('路径', 'url', {addOn: button('预览', 'dialog', dialog('预览',iframe('./web/${url|url_decode}?pagetype=show'), {size: 'lgg'}))}),
    select('科室', 'ks', api('/rest/queryDataBySql/0550000/02',null,{type: 'option', keys: {label: 'mc', value: 'id'}, multiple: true})),
    select('场景', 'cj',"${cjList}", {multiple: true, placeholder: '不限'}),
    textarea('说明', 'sm')
],{label: '2', reload: 'table', submitText: true,api:api('/rest/commitData/0550001/01', {id: "${id}","mc":"${mc}",url: '${url}',"xtdm":"${xtdm}","ks":"${ks}","cj":"${cj}","sm":"${sm}"})})