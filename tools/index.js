'use strict';
const {printInfo,checkCommand} = require('./common');
const {config} = require('./config');
var params = process.argv.slice(2);
[].forEach.call(params,(item,index)=>{
    if(item=='false'){
        params[index]=false;
    }else if(item=='null'){
        params[index]='';
    }
})
var command = checkCommand(params,config);
try{
    var module = require('./module/'+command);
    var exe=module[command];
    params = params.slice(1);
    exe(params);
}catch(e){
    console.log(e);
    printInfo('模块：'+command+'不存在','error');
}