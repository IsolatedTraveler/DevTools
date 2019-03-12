(()=>{
  'use strict';
  const {msg,resultDeal,getParam} = require('../../common.js')
  const xlsx = require("node-xlsx");
  var inUrl='C:/Users/wdgw/Desktop/test.xlsx'
  const toJson = (params) => {
    params = params || []
    return new Promise((resolve,reject)=>{
      var data = getParam(params);
      var position=data[0] || 0;
      inUrl=data[1] || inUrl;
      try{
        var list = xlsx.parse(inUrl);
        resolve({data:list[position],params:params})
      }catch(e){
        reject()
        msg('xml转Json格式失败',5)
      }
    }).then(res=>{
      return resultDeal(res,'xml 转 Json')
    })
  }
  module.exports={
    toJson,
    default: toJson
  }
})()