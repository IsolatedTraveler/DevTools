(()=>{
    'use strict';
    const {copy,mkdir,writeFile,printInfo,paramDeal,fileFilter,readFile,deleteFiles,copyDir} = require("./../module/file/module");
    const exec = require('child_process').exec;
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
    exeCmd=(cmd)=>{
        return new Promise((resolve,reject)=>{
            exec(cmd,{encoding:"binary"},(e,d,n)=>{
                if(e){
                    reject();
                }else{
                    resolve();
                }
            });
        });
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
        checkKey,
        exeCmd,
        deleteFiles,
        copyDir
    };
})();