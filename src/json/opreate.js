function print(data = {}) {
  require('../file/opreate').setConfig(data, true, '../../outPut/print.json')
}
module.exports = {
  print
}