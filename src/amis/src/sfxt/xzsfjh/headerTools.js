let edit = require('./editRow')('新增随访记录')
edit.body.api.data.id = ''
edit.body.api.data.jhid = '${id}'
let but = require('../../opreate/button')('新增', 'dialog', edit, {align: 'right'})
module.exports =[but]