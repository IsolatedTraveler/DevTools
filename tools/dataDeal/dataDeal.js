(()=>{
  'use strict';
  const {msg} = require('../../common.js')
  const file = require('../file/file')
  const xml = require('../xml/xml')
  const sql = require('../sql/sql')
  module.exports={
    xmlToSql(param){
      xml.default().then(res=>{
        sql[param.shift()||'default'](res).then(res=>{
          file.write(res)
        })
      })
    },
    default(){
      msg('无默认方法发',5)
    }
  }
})()