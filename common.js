(()=>{
  'use strict';
  const chalk = require('chalk');
  const color = ['white','blue','yellow','green','red','red'];
  const checkCommand = (params,config) => {
    return new Promise((resolve,reject)=>{
      let key = params[0]
      if(key){
        let command = config[key]
        if (command){
          resolve(command.key)
        }else {
          reject(command)
        }
      }else {
        reject(config)
      }
    }).catch(err=>{
      commandError(err)
    })
  };
  const msg = (msg,state) => {
    console.log(chalk[color[state]](msg))
    if(state==5){
      process.exit()
    }
  };
  const commandExe = (params,res,url) => {
    try {
      var exe = require(url+res+'/'+res);
      params.shift()
      try{
        exe[getParam(params, 1) || 'default'](params)
      }catch(e){
        commandError(config[res])
      }
    }catch(e){
      urlError(url+res+'/'+res)
    }
  }
  const getParam = (params, judge) => {
    var data = [], temp = params[0]
    if(temp){
      if(temp[0] == '[') {
        if(judge == 1) {
          data = ''
        }else {
          data = JSON.parse(params.shift())
        }
      }else{
        if(judge==1){
          data = params.shift()
        }
      }
    } else if (judge == 1 ){
      data = ''
    }
    console.log(data)
    return data
  }
  const resultDeal = (res, command) => {
    res=res || {}
    msg(command + '命令编译成功',3)
    return res.data
  }
  const help = (config) => {
    msg('展示命令详情',2);
  };

  // 不对外开放的方法
  const commandError = (config) => {
    msg('命令配置错误，详情如下：',4);
    help(config)
    process.exit();
  };
  const urlError = (url) => {
    msg('命令未找到,检查以下路径文件是否正确：'+url,5);
  };
  module.exports={
    checkCommand,
    msg,
    commandExe,
    resultDeal,
    getParam,
    help
  }
})()