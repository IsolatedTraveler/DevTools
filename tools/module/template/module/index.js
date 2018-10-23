'use strict';
const {config} = require ('./config.js');
const {printInfo,writeFile,setConfigVal,getConfigVal,seeConfig} = require('./../../../common');
const path = require("path");
const set =(params)=>{
    var key = params[0],val=params[1];
    var url = path.join(__dirname,'./config.js');
    setConfigVal(key,val,config,url);
};
const get=(params)=>{
    var key = params[0];
    getConfigVal(key,config);
};
const checkKey=(template,key,mod)=>{
    if(key){
        var temp=template[key];
        if(!temp){
            seeConfig(template);
            printInfo("module:"+mod+'当前模板<'+key+'>不存在','error');
        }
    }else{
        seeConfig(template);
        printInfo("缺少必要的模板参数",'error');
    }
};
const checkTemplate=(template,key,mod)=>{
    if(typeof key == 'string'){
        checkKey(template,key,mod);
    }else{
        [].forEach.call(key,function(item){
            checkKey(template,item,mod);
        });
    }
};
const getStr=(template,data)=>{
    var str='';
    if(data && data.length){
        [].forEach.call(data,function(item){
            var arr = Object.keys(item);
            var temp = template;
            [].forEach.call(arr,function(key){
                var reg=new RegExp('#{'+key+'}','g');
                temp=temp.replace(reg,item[key]);
            });
            str+=temp;
        });
    }else{
        str=template;
    }
    return str;
}
const compile = (template,name,params) => {
    var data=params.shift(),url = params.shift()||template.url,mod = 'template:'+name;
    if(!data){
        seeConfig(template);
        printInfo("缺少必要的模板数据",'error');
    }
    try{
        data=JSON.parse(data);
        var keys=data.key, str='';
        checkTemplate(template,keys,mod);
        if(typeof keys == 'string'){
            str=getStr(template[keys].temp,data[keys]||[]);
        }else{
            [].forEach.call(keys,function(key){
                str+=getStr(template[key].temp,data[key]||[]);
            });
        }
        writeFile(url,str);
    }catch(e){
        console.error(e);
    }
};
const html = (params)=>{
    compile(config.html,"html",params);
};
const js = (params)=>{
    compile(config.js,"js",params);
};
module.exports={
    set,
    get,
    html,
    js
};