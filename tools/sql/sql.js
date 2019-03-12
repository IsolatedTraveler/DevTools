(()=>{
  'use strict';
  const {msg} = require('../../common.js')
  const date = require('../date/date.js')
  module.exports={
    createFun(data){
      return new Promise((resolve,reject)=>{
        try{
          data = data.data
          var obj = data.shift()
          var table = obj[0],name = obj[1],fun=obj[2]
          var str =`create or replace procedure ${name}(json_in in clob,result_out out varchar2) is
          /*----------------------------------------------------------------------------
          过程名:${name}
          作者:hb
          功能:${fun}
          创建日期:${date.default(new Date(), 'yyyy-MM-dd')}
          修改日期:
          版本号: v1.0.1
            参数 data_in格式
            
            返回值格式
          ----------------------------------------------------------------------------
          */
          v_json_data json;\n`
          var  comment = '',getType='';
          [].forEach.call(data,item => {
            var id = (item[0]||'').toLowerCase()
            comment += 'v_'+id+' '+table+'.'+id+'%type; --'+item[2]+'\n'
            if(item[1].totoUpperCase()=='DATE'){
              getType += 'v_'+id+":=json_date(v_json_data,'"+id+"'); --"+item[2]+'\n'
            }else{
              getType += 'v_'+id+":=json_str(v_json_data,'"+id+"'); --"+item[2]+'\n'
            }
          });
          comment += `\n err_custom EXCEPTION;
          v_err VARCHAR2(2000);
          Begin
          json_data(json_in,'${fun}',v_json_data);\n`
          str+=comment+getType+'\n\n --具体执行过程\n\n'
          str+=`EXCEPTION
              WHEN err_custom THEN
                result_out := return_fail(v_err, 2);
              WHEN OTHERS THEN
                result_out := return_fail(SQLERRM, 0);
          End ;`
          resolve(str)
        }catch(e){
          reject()
        }
      }).catch(res=>{
        msg('creatSqlFun命令执行失败',5)
      })
    },
    default(){
      msg('无默认方法发',5)
    },
    createInsert(data) {
      return new Promise((resolve,reject)=>{
        try{
          data = data.data
          var obj = data.shift()
          var table = obj[0];
          let str = 'insert into ' + table + '\n  (';
          let col = [],val=[];
          [].forEach.call(data,item => {
            var id = (item[0]||'').toLowerCase()
            col.push(id)
            val.push('v_'+id)
          });
          str+=col.join(',')
          str+=')\nvalues\n  ('
          str+=val.join(',')
          str+=');'
          resolve(str)
        }catch(e){
          reject()
        }
      })
    },
    createUpdate(data) {
      return new Promise((resolve,reject)=>{
        try{
          data = data.data
          var obj = data.shift()
          var table = obj[0];
          let str = 'update ' + table + '\n  set ';
          let col = [];
          [].forEach.call(data,item => {
            var id = (item[0]||'').toLowerCase()
            col.push(id+' = '+'v_'+id)
          });
          str+=col.join(',\n      ')
          str+='\nwhere'
          resolve(str)
        }catch(e){
          reject()
        }
      })
    }

  }
})()