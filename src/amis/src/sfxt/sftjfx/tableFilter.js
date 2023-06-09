let {form, group,dateRange, select,api,buttonGroup, button} = require('../../opreate/')
module.exports = form([
  group([
    dateRange('出院日期', 'cyrq', {value: "-1months,today"}),
    select('科室', 'ks', api('/rest/queryDataBySql/0550000/02',null,{type: 'option', keys: {label: 'mc', value: 'id'}, addOptions: [{label: '不限', value:''}]})),
    dateRange('计划日期', 'jhrq'),
    select('随访性质', 'sfxz', '${cjList}'),
    select('是否通知', 'sftz', '${isTrue}'),
    select('随访状态', 'zt', '${zxzt}'),
    buttonGroup([button('查询', '', '', {type: 'submit'})], 'dis-flex vertical-end')
  ])
], {submitText: true,target: 'table'})