'use strict';
const {config} = require('./config');
const {printInfo,checkCommand} = require('./../../common');
const mod = require("./module");
const name ='template';
const template = (params)=>{
    var command = checkCommand(params,config,name);
    try{
        params.shift();
        var exe = mod[command];
        exe(params);
    }catch(e){
        console.error(e);
        printInfo(command+" is not a function",'error');
    }
};
module.exports={
    template
};