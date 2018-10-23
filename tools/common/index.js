'use strict';
const chalk = require('chalk');
const fs = require("fs");
const Type={
    msg:'white',
    error:"red",
    warning:"yellow",
    success:"green",
    info:"blue"
};
const printInfo=(msg,type)=>{
    type=type||'msg';
    let color=null;
    if(type!='obj'){
        color=Type[type]||type;
        console.log(chalk[color](msg));
    }else{
        
    }
    if(type=='error'){
        process.exit();
    }
};
const checkCommand=(params,config,mod)=>{
    mod=mod||"tools";
    if(!params.length){
        printInfo("module:"+mod+'缺少命令参数','error');
        process.exit();
    }
    var command = params[0];
    if(/^_/.test(command)){
        let temp = command;
        command=config.simpled[command.substr(1)];
        if(!command){
            printInfo("module:"+mod+'当前命令<'+temp+'>不存在','error');
            process.exit();
        }
    }else if(!config.detail[command]){
        printInfo("module:"+mod+'当前命令<'+command+'>不存在','error');
        process.exit();
    }
    return command;
};
const dateDeal=(time,fmt)=>{
    fmt=fmt||"yyyyMMdd";
    var o = { 
        "M+" : time.getMonth()+1,                 //月份 
        "d+" : time.getDate(),                    //日 
        "h+" : time.getHours(),                   //小时 
        "m+" : time.getMinutes(),                 //分 
        "s+" : time.getSeconds(),                 //秒 
        "q+" : Math.floor((time.getMonth()+3)/3), //季度 
        "S"  : time.getMilliseconds()             //毫秒 
      }; 
      if(/(y+)/.test(fmt)) {
        fmt=fmt.replace(RegExp.$1, (time.getFullYear()+"").substr(4 - RegExp.$1.length)); 
      }
      for(var k in o) {
        if(new RegExp("("+ k +")").test(fmt)){
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
        }
      }
      return fmt; 
};
const copy=(src,src1)=>{
    fs.exists(src1, (exists)=>{
        mkdir(src1).then(res=>{
            printInfo(src+"复制成功","success");
            fs.createReadStream(src).pipe(fs.createWriteStream(src1));
        });
    })
};
const seeConfig=(config,keys)=>{
    var white='                ';
    keys=keys||config.key;
    printInfo("查看配置参数","red");
    [].forEach.call(keys,function(key){
        var length = key.length;
        var title=white.substr(0,16-length)+key+white.substr(0,4);
        printInfo(title+config[key].desc,'info');
    })
};
const mkdir=(root,src1)=>{
    if(!src1){
        var temp=root.split('/');
        var root = temp.shift();
        temp.pop();
        src1=temp;
    }
    return new Promise((resolve,reject)=>{
        var name=src1.shift();
        root+='/'+name;
        fs.mkdir(root,()=>{
            if(src1.length){
                mkdir(root,src1).then(res=>{
                    resolve();
                });
            }else{
                resolve();
            }
        })
    })
};
const fileFilter = (url,ignore,condition)=>{
    return new Promise((resolve,reject)=>{
        fs.readdir(url,function(err,files){
            var exe=[];
            if(err){
                resolve('');
                printInfo("目录文件："+url+"打开失败",'warning');
                return
            }
            if(!files.length){
                resolve('');
                return
            }
            [].forEach.call(files,function(file){
                if(ignore){
                    ignore=","+ignore+",";
                    if(ignore.indexOf(file)!=-1){
                        return;
                    }
                }
                exe.push(checkFileStat(url+'/'+file,ignore,condition));
            });
            if(exe.length){
                Promise.all(exe).then(data=>{
                    resolve(data);
                })
            }else{
                resolve('');
            }
        });
    });
};
const checkFileStat=(path,ignore,condition)=>{
    condition=condition||function(states){
        return true;
    };
    return new Promise((resolve,reject)=>{
        fs.stat(path,function(err,states){
            if(err){
                printInfo("文件："+path+"状态读取失败",'warning');
            }
            if(states.isFile()){
                if(condition(states)){
                    resolve(path);
                }else{
                    resolve("");
                }
            }else{
               fileFilter(path,ignore,condition).then(data=>{
                   resolve(data);
               })
            }
        });
    })
};
const alertConfig=(url,str)=>{
    str=JSON.stringify(str,null,'\t').replace(/"([a-zA-Z_]+)":/g,"$1:");
    str="const config = "+str+";\nmodule.exports={\n\tconfig\n};";
    fs.writeFile(url,str,function(err) {
        if (err) {
            return console.error(err);
        }
        printInfo("数据状态变更成功！","success");
    });
};
const writeFile =(url,str)=>{
    mkdir(url).then(res=>{
        fs.writeFile(url,str,function(e){
            if(e){
                console.error(e);
                printInfo('写入失败','error');
            }else{
                printInfo(url+"复制成功","success");
            }
        })
    });
};
const setConfigVal=(key,val,config,url)=>{
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
}
const getConfigVal=(key,config)=>{
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
    seeConfig
};