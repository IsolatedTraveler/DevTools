const xlsx = require("node-xlsx"), path = require("path"), config = require('./config.json')
const { createFile } = require("../file/opreate")
const { format, getUUid } = require("../util")
const { JsonToSqlInsert } = require("../sql/opreate")
function toJson() {
  let data = xlsx.parse(path.resolve(__dirname, config.url), { cellDates: true }), sheetData
  data.forEach(it => {
    if (it.name === config.name) {
      sheetData = it.data
    }
  })
  if (sheetData) {
    let keys = sheetData.shift()
    sheetData = sheetData.map(its => {
      let data = {}
      keys.forEach((key, i) => {
        let it = its[i] || ''
        if (typeof it == 'object') {
          data[key.trim()] = format(it, 'YYYY/MM/DD')
        } else {
          data[key.trim()] = it.toString().trim()
        }
      })
      return data
    })
    var date = 'yyyy/mm/dd'
    var sjlx = {
      date: {rysj: date, cysj: date, csrq: date, cjsj: date},
      base64: {tjjg: ['id']}
    }
    keys = ['id', 'sfzh', 'zlh', 'tdh', 'rysj', 'cysj', 'xm', 'xb', 'csrq', 'tjjg', 'cjsj']
    var obj = {
      sfzh: '证件号', zlh: '疗养号', tdh: '团队号', rysj: '入院时间', cysj: '出院时间', xm: '姓名', xb: '性别', csrq: '生日'
    }
    var v = sheetData.map(it => {
      return JsonToSqlInsert('T_GBBJ_TJ', keys, {
        id: getUUid(),
        sfzh: it[obj.sfzh] || '',
        zlh: it[obj.zlh] || '',
        tdh: it[obj.tdh] || '',
        rysj: it[obj.rysj] || '',
        cysj: it[obj.cysj] || '',
        xm: it[obj.xm] || '',
        xb: it[obj.xb] || '',
        csrq: it[obj.csrq] || '',
        cjsj: format(new Date(), 'YYYY/MM/DD'),
        tjjg: JSON.stringify(it)
      }, sjlx, 'oracle')
    })
    createFile(path.resolve(__dirname, config.res + '.sql'), v.join(';\n'))
    createFile(path.resolve(__dirname, config.res + '.json'), JSON.stringify(sheetData))
    createFile(path.resolve(__dirname, config.res + 'key.json'), JSON.stringify(keys))
  }
}
module.exports = {
  toJson
}