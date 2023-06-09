const { form, group, text, api, crud, operation, button, buttonGroup, dialog, select, textarea, date, number } = require('../../../opreate')

const gzlr = function(title) {
  return dialog(title, form([
    select('项目', 'xmdm', api('/rest/queryDataBySql/000003/5', {}, {type: 'option', keys: {label: 'mc', value: 'dm'}}), {required: true}),
    select('标志', 'zybz', '${bzxx}',{required: true}),
    date('日期', 'rq', {value: 'today',required: true}),
    text('完成度', 'wcbfb', {required: true,validations: 'isNumeric,maximum:100,minimum:1', value: '100', addOn: {label: '%'}}),
    text('工作时长', 'gzsc', {required: true,validations: 'isNumeric,maximum:24,minimum:0.1', value: '8', addOn: {label: '小时'}}),
    textarea('工作内容', 'gznr',{required: true})
  ], {
    reload: "chjl",
    resetAfterSubmit: true,
    label: 5,
    api: api('/rest/commitData/000003/6', {id: "${id}",ygxm: "${xm}",xm: '${xmdm}', zybz: '${zybz}', rq: "${rq}", wcbfb: "${wcbfb}", gzsc: "${gzsc}", gznr: "${gznr}", gh: "${gh}"})
  }), {})
}
module.exports = {
  type: 'page',
  data: {
    bzxx: [
      {
        value: '0',
        label: '普通项目'
      }, {
        value: '1',
        label: '重点项目'
      }
    ],
    zybz:'0'
  },
  body: [
    form([
      group([
        text('工号', 'gh', {required: true}),
        text('姓名', 'xm', {required: true}),
        buttonGroup([
          button('查询', '', '', {type: 'submit'}),
          button('新增', 'dialog', gzlr('新增'), {type: 'button', className: 'm-l', required: ['gh','xm']})
        ], 'dis-flex vertical-end', {})
      ])
    ], {submitText: true,target: 'chjl'}),
    crud('chjl', '/rest/queryDataBySql/000003/4', {gh: "${gh}", xm: "${xm}", pageNumber:"${page}",pageSize:"${perPage}"}, [
      {
        name: 'xm',
        label: "姓名"
      }, {
        name: 'gh',
        label: "工号"
      }, {
        name: 'mc',
        label: "项目名称"
      }, {
        name: 'gznr',
        label: "工作内容"
      }, {
        name: 'bz',
        label: "是否重点工作"
      }, {
        name: 'wcbfb',
        label: "完成百分比（%）"
      }, {
        name: 'gzsc',
        label: "工作时长"
      }, {
        name: 'rq',
        label: "工作日期"
      }, {
        name: 'cjsj',
        label: "创建时间"
      }, operation('操作', [
        button('修改', 'dialog', gzlr('修改'))
      ])
    ], {})
  ]
}