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
const getJudge=(template,key,data,name)=>{
    if(data[0].key){
        var str='';
        [].forEach.call(data,item=>{
            str+=compile(template,name,item,true);
        });
        return getStr(template[key].temp,[{temp:str}]);
    }else{
        return getStr(template[key].temp,data);
    }
};
const compile = (template,name,params,judge) => {
    var data='',url ='',mod = 'template:'+name;
    if(judge){
        data=params;
    }else{
        data=params.shift();
        url = params.shift()||template.url;
        try{
            data=JSON.parse(data);
        }catch(e){
            printInfo("数据格式错误",'error');
        }
    }
    if(!data){
        seeConfig(template);
        printInfo("缺少必要的模板数据",'error');
    }
    try{
        var keys=data.key, str='';
        checkTemplate(template,keys,mod);
        if(typeof keys == 'string'){
            str=getJudge(template,keys,data[keys]||[],name);
        }else{
            [].forEach.call(keys,function(key){
                str+=getJudge(template,key,data[key]||[],name);
            });
        }
        if(judge){
            return str;
        }else{
            // 去除空值数据
            str=str.replace(/[, ]+[a-zA-Z\_]+[ ]*[:=]+[ ]*#{[a-zA-Z\_]+}/g,'');
            str=str.replace(/#{[a-z]+}/g,"");
            writeFile(url,str);
        }
    }catch(e){
        printInfo("数据格式错误:"+JSON.stringify(data),'error');
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