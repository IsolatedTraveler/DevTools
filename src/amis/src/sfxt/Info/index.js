const { form, text, group, button } = require("../../opreate");
let edit = require('../xzsfjh/editRow')('新增')
edit.body.api.data.id = ''
edit.body.reload = 'grsfjl'
module.exports = form([group ([
  text('姓名', 'xm', {disabled: true}),
  text('性别', 'xb', {disabled: true}),
  text('年龄', 'age', {disabled: true}),
  text('联系方式', 'lxdh', {disabled: true}),
  text('治疗方式', 'zlfs', {disabled: true}),
  text('治疗结果', 'zljg', {disabled: true}),
  text('主治医生', 'zyysxm', {disabled: true}),
  text('出院诊断', 'cyzd', {disabled: true}),
  text('出院时间', 'cysj', {disabled: true}),
])], {label: 5, submitText: true, name: 'jcsj', actions: [
  button('新增', 'dialog', edit, {hiddenOn: "pageType === 'show'"})
]})
