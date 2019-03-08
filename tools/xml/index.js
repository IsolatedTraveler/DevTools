(()=>{
  'use strict';
  const {msg,resultDeal} = require('../../common.js')
  const xlsx = require("node-xlsx");
  var inUrl='C:/Users/wdgw/Desktop/test.xlsx'
  const toJson = (params) => {
    return new Promise((resolve,reject)=>{
      var position=params.shift()||0;
      inUrl=params.shift()||inUrl;
      try{
        var list = xlsx.parse(inUrl);
        resolve({data:list[position],params:params})
      }catch(e){
        reject()
        msg('xml转Json格式失败',5)
      }
    }).then(res=>{
      return resultDeal(res)
    })
  }
  module.exports={
    toJson,
    default: toJson
  }
})()