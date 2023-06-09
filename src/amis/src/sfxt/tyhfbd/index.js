const { api, form, textarea, select, date, group, button } = require('../../opreate')
module.exports = {
  type: 'page',
  body: form(
    [
      group([
        select(
          '回访人',
          'hfr',
          api(
            '/rest/queryDataBySql/000003/3',
            {
              "value":{
                "label":"${sfysxm}",
                "value":"${sfysid}"
              }
            }, {
              "keys":{
                "label":"xm",
                "value":"ryid"
              },
              type: 'option'
            }
          ), {
            disabledOn: "pageType==='show'",
            joinValues: false
          }
        ),
        date('回访日期', 'sfrq', {disabledOn: "pageType==='show'"}),
        select('联系人关系', 'lxrgx', '${lxrgxArr}', {disabledOn: "pageType==='show'"})
      ]),
      textarea('回访内容', 'data.hfnr', {disabledOn: "pageType==='show'"})
    ], {
      label: '5',
      actions: [
        button(
          '提交表单',
          '',
          '',
          {
            type: 'submit',
            hiddenOn: "pageType==='show'"
          }
        )
      ],
      api: api(
        '/rest/commitData/0550002/02',
        {
          sfysid: "${hfr.value}",
          sfysxm: "${hfr.label}",
          sfrq: "${sfrq}",
          lxrgx: "${lxrgx}",
          data: {
            hfnr: "${data.hfnr}"
          },
          id: "${id}"
        },
        {}
      )
    }
  )
}