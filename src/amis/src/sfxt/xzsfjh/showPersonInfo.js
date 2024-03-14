let form = require('../../opreate/form')
let controls = [
  {
    "type":"group",
    "controls":[
      {
        "label":"姓名",
        "type":"text",
        "mode":"inline",
        "name":"xm",
        "disabled":true
      },
      {
        "type":"text",
        "label":"性别",
        "name":"xb",
        "mode":"inline",
        "disabled":true
      },
      {
        "label":"身份证号",
        "type":"text",
        "mode":"inline",
        "name":"sfzh",
        "disabled":true
      },
      {
        "label":"联系电话",
        "type":"text",
        "mode":"inline",
        "name":"lxdh",
        "disabled":true
      },
      {
        "label":"出院日期",
        "type":"text",
        "mode":"inline",
        "name":"cysj",
        "disabled":true
      },
      {
        "type":"text",
        "label":"住院科室",
        "name":"ryksmc",
        "mode":"inline",
        "disabled":true
      },
      {
        "type":"text",
        "label":"住院号",
        "name":"zyh",
        "mode":"inline",
        "disabled":true
      },
      {
        "type":"text",
        "label":"床号",
        "name":"ch",
        "mode":"inline",
        "disabled":true
      }]
  }]
module.exports = form(controls, {submitText: true})