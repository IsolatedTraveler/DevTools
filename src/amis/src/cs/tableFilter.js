let {form, group,dateRange} = require('../../opreate/')
module.exports = form([
  group([
    dateRange('出院日期', 'cyrq', {value: "-1months,today"}),
    dateRange('计划日期', 'jhrq')
  ])
], {target: 'table'})