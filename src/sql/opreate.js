const { Base64 } = require("js-base64")

function JsonToSqlInsert(table, keys, data, tssj, lx = 'pg') {
  var sql = ['']
  sql[0] = `insert into ${table} (${keys.join(', ')}) values (${keys.map((key) => {
    return getSqlVal(data, key, tssj, lx, sql, table)
  }).join(', ')})`
  return sql.join(';\n')
}
function getSqlVal(data, key, tssj, lx, sql, table) {
  var { date = {}, base64 = {} } = (tssj || {}), val = data[key]
  if (val) {
    if (date[key]) {
      return dealDate(val, lx, date[key])
    } else if (base64[key]) {
      return dealBase64(key, base64[key], data, sql, table, lx, tssj)
    } else {
      return `'${val}'`
    }
  } else {
    return 'null'
  }
}
function dealBase64(key, where, data, sql, table, lx, tssj) {
  updateBase64(key, data[key], where.map(it => {
    return `${it} = ${getSqlVal(data, it, tssj, lx, sql,table)}`
  }).join(' and '), sql, table, lx)
  return "''"
}
function updateBase64(key, str, where, sql, table, lx) {
  let len = str.length, sum = 1000
  for (let i = 0; i < len; i += sum) {
    if (lx == 'pg') {

    } else {
      sql.push(`update ${table} set ${key} = ${key} || base64_de_utf8('${Base64.encode(str.slice(i, i + sum))}') where ${where}`)
    }
  }
}
function dealDate(data, lx, sjlx) {
  if (lx == 'pg') {
    sjlx = sjlx === true ? 'yyyy-mm-dd hh24:mi:ss' : sjlx
    return `to_timestamp('${data}', '${sjlx}')`
  } else {
    return `std('${data}')`
  }
}
module.exports = {
  JsonToSqlInsert
}