const { form, group, text, api } = require('../../../opreate')

module.exports = {
  type: 'page',
  body: form([
    group([
      text('工号', 'gh'),
      text('姓名', 'xm')
    ])
  ], {api: api('/rest/commitData/010101/5', {xm: "${xm}", gh: "${gh}"})})
}