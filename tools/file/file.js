(()=>{
  'use strict';
  const fs = require("fs");
  const {resultDeal,msg} = require('../../common.js')
  const write = (data,url) => {
    url=url||'C:/Users/wdgw/Desktop/test.json'
    return new Promise((resolve,reject)=>{
      try{
        fs.writeFile(url,data,function(e){
          if(e){
            reject(e)
          }else{
            resolve()
          }
        });
      }catch(e){
        msg('写入失败，目录：'+url+'不存在',5)
      }
    }).then(res=>{
      return resultDeal(res,'数据写入文件：'+url)
    });
  }
  module.exports={
    write,
    default: write
  }
})()