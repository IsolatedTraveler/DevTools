(()=>{
    'use strict';
    const fs = require("fs");
    const {copy,mkdir,writeFile,printInfo,paramDeal,fileFilter,readFile} = require("./../module/file/module");
    var checkCommand=(params,config,mod)=>{
        mod=mod||"tools";
        paramDeal(params,true);
        var command = params[0];
        command.toUpperCase();
        if(config.sum.indexOf(command)==-1){
            printInfo("module:"+mod+'当前命令<'+command+'>不存在','error');
            let a=command.split('-');
            if(!a[0]){
                command=config.simpled[a[1]];
            }
        }
        if(command=='version'||command=='help'){
            common[command](config,mod);
        }
        return command;
    },
    dateDeal=(time,fmt)=>{
        fmt=fmt||"YYYYMMDD";
        var o = { 
            "M+" : time.getMonth()+1,                 //月份 
            "D+" : time.getDate(),                    //日 
            "h+" : time.getHours(),                   //小时 
            "m+" : time.getMinutes(),                 //分 
            "s+" : time.getSeconds(),                 //秒 
            "q+" : Math.floor((time.getMonth()+3)/3), //季度 
            "S"  : time.getMilliseconds()             //毫秒 
        }; 
        if(/(Y+)/.test(fmt)) {
            fmt=fmt.replace(RegExp.$1, (time.getFullYear()+"").substr(4 - RegExp.$1.length)); 
        }
        for(var k in o) {
            if(new RegExp("("+ k +")").test(fmt)){
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
            }
        }
        return fmt; 
    },
    seeConfig=(config,keys)=>{
        var white='                ';
        keys=keys||config.key;
        printInfo("查看配置参数","red");
        [].forEach.call(keys,function(key){
            var length = key.length;
            var title=white.substr(0,16-length)+key+white.substr(0,4);
            printInfo(title+config[key].desc,'info');
        })
    },
    alertConfig=(url,str)=>{
        str=JSON.stringify(str,null,'\t').replace(/"([a-zA-Z_]+)":/g,"$1:");
        str="const config = "+str+";\nmodule.exports={\n\tconfig\n};";
        writeFile(url,str);
    },
    setConfigVal=(key,val,config,url)=>{
        if(!key){
            printInfo("缺少必要的参数","error");
        }
        if(!val){
            printInfo("你未设置任何值，设置空请输入null","error");
        }
        var keys=key.split('.');
        var name=keys.pop();
        var temp=config;
        for(var item of keys){
            if(!temp[item]){
                if(val=='null'){
                    process.exit();
                }else{
                    temp[item]={};
                }
            }
            temp=temp[item];
        }
        temp[name]=val;
        if(val==null){
            delete temp[name]
        }
        alertConfig(url,config);
    },
    getConfigVal=(key,config)=>{
        if(!key){
            printInfo("缺少必要的参数","error");
        }
        var keys=key.split('.');
        var temp=config;
        for(var item of keys){
            if(!temp[item]){
                printInfo("null",'success');
                process.exit();
            }
            temp=temp[item];
        }
        printInfo(temp||"null","success");
        process.exit();
    },
    checkKey=(key,config)=>{
        if(key){
            var temp=config[key];
            if(!temp){
                printInfo("当前项目:<"+key+'>不存在','error');
                seeConfig(config);
            }else{
                return temp;
            }
        }else{
            printInfo("缺少必要的配置参数",'error');
            seeConfig(config);
        }
    },
    common={
        version(config){
            printInfo(config.version,'success');
            process.exit();
        },
        help(config,mod){
            let keys=config.sum;
            let detail=config.detail;
            [].forEach.call(keys,(item)=>{
                let b=item;
                let a=item.split('-');
                if(!a[0]){
                    item=config.simpled[a[1]];
                }
                if(mod!='tools'){
                    printInfo(['npm run tools',mod,b,detail[item].order].join(' '),'info');
                }else{
                    printInfo(['npm run',mod,b,detail[item].order].join(' '),'info');
                }
            });
            process.exit();
        }
    };
    module.exports={
        printInfo,
        checkCommand,
        dateDeal,
        copy,
        mkdir,
        fileFilter,
        alertConfig,
        setConfigVal,
        getConfigVal,
        writeFile,
        seeConfig,
        paramDeal,
        readFile,
        checkKey
    };
})();