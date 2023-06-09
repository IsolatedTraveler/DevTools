let {form, group,dateRange, select,api,buttonGroup, button} = require('../../opreate/')
module.exports = form([
  group([
    dateRange('出院日期', 'cyrq', {value: "-1months,today"}),
    select('科室', 'ks', api('/rest/queryDataBySql/0550000/02',null,{type: 'option', keys: {label: 'mc', value: 'id'}, addOptions: [{label: '不限', value:''}]})),
    select('是否计划', 'sfjh', '${isTrue}'),
    dateRange('计划日期', 'jhrq', {disabledOn:"data.sfjh === '0'"}),
    select('执行状态', 'zt', '${zxzt}', {disabledOn:"data.sfjh === '0'"}),
    buttonGroup([button('查询', '', '', {type: 'submit'})], 'dis-flex vertical-end')
  ])
], {submitText: true,target: 'table'})