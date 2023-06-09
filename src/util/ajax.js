const {JSDOM} = require('jsdom'), {document} = (new JSDOM('<!doctype html><html><body></body></html>')).window
global.document = document
const window = document.defaultView, $ = require('jquery')(window);
function encryption(data) {
  return {data: JSON.stringify(data)}
}
function getAddServiceUrl(url) {
  return 'http://192.168.0.204:6088/jtphis/' + url
}
module.exports = {
  post(url, data) {
    console.log(JSON.stringify(data))
        //处理是否存在额外添加信息
        let param = {}
        if (data._addData) {
          param = data
          delete param._addData
          data = param.data
        }
        //获取用户信息
        data = encryption(data)
        data = Object.assign(param, data)
        console.log(getAddServiceUrl(url), data)
        return new Promise(function(resolve, reject) {
          $.ajax({
            url: getAddServiceUrl(url),
            type: 'POST',
            timeout: 50000,
            data,
            async: true,
            success: function(res) {
              if (typeof res === 'string') {
                resolve(JSON.parse(res))
              } else {
                resolve(res)
              }
            },
            error: function(res) {
              reject(res)
            }
          })
        })
  }
}