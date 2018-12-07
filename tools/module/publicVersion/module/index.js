'use strict';
const {config} = require ('./config.js');
const {printInfo,dateDeal,copy,fileFilter,alertConfig,setConfigVal,getConfigVal} = require('./../../../common');
const path = require("path");
const setConfig = (name)=>{
    config[name].mtime=dateDeal(new Date(),'YYYY-MM-DD hh:mm:ss');
    var url = path.join(__dirname,'./config.js');
    alertConfig(url,config);
};
const copyData =(url,files,position)=>{
    [].forEach.call(files,(file)=>{
        copy(file,file.replace(url,position.replace('**',dateDeal(new Date()))));
    })
};
const publish = (params,name) => {
    var url=params.url,ignore=params.ignore,mtime=new Date(params.mtime),condition=(states)=>{
        if(states.mtime>mtime){
            return true
        }else{
            return false;
        }
    },position=params.position;
    try{
        fileFilter(url,ignore,condition).then(files=>{
            files=JSON.stringify(files).replace(/[\[\]\'\"]/g,'').replace(/[\,]{2,}/g,',').replace(/^\,/,'').replace(/\,$/,'').split(',');
            if(files.length && files[0]){
                copyData(url,files,position);
                setConfig(name);
            }else{
                printInfo("未找到修改内容","warning");
            }
        });
    }catch(e){
        console.error(e);
    }
};
const ggws = (params)=>{
    publish(config.ggws,"ggws");
};
const wtgl = (params)=>{
    publish(config.wtgl,"wtgl");
};
const jwjg = (params)=>{
    publish(config.jwjg,"jwjg");
};
const set =(params)=>{
    var key = params[0],val=params[1];
    var url = path.join(__dirname,'./config.js');
    setConfigVal(key,val,config,url);
};
const get=(params)=>{
    var key = params[0];
    getConfigVal(key,config);
};
module.exports={
    ggws,
    wtgl,
    jwjg,
    set,
    get
};