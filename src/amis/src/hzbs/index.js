const { form, text, select, crud, group, buttonGroup, button, operation, dialog, api } = require('../../opreate/')
let brxxsc = null, brxxList = null, brBsXq = null, brBsEdit = null;
// 病人筛查信息
(function() {
  brxxsc = form([
    group([
      text('姓名', 'xm'),
      select('性别', 'xb', '${sex}'),
      text('身份证号', 'sfzh'),
      buttonGroup([
        button('查询', '', '', {type: 'submit'})
      ], 'dis-flex vertical-end', {})
    ], {})
  ], {submitText: true,target: 'brList'})
})();
// 病人标识变更列表
(function() {
  brBsXq = crud('brBsXq', '/rest/queryDataBySql/010101/8', {brid: "${id}"}, [
    {
      "name": "xm",
      "label": "姓名"
    }, {
      "name": "sfzh",
      "label": "身份证号"
    }, {
      "name": "xb",
      "label": "性别"
    }, {
      "name": "czqsf",
      "label": "变更前身份标识"
    }, {
      "name": "czhsf",
      "label": "变更后身份标识"
    }, {
      "name": "czsj",
      "label": "修改时间"
    }, {
      "name": "czrxm",
      "label": "修改人"
    }
  ], {})
})();
// 病人标识详情
(function() {
  brBsEdit = form([
    group([
      text('姓名', 'xm', {disabled: true}),
      text('性别', 'xb', '${sex}', {disabled: true}),
      text('身份证号', 'sfzh', {disabled: true}),
      select('身份标识', 'brsf', api('/rest/queryDataBySql/010101/9',null,{type: 'option', keys: {label: 'mc', value: 'id'}}), {multiple: true}),
      buttonGroup([
        button('变更身份标识', '', '', {type: 'submit', reload: 'brList,brBsXq'})
      ], 'dis-flex vertical-end', {})
    ])
  ], {
    api: api('/rest/commitData/010101/5', {brid: "${id}", brsf: "${brsf}"})
  })
})();
// 病人列表
(function() {
  brxxList = crud('brList', '/rest/queryDataBySql/0550000/03', {
    "pageNumber":"${page}",
    "pageSize":"${perPage}"
  }, [
    {
      "name": "xm",
      "label": "姓名"
    }, {
      "name": "sfzh",
      "label": "身份证号"
    }, {
      "name": "xb",
      "label": "性别"
    }, {
      "name": "mz",
      "label": "民族"
    }, {
      "name": "gj",
      "label": "国籍"
    }, {
      "name": "lxdh",
      "label": "联系电话"
    }, {
      "name": "jtdz",
      "label": "家庭地址"
    }, {
      "name": "hkdz",
      "label": "户口地址"
    }, {
      "name": "brsf",
      "label": "身份标识"
    }, operation('操作', [
      button('管理', 'dialog', dialog('标识管理', [
        brBsEdit,
        brBsXq
      ], {size: 'lgg',actions:[]}))
    ], {})
  ], {})
})();
module.exports = {
  type: 'page',
  data: {
    sex: [
      {
        label: '不限',
        value: ''
      }, {
        label: '男',
        value: '0'
      }, {
        label: '女',
        value: '1'
      }
    ]
  },
  body: [{
    type: 'container',
    body: [
      brxxsc,
      brxxList
    ]
  }]
}